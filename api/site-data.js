const {
  cleanSiteData,
  isAuthorized,
  json,
  readJson,
  readPublishedSiteData,
  writeSiteData
} = require('./_shared.cjs');

module.exports = async function handler(request, response) {
  if (!isAuthorized(request)) {
    json(response, 401, { error: 'No autorizado' });
    return;
  }

  if (request.method === 'GET') {
    try {
      json(response, 200, await readPublishedSiteData());
    } catch {
      json(response, 500, { error: 'No se pudo leer la configuracion' });
    }
    return;
  }

  if (request.method === 'POST') {
    try {
      const cleaned = cleanSiteData(await readJson(request));
      await writeSiteData(cleaned);
      json(response, 200, cleaned);
    } catch (error) {
      json(response, 500, {
        error: error.message || 'No se pudo guardar la configuracion.'
      });
    }
    return;
  }

  json(response, 405, { error: 'Metodo no permitido' });
};
