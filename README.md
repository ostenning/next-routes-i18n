# Internationalized routing alternative for Next.js

*Actively maintained and contributors welcome*

Based on [Next-Routes](https://github.com/fridays/next-routes) with these changes:

- No support for unnamed routes
- Route can be added only by name, locale and pattern (and optionally page) or options object
- `Link` and `Router` generate URLs only by route definition (name + params)
- URLs are prefixed with locale (ie. /en/about). This feature is optional
- Routes can have data object (if you generate routes dynamically you can pass custom data there)
- default RequestHandler set locale and nextRoute properties on request (you can get data with ```req.nextRoute.data```) 

## How to use

Install:

```bash
npm install next-routes-i18n --save
```

Create `routes.js` inside your project:

```javascript
import RoutesI18n from 'next-routes-i18n';

const options = {
  Link,                       // optional Link, uses next/link by default
  Router,                     // optional Router, uses next/router by default
  locale: 'en',               // Locale
  defaultLocale: 'en',        // Default locale
  hideDefaultLocale: false,   // hide locale prefix when default is detected
  hideLocalePrefix: false,    // hide all locale prefixes
}

const routes = RoutesI18n(options);

routes
  .add('about', 'en', '/about')
  .add('blog', 'en', '/blog/:slug')
  .add('blog', 'en', '/blog/:slug', { myCustom: 'data' })
  .add('user', 'en', '/user/:id', 'profile', { myCustom: 'data' })
  .add({ name: 'beta', locale: 'en', pattern: '/v3', page: 'v3' })
  .add('about', 'cs', '/o-projektu')
  .add('blog', 'cs', '/blog/:slug')
  .add('user', 'cs', '/uzivatel/:id', 'profile')
  .add({ name: 'beta', locale: 'cs', pattern: '/v3', page: 'v3' })

export default routes;
```

This file is used both on the server and the client.

API:

- `routes.add(name, locale, pattern = /name, page = name, data)`
- `routes.add(object)`

Arguments:

- `name` - Route name (e.g. `about`)
- `locale` - Locale of the route (e.g. `fr`)
- `pattern` - Route pattern (e.g. `/about`; like express, see [path-to-regexp](https://github.com/pillarjs/path-to-regexp))
- `page` - Page inside `./pages` to be rendered; can be ommited (it takes by default the route name as the page name)
- `data` - Custom data object

The page component receives the matched URL parameters merged into `query`

```javascript
export default class Blog extends React.Component {
  static async getInitialProps ({ query }) {
    // query.slug
  }
  render () {
    // this.props.url.query.slug
  }
}
```

## On the server

```javascript
// server.js
const next = require('next')
const routes = require('./routes')
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handler = routes.getRequestHandler(app)

// With express
const express = require('express')
app.prepare().then(() => {
  express().use(handler).listen(3000)
})

// Without express
const { createServer } = require('http')
app.prepare().then(() => {
  createServer(handler).listen(3000)
})
```

> RequestHandler automatically sets req.locale to locale of matched route so you can use it in your app.

Optionally you can pass a custom handler, for example:

```javascript
const handler = routes.getRequestHandler(app, ({ req, res, route, query }) => {
  app.render(req, res, route.page, query)
})
```

Make sure to use `server.js` in your `package.json` scripts:

```json
"scripts": {
  "dev": "node server.js",
  "build": "next build",
  "start": "NODE_ENV=production node server.js"
}
```

## On the client

Import `Link` and `Router` from your `routes.js` file to generate URLs based on route definition:

### `Link` example

```jsx
// pages/index.js
import { Link } from '../routes'

export default () => (
  <div>
    <div>Welcome to Next.js!</div>
    <Link href='blog' params={{slug: 'hello-world'}}>
      <a>Hello world</a>
    </Link>
    or
    <Link href='blog' locale='cs' params={{slug: 'ahoj-svete'}}>
      <a>Hello world</a>
    </Link>
  </div>
)
```

API:

- `<Link href='name'>...</Link>`
- `<Link href='name' locale='locale'>...</Link>`
- `<Link href='name' params={params}> ... </Link>`
- `<Link href='name' locale='locale' params={params}> ... </Link>`

Props:

- `href` - Route name to match (the name, not the pattern)
- `params` - Optional parameters

It generates the URLs prefixed with the locale for `href` and `as` and renders `next/link`. Other props like `prefetch` will work as well.

### `Router` example

```jsx
// pages/blog.js
import React from 'react'
import { Router } from '../routes'

export default class Blog extends React.Component {
  handleClick () {
    // With route name and params
    Router.pushRoute('blog', { slug: 'hello-world' })
    // With route name and params and explicit locale
    Router.pushRoute('blog', { slug: 'hello-world' }, 'en')
  }
  render () {
    return (
      <div>
        <div>{this.props.url.query.slug}</div>
        <button onClick={this.handleClick}>Home</button>
      </div>
    )
  }
}
```

API:

- `Router.pushRoute(route, params)` - automatically get current locale
- `Router.pushRoute(route, params, locale)`
- `Router.pushRoute(route, params, locale, options)`

Arguments:

- `route` - Route name
- `locale` - Route locale
- `params` - Optional parameters for named routes
- `options` - Passed to Next.js

The same works with `.replaceRoute()` and `.prefetchRoute()`

It generates the URLs and calls `next/router`

---

Optionally you can provide custom `Link` and `Router` objects, for example:

```javascript
const routes = module.exports = require('next-routes-with-locale')({
  Link: require('./my/link')
  Router: require('./my/router')
})
```

---

##### Related links

- [zeit/next.js](https://github.com/zeit/next.js) - Framework for server-rendered React applications
- [path-to-regexp](https://github.com/pillarjs/path-to-regexp) - Express-style path to regexp
