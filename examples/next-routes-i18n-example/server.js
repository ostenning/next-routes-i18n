const express = require('express')
const next = require('next')
const routes = require('./routes')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

app.prepare().then(() => {
    express()
      .use(routes.getRequestHandler(app))
      .listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
      });
  });
  