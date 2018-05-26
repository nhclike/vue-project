import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld';
import GoodList from '@/views/GoodsList';
import Cart from '@/views/Cart';
import Address from '@/views/Address';
import orderConfirm from '@/views/orderConfirm'
import test from '@/views/test'
Vue.use(Router)

export default new Router({
  mode: 'history',//也可以为hash则端口号后面要加一个#
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'GoodList',
      component: GoodList
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: orderConfirm
    }

  ]
})
