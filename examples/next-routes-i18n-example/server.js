const express = require('express')
const next = require('next')
const routes = require('./routes')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const prepareRequest = (req, res, nextFunc) => {
  console.info('prepare req', req.url)
  nextFunc()
}

app.prepare().then(() => {
  express()
    .use(routes.getRequestHandler(app, ({ req, res, route, query }) => {
      console.info('routes req handler')
      app.render(req, res, route.page, query)
    }))
    .use(prepareRequest)
    .listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`)
    })
})
