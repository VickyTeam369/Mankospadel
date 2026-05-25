const { json, readPublishedSiteData } = require('./_shared.cjs');

module.exports = async function handler(request, response) {
  if (request.method !== 'GET') {
    json(response, 405, { error: 'Metodo no permitido' });
    return;
  }

  try {
    json(response, 200, await readPublishedSiteData());
  } catch {
    json(response, 500, { error: 'No se pudo leer la configuracion publica' });
  }
};
