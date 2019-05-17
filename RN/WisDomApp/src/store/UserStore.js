/*
* @Created by liqihui on 2019-05-09.
* @Desc UserStore
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/
import { observable, computed, action } from 'mobx';
// 发现store
export default class UserStore {
    rootStore;

    @observable userList = [];

    constructor(rootStore) {
        this.rootStore = rootStore;
        console.log('UserStore-x-x-x--',rootStore);
    }

    // 删
    @action
    delect(name) {
        this.userList = this.userList.filter(e => e.name !== name);
    }

    @computed get isAllSelected() {
        const allTrue = this.userList.every(v => v.isSelected === true);
        if (allTrue) {
            return true;
        }
        return false;
    }

    // 总价格
    @computed get totalMoney() {
        let money = 0;
        this.userList.filter(e => e.isSelected === true).forEach(e => {
            money += e.price * e.count;
        });
        return money;
    }
}
