const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const dataPath = path.join(root, 'src', 'data', 'site-data.json');
const adminPassword = process.env.ADMIN_PASSWORD;
const sessions = new Set();
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || '0.0.0.0';
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.json': 'application/json; charset=utf-8'
};

function sendJson(response, status, payload) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
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

function isAuthorized(request) {
  const header = request.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  return sessions.has(token);
}

function cleanString(value) {
  return String(value || '').trim();
}

function cleanStringList(value) {
  return Array.isArray(value) ? value.map(cleanString).filter(Boolean) : [];
}

function cleanSchedule(value) {
  const schedule = {};
  for (let index = 0; index < 5; index += 1) {
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

function cleanCourtNumbers(value) {
  const source = Array.isArray(value) ? value : Array.from({ length: Math.max(1, Number(value || 1)) }, (_, index) => index + 1);
  const unique = [...new Set(source.map((item) => Number(item)).filter((item) => item >= 1 && item <= 7))];
  return unique.length ? unique.sort((a, b) => a - b) : [1];
}

async function handleApi(request, response, url) {
  if (request.method === 'POST' && url.pathname === '/api/login') {
    const body = JSON.parse((await readBody(request)) || '{}');
    if (!adminPassword) {
      sendJson(response, 503, { error: 'Falta configurar ADMIN_PASSWORD en el servidor.' });
      return true;
    }

    if (body.password !== adminPassword) {
      sendJson(response, 401, { error: 'Clave incorrecta' });
      return true;
    }

    const token = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessions.add(token);
    sendJson(response, 200, { token });
    return true;
  }

  if (url.pathname === '/api/site-data') {
    if (!isAuthorized(request)) {
      sendJson(response, 401, { error: 'No autorizado' });
      return true;
    }

    if (request.method === 'GET') {
      fs.readFile(dataPath, 'utf8', (error, data) => {
        if (error) {
          sendJson(response, 500, { error: 'No se pudo leer la configuracion' });
          return;
        }
        response.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-store'
        });
        response.end(data);
      });
      return true;
    }

    if (request.method === 'POST') {
      const body = JSON.parse((await readBody(request)) || '{}');
      const cleaned = {
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
          4: cleanStringList(body.exhibitionConfirmed?.[4])
        },
        exhibitionSchedule: cleanSchedule(body.exhibitionSchedule)
      };

      fs.writeFile(dataPath, JSON.stringify(cleaned, null, 2), 'utf8', (error) => {
        if (error) {
          sendJson(response, 500, { error: 'No se pudo guardar la configuracion' });
          return;
        }
        sendJson(response, 200, cleaned);
      });
      return true;
    }
  }

  return false;
}

http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  handleApi(request, response, url).then((handled) => {
    if (handled) return;

  const pathname = url.pathname === '/' ? '/index.html' : decodeURIComponent(url.pathname);
  const filePath = path.normalize(path.join(root, pathname));

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end('Not found');
      return;
    }

    response.writeHead(200, {
      'Content-Type': types[path.extname(filePath)] || 'text/plain',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    response.end(data);
  });
  }).catch((error) => {
    sendJson(response, 500, { error: error.message || 'Error interno' });
  });
}).listen(port, host, () => {
  console.log(`Mankos Padel listo en http://${host}:${port}`);
});
