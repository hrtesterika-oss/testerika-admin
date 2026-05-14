const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/translate',
    createProxyMiddleware({
      target: 'https://libretranslate.de/translate',
      changeOrigin: true,
    }),
  ),
  app.use(
    '/languages',
    createProxyMiddleware({
      target: 'https://libretranslate.de/languages',
      changeOrigin: true,
    }),
  )
}
