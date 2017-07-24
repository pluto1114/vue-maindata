// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import MuseUI from 'muse-ui'

import FastClick from 'fastclick'
import { domain, count, prettyDate,int,fix,money,sub} from './filters'


Vue.filter('count', count)
Vue.filter('domain', domain)
Vue.filter('prettyDate', prettyDate)

Vue.filter('int', int)
Vue.filter('fix', fix)
Vue.filter('money', money)
Vue.filter('sub', sub)


Vue.use(MuseUI)


FastClick.attach(document.body)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
