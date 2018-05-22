var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var Goods=require('../models/goods');

//连接mongo数据库
mongoose.connect("mongodb://127.0.0.1:27017/dumall");

mongoose.connection.on("connected",function () {
  console.log("MongoDB connected success");
});
mongoose.connection.on("error",function () {
  console.log("MongoDB connected fail");
});

mongoose.connection.on("deconnected",function () {
  console.log("MongoDB connected deconnected");
});
//查询商品列表
router.get('/list',function (req,res,next) {
  let page=parseInt(req.param("page"));//解析前台传过来的参数；第几页
  let pageSize=parseInt(req.param("pageSize")); //每页大小
  let sort=parseInt(req.param("sort")); //排序方式
  let skip=(page-1)*pageSize; //从第几个数据开始
  let priceLevel=req.param('priceLevel');
  var priceGt='',priceLte='';
  let params={};
  if(priceLevel!='all'){
    switch (priceLevel){
      case '0':priceGt=0;priceLte=100;break;
      case '1':priceGt=100;priceLte=500;break;
      case '2':priceGt=500;priceLte=1000;break;
      case '3':priceGt=1000;priceLte=5000;break;
    }
    params={
      salePrice:{
        $gt:priceGt,
        $lte:priceLte

      }
    }
  }

  let goodsModel=Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({'salePrice':sort});

  goodsModel.exec(function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })
});
//加入购物车
router.post("/addCart",function (req,res,next) {
  var userId="100000077",productId=req.body.productId;
  var User=require('./../models/users');
  User.findOne({
    userId:userId
  },function (err,userDoc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }
    else {
      console.log("userDoc"+userDoc);
      if(userDoc){
        let goodItem='';
        userDoc.cartList.forEach(function (item) {
          if(item.productId==productId){
            goodItem=item;
            item.productNum++;
          }
        });
        if(goodItem){
          userDoc.save(function (err2,doc2) {
            if(err){
              res.json({
                status:'1',
                msg:err.message
              })
            }
            else{
              res.json({
                status:"0",
                msg:'',
                result:"suc"
              })
            }
          })
        }
        else {
          Goods.findOne({productId:productId},function (err,doc) {
            if(err){
              res.json({
                status:'1',
                msg:err.message
              })
            }
            else {
              if(doc){
                doc.productNum=1;
                doc.checked=1;
                userDoc.cartList.push(doc);
                userDoc.save(function (err2,doc2) {
                  if(err){
                    res.json({
                      status:'1',
                      msg:err.message
                    })
                  }
                  else{
                    res.json({
                      status:"0",
                      msg:'',
                      result:"suc"
                    })
                  }
                })
              }
            }
          })
        }

      }
    }
  })
});
module.exports=router;
