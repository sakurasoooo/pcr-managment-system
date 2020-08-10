import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
//alert(`Vue version : ${Vue.version}`);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
