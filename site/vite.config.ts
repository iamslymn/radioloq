import fs from 'node:fs'
import path from 'node:path'
import type { Connect, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/** Routes the React app answers itself. Everything else without a file is a 404. */
const APP_ROUTES = new Set(['/', '/design-system'])
const INTERNAL = /^\/(@|src\/|node_modules\/|__)/

/**
 * Serves the static legal pages without ".html" (/terms-en, /services-de) and sends
 * the branded 404 page for unknown paths. Production hosts do the same natively:
 * Netlify, Cloudflare Pages and GitHub Pages out of the box, Vercel through vercel.json.
 */
function cleanUrls(): Plugin {
  const middleware = (dir: () => string): Connect.NextHandleFunction => (req, res, next) => {
    const url = new URL(req.url ?? '/', 'http://localhost')
    const pathname = url.pathname.replace(/(.)\/$/, '$1')
    const exists = (file: string) => fs.existsSync(path.join(dir(), file)) && fs.statSync(path.join(dir(), file)).isFile()

    if (pathname.endsWith('.html') && pathname !== '/index.html' && pathname !== '/404.html' && exists(pathname)) {
      res.statusCode = 301
      res.setHeader('Location', pathname.slice(0, -5) + url.search)
      return res.end()
    }

    if (!path.extname(pathname) && !INTERNAL.test(pathname) && !APP_ROUTES.has(pathname)) {
      if (exists(`${pathname}.html`)) {
        req.url = `${pathname}.html${url.search}`
        return next()
      }
      if (exists('404.html')) {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        return res.end(fs.readFileSync(path.join(dir(), '404.html')))
      }
    }
    next()
  }

  let publicDir = ''
  let outDir = ''
  return {
    name: 'clean-urls',
    configResolved(config) {
      publicDir = config.publicDir
      outDir = path.resolve(config.root, config.build.outDir)
    },
    configureServer(server) {
      server.middlewares.use(middleware(() => publicDir))
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware(() => outDir))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cleanUrls()],
})
