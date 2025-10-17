const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8082', // change to your backend URL
      changeOrigin: true,
      secure: false,
    })
  );
};