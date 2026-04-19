module.exports = {
  '/api/login': {
    target: 'http://localhost:3001',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/okta': {
    target: 'https://trial-2653197.okta.com',
    // Local dev only: bypass upstream TLS chain validation to handle corporate SSL interception.
    secure: false,
    changeOrigin: true,
    pathRewrite: { '^/okta': '' },
    logLevel: 'debug',
    onProxyReq: function (proxyReq) {
      // Remove browser-identifying headers so Okta treats this as a server-side request
      // and allows the Resource Owner Password Credentials grant type
      proxyReq.removeHeader('Origin');
      proxyReq.removeHeader('Referer');
      proxyReq.removeHeader('Sec-Fetch-Site');
      proxyReq.removeHeader('Sec-Fetch-Mode');
      proxyReq.removeHeader('Sec-Fetch-Dest');
      proxyReq.removeHeader('Sec-Fetch-User');
    }
  },
  '/api/login_2': {
    target: 'http://localhost:3001',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/api/exchange_code': {
    target: 'http://localhost:3001',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/api/logout': {
    target: 'http://localhost:3001',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/api/token': {
    target: 'http://localhost:3001',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  }
};
