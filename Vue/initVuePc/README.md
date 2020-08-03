
# 初始化项目

```
建议node版本：v10.15.3
建议npm版本：v6.4.1
建议使用淘宝镜像cnpm

1、cnpm i

启动项目（详情查阅“启动和打包项目”）
2、npm run [mode] --[env]-[host]     例如： npm run dev --pro-8212    npm run build --pro-8212
```


# 目录结构

├── README.md                     项目介绍
├── index.html                    入口页面
├── build                         构建脚本目录
│  ├── build-server.js            运行本地构建服务器，可以访问构建后的页面
│  ├── build.js                   生产环境构建脚本
|  ├── env-config.js              用于修改项目启动地址，接口访问地址
│  ├── dev-client.js              开发服务器热重载脚本，主要用来实现开发阶段的页面自动刷新
│  ├── dev-server.js              运行本地开发服务器
│  ├── utils.js                   构建相关工具方法
│  ├── webpack.base.conf.js       wabpack基础配置
│  ├── webpack.dev.conf.js        wabpack开发环境配置
│  └── webpack.prod.conf.js       wabpack生产环境配置
├── config                        项目配置
│  ├── dev.env.js                 开发环境变量
│  ├── index.js                   项目配置文件
│  ├── prod.env.js                生产环境变量
│  └── test.env.js                测试环境变量
├── package.json                  npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
├── src                           源码目录  
│  ├── main.js                    入口js文件
│  ├── App.vue                    根组件
│  ├── api                        请求相关
│  ├── util                       工具函数
│  ├── components                 公共组件目录
│  │  └── title.vue
│  ├── assets                     资源目录，这里的资源会被wabpack构建
│  │  └── images
│  │    └── logo.png
│  ├── routes                     前端路由
│  │  └── index.js
│  ├── store                      应用级数据（state） Vuex
│  │  |── actions.js              不改变状态，只提交(commit) mutation。
|  |  |── getters.js              暴露state全局使用
|  |  |── mutations.js            用于操作state的唯一途径
|  └─ └─── store.js               结合以上3点暴露使用
└──static                         纯静态资源，不会被wabpack构建。

build/env-config.js 文件中修改不同环境需要的请求的接口和项目名称即可

# 启动和打包项目


## 启动项目 
```
npm run dev --dev-[host] (开发)
npm run dev --test-[host] (测试)
npm run dev --pro-[host] (生产)
```

## 打包项目
```
npm run build --dev-[host] (开发)
npm run build --test-[host] (测试)
npm run build --pro-[host] (生产)
```

px转rem 尽量使用rem单位 不要出现多种像素单位

项目已经引入换算rem工具只需要按照设计稿px/100= xxrem;

例如 100px/100 = 1rem;

如何请求后台接口

可以看到项目接口结构中的src/api/request.js 里面已经封装了 axios和 Promise 请求 可以进行 同步异步请求接口处理

接口模块统一到src/api/index.js中

使用及编写可参考现有api

vuex的使用

可以看到项目结构中有一个vuex文件 需要用到全局变量就在这里处理

getters.js (基于多个状态生成新的状态 暴露使用)
actions.js （不改变状态，只提交(commit) mutation。）
mutations.js (用于操作state的唯一途径)
store.js (整合以上3点暴露使用)

```
页面如何调用

computed: {
    keepLive () {
      return this.$store.getters.keepAlive
    }
},
如何改变

this.$store.commit('mutations定义的方法名', 改变的值);
```