const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'src', 'data', 'site-data.json');
const blobPath = 'site-data.json';

function json(response, status, payload) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.end(JSON.stringify(payload));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) request.destroy();
    });
    request.on('end', () => resolve(body));
    request.on('error', reject);
  });
}

async function readJson(request) {
  const body = await readBody(request);
  return body ? JSON.parse(body) : {};
}

function tokenSecret() {
  return process.env.ADMIN_TOKEN_SECRET || process.env.ADMIN_PASSWORD || '';
}

function sign(value) {
  return crypto.createHmac('sha256', tokenSecret()).update(value).digest('hex');
}

function createToken() {
  const payload = Buffer.from(JSON.stringify({
    exp: Date.now() + 1000 * 60 * 60 * 8
  })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

function isAuthorized(request) {
  const secret = tokenSecret();
  if (!secret) return false;

  const header = request.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  const [payload, signature] = token.split('.');
  if (!payload || !signature || signature !== sign(payload)) return false;

  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return Number(parsed.exp || 0) > Date.now();
  } catch {
    return false;
  }
}

function cleanString(value) {
  return String(value || '').trim();
}

function cleanStringList(value) {
  return Array.isArray(value) ? value.map(cleanString).filter(Boolean) : [];
}

function cleanCourtNumbers(value) {
  const source = Array.isArray(value) ? value : Array.from({ length: Math.max(1, Number(value || 1)) }, (_, index) => index + 1);
  const unique = [...new Set(source.map((item) => Number(item)).filter((item) => item >= 1 && item <= 7))];
  return unique.length ? unique.sort((a, b) => a - b) : [1];
}

function cleanBracket(value) {
  const bracket = {};
  ['quarter', 'semi', 'third', 'final'].forEach((stage) => {
    bracket[stage] = Array.isArray(value?.[stage]) ? value[stage].map((match) => ({
      label: cleanString(match.label),
      teamA: cleanString(match.teamA),
      teamB: cleanString(match.teamB),
      result: cleanString(match.result || 'Pendiente')
    })).filter((match) => match.teamA || match.teamB) : [];
  });
  return bracket;
}

function cleanSchedule(value) {
  const schedule = {};
  for (let index = 0; index < 6; index += 1) {
    const day = value?.[index] || value?.[String(index)] || {};
    const type = ['none', 'exhibition', 'tournament'].includes(day.type) ? day.type : (day.enabled ? 'exhibition' : 'none');
    const courtNumbers = cleanCourtNumbers(day.courtNumbers || day.courts);
    schedule[index] = {
      type,
      enabled: type !== 'none' && Boolean(day.enabled),
      time: cleanString(day.time),
      venue: cleanString(day.venue),
      courts: courtNumbers.length,
      courtNumbers,
      groupCount: Math.max(1, Number(day.groupCount || 1)),
      locked: Boolean(day.locked),
      dateKey: cleanString(day.dateKey),
      suspended: Boolean(day.suspended),
      pairs: Array.isArray(day.pairs) ? day.pairs.map((pair) => Array.isArray(pair) ? pair.map(cleanString).filter(Boolean) : []).filter((pair) => pair.length === 2) : [],
      matches: Array.isArray(day.matches) ? day.matches.map((match) => ({
        group: cleanString(match.group || 'Grupo A'),
        time: cleanString(match.time),
        court: cleanString(match.court),
        teamA: cleanString(match.teamA),
        teamB: cleanString(match.teamB),
        round: Math.max(1, Number(match.round || 1)),
        result: cleanString(match.result || 'Pendiente')
      })).filter((match) => match.teamA || match.teamB) : [],
      bracket: cleanBracket(day.bracket)
    };
  }
  return schedule;
}

function cleanSiteData(body) {
  return {
    settings: {
      exhibitionTitle: cleanString(body.settings?.exhibitionTitle),
      exhibitionDescription: cleanString(body.settings?.exhibitionDescription),
      playdayVenue: cleanString(body.settings?.playdayVenue)
    },
    players: Array.isArray(body.players) ? body.players.map((player) => ({
      name: cleanString(player.name),
      hand: cleanString(player.hand),
      img: cleanString(player.img)
    })).filter((player) => player.name) : [],
    exhibitionConfirmed: {
      0: cleanStringList(body.exhibitionConfirmed?.[0]),
      1: cleanStringList(body.exhibitionConfirmed?.[1]),
      2: cleanStringList(body.exhibitionConfirmed?.[2]),
      3: cleanStringList(body.exhibitionConfirmed?.[3]),
      4: cleanStringList(body.exhibitionConfirmed?.[4]),
      5: cleanStringList(body.exhibitionConfirmed?.[5])
    },
    exhibitionSchedule: cleanSchedule(body.exhibitionSchedule)
  };
}

function readSiteData() {
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

async function readBlobSiteData() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  const { get } = await import('@vercel/blob');
  const result = await get(blobPath, { access: 'private' });
  if (!result || result.statusCode !== 200 || !result.stream) return null;
  const text = await new Response(result.stream).text();
  return JSON.parse(text);
}

async function readPublishedSiteData() {
  try {
    const blobData = await readBlobSiteData();
    if (blobData) return blobData;
  } catch (error) {
    if (error?.name !== 'BlobNotFoundError') throw error;
  }

  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

async function writeSiteData(data) {
  const content = JSON.stringify(data, null, 2);
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import('@vercel/blob');
    await put(blobPath, content, {
      access: 'private',
      allowOverwrite: true,
      contentType: 'application/json',
      cacheControlMaxAge: 60
    });
    return;
  }

  if (process.env.VERCEL) {
    throw new Error('Falta conectar Vercel Blob y configurar BLOB_READ_WRITE_TOKEN.');
  }

  fs.writeFileSync(dataPath, content, 'utf8');
}

module.exports = {
  createToken,
  cleanSiteData,
  isAuthorized,
  json,
  readJson,
  readPublishedSiteData,
  readSiteData,
  writeSiteData
};
