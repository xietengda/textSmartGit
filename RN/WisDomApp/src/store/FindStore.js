/*
* @Created by liqihui on 2019-05-09.
* @Desc FindStore
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/
import { observable, computed, action } from 'mobx';
import {findIcon, testUrl} from "../utils/Api";
// 发现store
export default class FindStore {
    rootStore;

    @observable findIconList = [];

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.findIconList = [{
            icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/1601203323d8adb1272d26a912f69ed07329db.jpg',
            title: '小学课程'
        },
            {
                icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/1601205c9dfdc997ef605d716ee18e74d26dea.jpg',
                title: '中学课程'
            },
            {
                icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/322342d2a1c7c7367dc3045fd3a3a55c.jpg',
                title: '高中课程'
            },
            {
                icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/83213f68623c715274df1eae4d649ec7.jpg',
                title: '大学课程'
            },
            {
                icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/f21f11c28663d5e9bc23d005fb607a0d.jpg',
                title: '大大学课程'
            }];
        console.log('FindStore-x-x-x--',rootStore);
        // this.getPost();
    }

    @action
    getPost = async () => {
        this.findIconList = [{
            icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/1601203323d8adb1272d26a912f69ed07329db.jpg',
            title: '小学课程'
        },
            {
                icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/1601205c9dfdc997ef605d716ee18e74d26dea.jpg',
                title: '中学课程'
            },
            {
                icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/322342d2a1c7c7367dc3045fd3a3a55c.jpg',
                title: '高中课程'
            },
            {
                icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/83213f68623c715274df1eae4d649ec7.jpg',
                title: '大学课程'
            },
            {
                icon: 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/f21f11c28663d5e9bc23d005fb607a0d.jpg',
                title: '大大学课程'
            }];
        await storage.load({
            key: 'findStore',
            autoSync: true,
            syncInBackground: true,
            syncParams: {
                extraFetchOptions: {
                    // 各种参数
                },
                url:findIcon,
                key:'findStore',
                someFlag: true,
            }
        }).then(ret => {
            this.findIconList = ret;
            console.log('ret--x-x--'+ret);
        }).catch(err => {
            console.warn('_readData11 error =' + err.message);
        })
    }

    // 删
    @action
    delect(name) {
        this.findIconList = this.findIconList.filter(e => e.name !== name);
    }

    @computed get isAllSelected() {
        const allTrue = this.findIconList.every(v => v.isSelected === true);
        if (allTrue) {
            return true;
        }
        return false;
    }

    // 总价格
    @computed get totalMoney() {
        let money = 0;
        this.findIconList.filter(e => e.isSelected === true).forEach(e => {
            money += e.price * e.count;
        });
        return money;
    }
}
