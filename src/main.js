import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';
import VeeValidate from 'vee-validate';
import msg from './pt_BR';
import VueTheMask from 'vue-the-mask'


Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueTheMask);



Vue.use(VeeValidate, {
  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages: msg
    }
  }
});

Vue.http.options.root = 'http://localhost:3000';
const router = new VueRouter({
  routes,
  mode:'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

