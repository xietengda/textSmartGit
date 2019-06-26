/*
* @Created by liqihui on 2019-05-14.
* @Desc MarkAcivitStore
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import { observable, computed, action } from 'mobx';
// 发现store

export default class MarkAcivitStore {
    rootStore;

    @observable barginType = 'FQkj';
    @observable FQkj = 'FQkj';//发起砍价
    @observable WDkj = 'WDkj';//我的砍价
    @observable KJTimeOut = 'KJTimeOut';//砍价超时
    @observable KJPay = 'KJPay';//砍价后支付
    @observable KJEnd = 'KJEnd';//砍价活动结束（包括时间到了没支付or已支付完成的）
    //分享后的状态
    @observable WYYKJ = 'WYYKJ';//我也要砍价

    @observable acivitType = 'MyHelp';
    @observable MyHelp = 'MyHelp';//我的助力
    @observable SECKill = 'SECKill';//限时秒杀

    //拼团
    @observable groupType = 'FQpt';//
    @observable FQpt = 'FQpt';//发起拼团
    @observable WDpt = 'WDpt';//我的拼团
    @observable PTTimeOut = 'PTTimeOut';//拼团超时
    @observable PTEnd = 'PTEnd';//拼团活动结束
    @observable PTSuccess = 'PTSuccess';//拼团活动结束


    constructor(rootStore) {
        this.rootStore = rootStore;
    }
    @computed get bargainType(){

    }
}
