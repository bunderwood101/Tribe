// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router/routes'
import {apolloProvider} from './services/cmsapi'
import VueApollo from 'vue-apollo'

Vue.use(Element)
Vue.use(VueApollo)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  template: '<App/>',
  components: { App },
  render: h => h(App)
})
