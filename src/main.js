// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

// Helpers
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.deepOrange.accent3,
    secondary: colors.purple.darken1,
    accent: colors.orange.accent3
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
