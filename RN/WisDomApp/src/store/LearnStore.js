/*
* @Created by liqihui on 2019-05-09.
* @Desc LearnStore
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import { observable, computed, action } from 'mobx';
// 发现store
export default class LearnStore {
    rootStore;

    @observable learnList = [];

    constructor(rootStore) {
        this.rootStore = rootStore;
        console.log('LearnStore-x-x-x--',rootStore);
    }

    // 删
    @action
    delect(name) {
        this.learnList = this.learnList.filter(e => e.name !== name);
    }

    @computed get isAllSelected() {
        const allTrue = this.learnList.every(v => v.isSelected === true);
        if (allTrue) {
            return true;
        }
        return false;
    }

    // 总价格
    @computed get totalMoney() {
        let money = 0;
        this.learnList.filter(e => e.isSelected === true).forEach(e => {
            money += e.price * e.count;
        });
        return money;
    }
}
