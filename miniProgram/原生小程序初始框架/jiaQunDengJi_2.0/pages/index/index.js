const app = getApp();
//工具类
import util from '../../utils/util.js';

Page({
  data: {
    utils:util.util.prototype,//工具
  },
  onShow(){
    console.log(util.util.prototype.changeTimeFormat(1571899984))
  }
})
