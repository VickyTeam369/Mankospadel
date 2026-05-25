# Torneo de Mankos

Sitio web publico de Mankos Padel preparado para publicar como pagina estatica en GitHub Pages.

## Publicar en GitHub Pages

1. Crear un repositorio nuevo en GitHub.
2. Subir este proyecto a la rama `main`.
3. En GitHub, entrar a `Settings > Pages`.
4. En `Build and deployment`, elegir `Deploy from a branch`.
5. Seleccionar `main` y la carpeta `/root`.
6. Guardar. El sitio va a quedar disponible en una URL como:

```text
https://TU_USUARIO.github.io/NOMBRE_DEL_REPO/
```

## Comandos utiles

```bash
npm run dev
```

Levanta el servidor local en `http://127.0.0.1:4173/`.

Para usar el panel admin local, antes de levantar el servidor configura la clave:

```powershell
$env:ADMIN_PASSWORD="TU_CLAVE"
npm run dev
```

```bash
npm run check
```

Revisa errores de sintaxis en los archivos JavaScript principales.

## Importante sobre el panel admin

La web publica funciona en GitHub Pages porque usa archivos estaticos. El panel `admin.html` necesita el servidor local `server.cjs` para guardar cambios y usar las rutas `/api/...`.

GitHub Pages no ejecuta backend, asi que el panel admin no va a guardar cambios publicado ahi. Para administracion real online hace falta subir el backend a un hosting que ejecute Node.js, configurar `ADMIN_PASSWORD` en ese hosting, o conectar una base/API externa.

## Publicar en Vercel

La web incluye funciones en `/api/login` y `/api/site-data` para que el login del panel admin responda en Vercel.

En Vercel configura esta variable en `Settings > Environment Variables`:

```text
ADMIN_PASSWORD=TU_CLAVE
```

Despues redeploya el proyecto. Sin esa variable, el panel admin no puede iniciar sesion.

Nota: Vercel no permite guardar cambios permanentes escribiendo directamente en `src/data/site-data.json` desde una funcion serverless. El login y la lectura funcionan; para guardar cambios online de forma permanente hay que conectar una base de datos, Vercel Blob o un backend Node persistente.
