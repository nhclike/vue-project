<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>My Cart</span>
    </nav-bread>

  this is a test
    <nav-footer></nav-footer>

  </div>
</template>

<script>
  import './../assets/css/checkout.css'
  import NavHeader from '@/components/NavHeader.vue'
  import NavFooter from '@/components/NavFooter.vue'
  import NavBread from '@/components/NavBread.vue'
  import Modal from '@/components/Modal.vue'
  import axios from 'axios';
  export default{
    data(){
      return{


      }
    },
    components:{
      NavHeader:NavHeader,
      NavFooter:NavFooter,
      NavBread:NavBread,
      Modal:Modal
    }

  }
</script>
