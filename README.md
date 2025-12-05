# Carrito de Compras de GuitarLA

Proyecto introductorio de React + Vite + CSS + Gitpages

## Instalación

```bash
npm install
npm run dev
```
## Deployment
Se realiza deployment mediante Github actions y Github pages

![Deploy](https://github.com/tchock42/guitarla-cart/actions/workflows/deploy.yml/badge.svg?branch=main)

---

## Tecnologías utilizadas
- HTML + CSS
- React + Vite
- Github Actions (CI/CD)
- Github Pages

## CI/CD Workflow

Este proyecto incluye un pipelineautomatizado con **Github Actions** que:
1. Instala dependencias (`npm install`).
2. Compila la aplicación (`npm run build`).
3. Publica la carpeta `/dist` en la rama `gh-pages`.
4. Github Pages sirve el contenido automáticamente.

Archivo del workflow: `.github/workflows/deploy.yml`

---

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/guitarla-cart/'   // nombre del repositorio
})
```

## Demo en línea

[Ver sitio en línea](https://tchock42.github.io/guitarla-cart/)
