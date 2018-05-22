//node.js调用第三方底层服务
var http=require('http');
http.get('http://203.18.255.118:9160/zxzh/comm/getConfigParam',function (res) {
  let data='';
  res.on('data',function (chunk) {
    data+=chunk;
  });
  res.on('end',function () {
    let result=JSON.parse(data);
    console.log(result);
  })
})
