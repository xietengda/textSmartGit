initVue

初始化项目
目录结构

├── README.md            项目介绍
├── index.html           入口页面
├── build              构建脚本目录
│  ├── build-server.js         运行本地构建服务器，可以访问构建后的页面
│  ├── build.js            生产环境构建脚本
|  ├── env-config.js         用于修改项目启动地址，接口访问地址
│  ├── dev-client.js          开发服务器热重载脚本，主要用来实现开发阶段的页面自动刷新
│  ├── dev-server.js          运行本地开发服务器
│  ├── utils.js            构建相关工具方法
│  ├── webpack.base.conf.js      wabpack基础配置
│  ├── webpack.dev.conf.js       wabpack开发环境配置
│  └── webpack.prod.conf.js      wabpack生产环境配置
├── config             项目配置
│  ├── dev.env.js           开发环境变量
│  ├── index.js            项目配置文件
│  ├── prod.env.js           生产环境变量
│  └── test.env.js           测试环境变量
├── package.json          npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
├── src               源码目录  
│  ├── main.js             入口js文件
│  ├── app.vue             根组件
│  ├── components           公共组件目录
│  │  └── title.vue
│  ├── assets             资源目录，这里的资源会被wabpack构建
│  │  └── images
│  │    └── logo.png
│  ├── routes             前端路由
│  │  └── index.js
│  ├── store              应用级数据（state） Vuex
│  │  |── actions.js      不改变状态，只提交(commit) mutation。
|  |  |── getters.js      暴露state全局使用
|  |  |── mutations.js    用于操作state的唯一途径
|  └─ └─── store.js        结合以上3点暴露使用
└──static             纯静态资源，不会被wabpack构建。
考虑到不同开发环境的运行和打包问题，现在可以框架已经封装打包工具

build/env-config.js 文件中修改不同环境需要的请求的接口和项目名称即可

/*
 * 环境列表，第一个环境为默认环境
 * envName: 指明现在使用的环境
 * dirName: 打包的路径，只在build的时候有用
 * projectUrl: 这个环境下面的项目运行的域名
 * baseUrl: 这个环境下面的api 请求的域名
 * assetsPublicPath: 静态资源存放的域名，未指定则使用相对路径
 * */
const ENV_LIST = [
    {
        //开发环境
        envName: 'dev',
        dirName: 'dev',
        proUrl:'127.0.0.1',
        baseUrl: 'https://appletvc.myoppo.com/',
        assetsPublicPath:'/'
    },
    {
        //测试环境
        envName: 'test',
        dirName: path.resolve(__dirname, '../wechain'),
        proUrl:'gashapon.h5.vchengnet.com',
        baseUrl: 'http://chj.h5.vchengnet.com/',
        assetsPublicPath: '/'
    },
    {
        //生产环境（命令行参数（process.arg）中prod是保留字，所以使用pro）
        envName: 'pro',
        dirName: path.resolve(__dirname, '../wechain'),
        proUrl:'chjgashapon.webapp.lmh5.com',
        baseUrl: 'http://chjnewbase-api.webapp.lmh5.com/',
        // proUrl:'https://chjgashapon.yaoqingwo.com',
        // baseUrl: 'https://chjnewbase-api.yaoqingwo.com/',
        assetsPublicPath:'/'
    },
 
]
启动和打包项目


# 启动项目 
npm run dev --dev (开发)
npm run dev --test (测试)
npm run dev --pro (生产)

# 打包项目
npm run build --dev (开发)
npm run build --test (测试)
npm run build --pro (生产)

px转rem 尽量使用rem单位 不要出现多种像素单位

项目已经引入换算rem工具只需要按照设计稿px/100= xxrem;

例如 100px/100 = 1rem;

如何请求后台接口

可以看到项目接口结构中的util/request.js 里面已经封装了 axios和 Promise 请求 可以进行 同步异步请求接口处理

接口统一写在util/api.js中，方便管理和查找

在api.js写接口

post请求

//模拟接口
getList(dataModel){
	return requestAll.postRequest(apiUrl + 'api/v1/region/regionTreeByActivity',dataModel);
}
如何在页面调用 假设在 homePage.vue中调用

export default {
  name: "homePage",
  data() {
    return {
      Request: this.$api, //请求头
    };
  },
  mounted() {},
  methods: {
    //需要异步的在方法名前加  async 
    async testGetList() {
      let that = this;
      let subMsg = {
        cityId: 0,
        provinceId: 0
      };
      //同步请求接口，在接口前面加一个 await 表示等待接口请求完成后再执行下面的操作
      await that.$api.getList(subMsg).then(res => {
        // console.log(res)
      });
    },

  },

  created() {
    var that = this;
    this.testGetList();
  },

};
</script>
vuex的使用

可以看到项目结构中有一个vuex文件 需要用到全局变量就在这里处理

actions.js （不改变状态，只提交(commit) mutation。）
getters.js (基于多个状态生成新的状态 暴露使用)
mutations.js (用于操作state的唯一途径)
store.js (整合以上3点暴露使用)
页面如何调用

computed: {
    keepLive () {
      return this.$store.getters.keepAlive
    }
},
如何改变

this.$store.commit('mutations定义的方法名', 改变的值);
。。。未完待续