const fs = require('fs')
const Vue = require('vue')
const server = require('express')()
const { createRenderer } = require('vue-server-renderer')

const renderer = createRenderer({
  template: fs.readFileSync('./index.template.html', 'utf-8')
})

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })
  
  const context = {
    title: 'hellox',
    meta: `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    `
  }

  renderer.renderToString(app, context).then(html => {
    res.end(html)
  }).catch(err => {
    console.error(err)
    res.status(500).end('Internal Server Error')
  })
})

const port = process.env.PORT || 8080
server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})