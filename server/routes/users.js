var express = require('express');
var router = express.Router();
var User=require('./../models/users');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//登录接口
router.post('/login', function(req, res, next) {
  var param={
    userName:req.body.userName,
    userPwd:req.body.userPwd
  };
  User.findOne(param,function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }
    else{
      if(doc){
        //cookie
        res.cookie("userId",doc.userId,{
          path:'/',
          maxAge:1000*60*60
        });
        res.cookie("userName",doc.userName,{
          path:'/',
          maxAge:1000*60*60
        });
       // req.session.user=doc; //存储在session中
        res.json({
          status:'0',
          msg:'',
          result:{
            userName:doc.userName
          }
        })
      }
    }
  })
});


//登出接口
router.post('/logout',function (req,res,next) {
  res.cookie("userId","",{
    path:'/',
    maxAge:-1
  })
  res.json({
    status:'0',
    msg:"退出登录成功",
    result:""
  })
});

router.get('/checkLogin',function (req,res,next) {
  if(req.cookies.userId){
    res.json({
      status:'0',
      msg:'当前已经登录',
      result:req.cookies.userName || ''
    })
  }
  else{
    res.json({
      status:'1',
      msg:'当前未登录',
      result:''
    })
  }
});

//用户购物车列表接口实现
router.get('/cartList',function (req,res,next) {
  var userId=req.cookies.userId;
  User.findOne({userId:userId},function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }
    else{
      if(doc){
        res.json({
          status:'0',
          msg:'',
          result:doc.cartList
        })
      }
    }
  })
});

//购物车删除
router.post('/delCart',function (req,res,next) {
  var  productId=req.body.productId;
  var userId=req.cookies.userId;
  User.update({
    userId:userId
  },{
    $pull:{
     'cartList':{
       'productId':productId
     }
    }
  },function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:'操作失败',
        result:''
      })
    }
    else{
      if(doc){
        res.json({
          status:'0',
          msg:'删除成功',
          result:''
        })
      }

    }
  })
});

//购物车变化
router.post('/updateCart',function (req,res,next) {
  var productNum=req.body.productNum,
    productId=req.body.productId,
    userId=req.cookies.userId,
    checked=req.body.checked;
  User.update({
    "userId":userId,
    "cartList.productId":productId
  },{
    "cartList.$.productNum":productNum,
    "cartList.$.checked":checked
  },function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:'操作失败',
        result:''
      })
    }
    else{
      if(doc){
        res.json({
          status:'0',
          msg:'操作成功',
          result:''
        })
      }

    }
  })
});
//购物车全选
router.post('/checkAll',function (req,res,next) {
  var userId=req.cookies.userId,
    checkAll=req.body.checkAll; //1选中0没选
  User.findOne({'userId':userId},function (err,user) {
    if(err){
      res.json({
        status:'1',
        msg:'操作失败',
        result:''
      })
    }
    else{
      if(user){
        user.cartList.forEach((item)=>{
          item.checked=checkAll;
        });
        user.save(function (err1,doc) {
          if(err1){
            res.json({
              status:'1',
              msg:'操作失败',
              result:''
            })
          }
          else{
            if(doc){
              res.json({
                status:'0',
                msg:'',
                result:''
              })
            }

          }
        })
      }
    }
  })
});
module.exports = router;
