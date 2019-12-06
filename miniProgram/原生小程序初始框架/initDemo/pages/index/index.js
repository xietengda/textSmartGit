const app = getApp();
//工具类
import util from '../../utils/util.js';
const utils = util.util.prototype;
//接口
const api = getApp().api.default.prototype;

Page({
  data: {
    utils:util.util.prototype,//工具
  },
  onShow(){
    this.getIndexInfo();
  },
   //获取首页信息
  getIndexInfo(){
    let that  = this;
    api.getIndexMsg()
      .then(res =>{
        console.log(res)
        if(res.code == 0){
         
          
        }else{
          utils.showToast(res.message);
        }
      })
  },
})
