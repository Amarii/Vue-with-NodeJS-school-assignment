// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/store'

// Vuex Store

Vue.config.productionTip = false

Vue.use(Vuetify)


/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router: router,
	components: { App },
	render: h => h(App),
	template: '<App/>'
})
