// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import router from './router'
import { sync } from 'vuex-router-sync'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.use(mavonEditor)

sync(store, router)

Vue.config.productionTip = false

const mixin = {
  methods: {
    pageNotify: function (text) {
      const h = this.$createElement

      this.$notify({
        title: '响应',
        message: h('i', {style: 'color: teal'}, text)
      })
    }
  }
}

Vue.mixin({
  methods: {
    timeOutFun (fn, time = 1000) {
      setTimeout(fn, time)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  mixins: [mixin],
  template: '<App/>',
  components: { App }
})
