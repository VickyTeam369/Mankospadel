const { createToken, json, readJson } = require('./_shared.cjs');

module.exports = async function handler(request, response) {
  if (request.method !== 'POST') {
    json(response, 405, { error: 'Metodo no permitido' });
    return;
  }

  if (!process.env.ADMIN_PASSWORD) {
    json(response, 503, { error: 'Falta configurar ADMIN_PASSWORD en Vercel.' });
    return;
  }

  try {
    const body = await readJson(request);
    if (body.password !== process.env.ADMIN_PASSWORD) {
      json(response, 401, { error: 'Clave incorrecta' });
      return;
    }

    json(response, 200, { token: createToken() });
  } catch {
    json(response, 400, { error: 'No se pudo leer la clave enviada' });
  }
};
