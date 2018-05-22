import Vue from 'vue';
import App from './App';
import router from './router'
import VueLazyLoad from 'vue-lazyload';
import infiniteScroll from  'vue-infinite-scroll';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);
Vue.use(infiniteScroll);
Vue.config.productionTip = false;
Vue.use(VueLazyLoad,{
  loading:'static/loading-svg/loading-bars.svg'
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
