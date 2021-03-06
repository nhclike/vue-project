import Vue from 'vue';
import App from './App';

import Vuex from 'vuex';
import router from './router'
import VueLazyLoad from 'vue-lazyload';
import infiniteScroll from  'vue-infinite-scroll';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import {currency} from './util/currency';
import axios from 'axios';
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(infiniteScroll);
Vue.config.productionTip = false;
Vue.use(VueLazyLoad,{
  loading:'static/loading-svg/loading-bars.svg'
});
Vue.filter('currency',currency);

const store=new Vuex.Store({
  state:{
    nickName:'admin',
    cartCount:0
  },
  mutations:{
    updateUserInfo(state,nickName){
      state.nickName=nickName
    },
    updateCartCount(state,cartCount){
      state.cartCount+=Number(cartCount)
    },
    initCartCount(state,cartCount){
      state.cartCount=cartCount
    }
  }
});


//
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
  var config = err.config;
  // If config does not exist or the retry option is not set, reject
  if(!config || !config.retry) return Promise.reject(err);

  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0;

  // Check if we've maxed out the total number of retries
  if(config.__retryCount >= config.retry) {
    // Reject with the error
    return Promise.reject(err);
  }

  // Increase the retry count
  config.__retryCount += 1;

  // Create new promise to handle exponential backoff
  var backoff = new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
    }, config.retryDelay || 1);
  });

  // Return the promise in which recalls axios to retry the request
  return backoff.then(function() {
    return axios(config);
  });
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
