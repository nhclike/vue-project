# vue-project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
第一步启动MongoDB
mongod --dbpath D:\MongoDB\data\db    
之所以可以直接使用mongod命令是因为在环境变量中配置了
dbpath 是数据库存放的路径是在mongo.config文件中配置好的,一般指定在mongodb安装的目录下面


第二步导入数据
--即使已经配置了环境变量，还是要在mongodb的bin目录下打开控制台输入

mongoimport -d 数据库名称 -c 集合名称 --file json文件地址

第三步在mongoVue中查看导入的数据
指定引擎解决mongoVue无法操作collection问题（主要是因为mongovue的版本问题）

mongod -storageEngine mmapv1 -dbpath D:\MongoDB\data

第四步安装依赖
项目下执行
npm install    -----安装依赖

第五步启动node 后台服务
在server目录下执行
npm start

第六步启动vue项目
直接在项目目录下执行
npm run dev


