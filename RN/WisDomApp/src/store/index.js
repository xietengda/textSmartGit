/*
* @Created by liqihui on 2019-05-09.
* @Desc Index
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import FindStore from './FindStore';
import ClassmateStore from './ClassmateStore';
import LearnStore from './LearnStore';
import UserStore from './UserStore';

//
import LiveStreamStore from './LiveStreamStore';
import MarkAcivitStore from "./MarkAcivitStore";

/**
 * 根store
 * @class RootStore
 * FindStore 为发现页面的数据
 * ClassmateStore 为同学圈页面数据
 */
class RootStore {
    constructor() {
        this.FindStore = new FindStore(this);
        this.ClassmateStore = new ClassmateStore(this);
        this.LearnStore = new LearnStore(this);
        this.UserStore = new UserStore(this);
        //
        this.LiveStreamStore = new LiveStreamStore(this);
        this.MarkAcivitStore = new MarkAcivitStore(this);
    }
}

// 返回RootStore实例
export default new RootStore();
