const {
  cleanSiteData,
  isAuthorized,
  json,
  readJson,
  readSiteData,
  writeSiteData
} = require('./_shared.cjs');

module.exports = async function handler(request, response) {
  if (!isAuthorized(request)) {
    json(response, 401, { error: 'No autorizado' });
    return;
  }

  if (request.method === 'GET') {
    try {
      json(response, 200, readSiteData());
    } catch {
      json(response, 500, { error: 'No se pudo leer la configuracion' });
    }
    return;
  }

  if (request.method === 'POST') {
    try {
      const cleaned = cleanSiteData(await readJson(request));
      writeSiteData(cleaned);
      json(response, 200, cleaned);
    } catch {
      json(response, 500, {
        error: 'No se pudo guardar en Vercel. Para guardar cambios online hace falta conectar una base de datos o Vercel Blob.'
      });
    }
    return;
  }

  json(response, 405, { error: 'Metodo no permitido' });
};
