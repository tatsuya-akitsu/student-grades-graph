import Vue from 'vue';
import VueCompositionApi from "@vue/composition-api";
import Dev from './serve.vue';

Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Dev),
}).$mount('#app');
