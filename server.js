const fs = require('fs')
const server = require('express')()
const { createRenderer } = require('vue-server-renderer')

const createApp = require('./src/app')

const renderer = createRenderer({
  template: fs.readFileSync('./src/index.template.html', 'utf-8')
})

server.get('*', (req, res) => {
  const context = {
    url: req.url,
    title: 'hello vue ssr',
    meta: `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    `
  }
  const app = createApp(context)
  // createApp(context).then(app => {
  //   console.log(app)
  // })

  renderer.renderToString(app, context).then(html => {
    res.end(html)
  }).catch(err => {
    if (err.code === 404) {
      res.status(404).end('Page not found')
    } else {
      res.status(500).end('Internal Server Error')
    }
  })
})

const port = process.env.PORT || 8080
server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})