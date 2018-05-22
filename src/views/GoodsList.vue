<template>
    <div>
     <nav-header></nav-header>
      <nav-bread>
        <span>Goods</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default " v-bind:class="{'cur':curSortType}"> Default</a>
            <a href="javascript:void(0)" class="price" @click="sortGoods" v-bind:class="{'cur':!curSortType}">Price
              <img src="./../assets/down.svg" alt="" v-bind:class="{'sortUp':isUp}">
            </a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price: </dt>
                <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceCheck=='all'}">All</a></dd>
                <dd v-for="(item,index) in priceFilter">
                  <a href="javascript:void(0)" v-bind:class="{'cur':priceCheck==index}" @click="setPriceFilter(index)">{{item.startPrice}}—— {{item.endPrice}}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item,index) in goodList">
                    <div class="pic">
                      <a href="#"><img v-lazy="'/static/'+item.productImage"  alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn-m" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                  <img src="./../assets/loading-spinning-bubbles.svg" alt="" v-show="loading">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
      <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
        <p slot="message">
          请先登录，否则无法加入购物车
        </p>
        <div slot="btnGroup">
          <el-button type="primary" @click="closeModal">关闭</el-button>
        </div>
      </modal>
      <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
        <p slot="message">
          <svg class="navbar-cart-logo">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
          </svg>
          <span>加入购物车成功</span>
        </p>
        <div slot="btnGroup">
          <el-button type="primary" plain @click="mdShowCart=false">继续购物</el-button>
          <router-link class="btn btn--m" href="javascript:" to="/cart">查看购物车</router-link>
        </div>
      </modal>
      <nav-footer></nav-footer>
    </div>
</template>
<script>
    import './../assets/css/base.css'
    import './../assets/css/product.css'
    import './../assets/css/login.css'
    import NavHeader from '@/components/NavHeader.vue'
    import NavFooter from '@/components/NavFooter.vue'
    import NavBread from '@/components/NavBread.vue'
    import Modal from '@/components/Modal.vue'
    import axios from 'axios'
    export default{
        data(){
            return {
              goodList:[],
              priceFilter:[
                {
                  startPrice:'0.00',
                  endPrice:'100.00'
                },
                {
                  startPrice:'100.00',
                  endPrice:'500.00'
                }
                ,
                {
                  startPrice:'500.00',
                  endPrice:'1000.00'
                }
                ,
                {
                  startPrice:'1000.00',
                  endPrice:'2000.00'
                }
              ],
              priceCheck:'all',
              filterBy:false,
              overLayFlag:false,
              sortFlag:true,
              page:1,
              pageSize:8,
              busy:true, //禁用
              loading:true,
              isUp:true,
              curSortType:true,
              mdShow:false,
              mdShowCart:false
            }
        },
      components:{
          NavHeader:NavHeader,
          NavFooter:NavFooter,
          NavBread:NavBread,
          Modal:Modal
      },
      mounted:function () {
        this.getGoodList();
      },
      methods:{
        getGoodList(flag){
          var param={
            page:this.page,
            pageSize:this.pageSize,
            sort:this.sortFlag? 1: -1,
            priceLevel:this.priceCheck
          };
          this.loading=true;
          axios.get('/goods/list',{
            params:param
          }).then((result)=>{
            this.loading=false;
            var res=result.data;
            if(res.status=='0'){
              if(flag){
                this.goodList=this.goodList.concat(res.result.list);
                if(res.result.count=0){
                  this.busy=true
                }
                else {
                  this.busy=false
                }
              }
              else{
                this.goodList=res.result.list;
                this.busy=false
              }
            }
            else{
              this.goodList=[];
            }
          })
        },
        sortGoods(){
          this.sortFlag=!this.sortFlag;
          this.isUp=!this.isUp;
          this.curSortType=false;
          this.page=1;
          this.getGoodList()
        },
        showFilterPop(){
          this.filterBy=true;
          this.overLayFlag=true;
        },
        closePop(){
          this.filterBy=false;
          this.overLayFlag=false;
        },
        setPriceFilter(index){
          this.priceCheck=index;
          this.closePop();
          this.page=1;
          this.getGoodList();
        },
        loadMore: function() {
          this.busy = true;
          //官方示例中延迟了1秒，防止滚动条滚动时的频繁请求数据
          setTimeout(() => {
            //这里请求接口去拿数据，实际应该是调用一个请求数据的方法
            this.page++;
            this.getGoodList(true);
          }, 1000);
        },
        addCart(productId){
          axios.post("/goods/addCart",{
            productId:productId
          }).then((response)=>{
            let res=response.data
            if(res.status=='0'){
              this.mdShowCart=true;
            }
            else{
              this.mdShow=true;
              //alert(res.msg)
            }
          })
        },
        closeModal(){
          this.mdShow=false;
          this.mdShowCart=false;
        }
      }

    }
</script>
