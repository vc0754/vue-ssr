// import Vue from 'vue'
// import App from './App.vue'
// import { createRouter } from './router'
// import { createStore } from './store'
// import { sync } from 'vuex-router-sync'

// export function createApp () {
//   const router = createRouter()
//   const store = createStore()
//   sync(store, router)
//   const app = new Vue({
//     router,
//     store,
//     render: h => h(App)
//   })
//   return { app, router, store }
// }


const Vue = require('vue')

module.exports = function createApp (context) {
  return new Vue({
    data: {
      url: context.url,
      title: context.title
    },
    template: `<div>
    <h3>Vue Template</h3>
    <p>访问的 URL 是： {{ url }}</p>
    <p>data title 是：{{ title }}</p>
    </div>`
  })
}