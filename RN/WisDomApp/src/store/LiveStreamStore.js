/*
* @Created by liqihui on 2019-05-09.
* @Desc LiveStreamStore
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/
import { observable, computed, action } from 'mobx';
import {testUrl} from "../utils/Api";
// 发现store
export default class LiveStreamStore {
    rootStore;

    @observable liveStreamList = [];

    constructor(rootStore) {
        this.rootStore = rootStore;
        // storage.load
        console.log('LiveStreamStore-x-x-x--',rootStore);

    }

    // 删
    @action
    delect(name) {
        this.liveStreamList = this.liveStreamList.filter(e => e.name !== name);
    }

    @action
    plus = async () => {
        storage.load({
            key: 'LiveStreamScreen',
            autoSync: false,
            syncInBackground: true,
        }).then(ret => {
            console.log('ret--x-x--'+ret);
        }).catch(err => {
            console.warn('_readData11 error =' + err.message);
        })
    }

    @computed get isAllSelected() {
        const allTrue = this.liveStreamList.every(v => v.isSelected === true);
        if (allTrue) {
            return true;
        }
        return false;
    }

    // 总价格
    @computed get totalMoney() {
        let money = 0;
        this.liveStreamList.filter(e => e.isSelected === true).forEach(e => {
            money += e.price * e.count;
        });
        return money;
    }

}
