import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//导入vuex 
import store from '../vuex/store.js';
Vue.prototype.$store = store;


var routers =new Router({
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: resolve => require(['../pages/homePage/homePage.vue'], resolve),
      meta: {
        title: '',
        keepAlive: true, //此组件需要被缓存
        isBack:false,//是否返回页面
      },
    },
    {
      path: '/testPage',
      name: 'testPage',
      component: resolve => require(['../pages/testPage/testPage.vue'], resolve),
      meta: {
        title: '',
        keepAlive: true,
        isBack:false
      },
    },
    {
      path: '/page3',
      name: 'page3',
      component: resolve => require(['../pages/page3/page3.vue'], resolve),
      meta: {
        title: '',
        keepAlive: false,
        isBack:false
      },
    }
  ]
})

routers.beforeEach((to, from, next) => {

  //不需要缓存页面
  let noCach = ['test'];
  let toPath = to.name;
  let fromPath = from.name;

  //跳转页面缓存，被跳转页面不缓存
  let allUlr = sessionStorage.getItem('skipPage') != null &&  sessionStorage.getItem('skipPage') !=  "" ?  JSON.parse(sessionStorage.getItem('skipPage')) : [];
  store.commit('setKeepAlive', allUlr);

  
  if(!allUlr.includes(toPath)){
    //如果某个页面不需要缓存 不添加进去
    if(!noCach.includes(toPath)){
      allUlr.push(toPath);
      sessionStorage.setItem('skipPage',JSON.stringify(allUlr));
      store.commit('setKeepAlive', allUlr);
    }
  }else{
    let newArr = [];
    //如果是返回那就删除缓存
    for(let x in allUlr){
      if(allUlr[x] != fromPath){
        newArr.push(allUlr[x]);
      }
    }
    //设置页面返回
    from.meta.isBack = true;
    sessionStorage.setItem('skipPage',JSON.stringify(newArr));
    store.commit('setKeepAlive', newArr);
  }

  next();
});


export default routers;
