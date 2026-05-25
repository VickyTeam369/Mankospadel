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
