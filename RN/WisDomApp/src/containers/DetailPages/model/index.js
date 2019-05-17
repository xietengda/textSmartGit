/*
* @Created by liqihui on 2019-04-15.
* @Desc index
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/
import { action, observable } from "mobx";


class Index {
    @observable discount = 0; //支付优惠券使用金额
    @observable
    isSigleType:boolean;//判断进入详情页类型是否为单课
    // add(){alert(1111)}
    scrollH = 0;
    scrollDetailH:0;
    scrollMuluH:0;
    scrollNoteH:0;
    @action
    addTest(h){
        alert(h)
        this.scrollH = h
    };
}
export default new Index()

// 滚动距离的高度
// function
