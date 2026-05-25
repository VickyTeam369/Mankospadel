const { json } = require('./_shared.cjs');

module.exports = function handler(request, response) {
  if (request.method !== 'GET') {
    json(response, 405, { error: 'Metodo no permitido' });
    return;
  }

  json(response, 200, {
    adminPasswordConfigured: Boolean(process.env.ADMIN_PASSWORD),
    blobTokenConfigured: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    blobStoreConfigured: Boolean(process.env.BLOB_STORE_ID),
    vercel: Boolean(process.env.VERCEL)
  });
};
