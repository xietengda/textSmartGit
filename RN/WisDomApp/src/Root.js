/*
* @Created by liqihui on 2019-05-09.
* @Desc Root
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/
import React from 'react';
import { Provider } from 'mobx-react';
import Router from './Router';
// 获取mobx-store实例
import store from './store';

export default () => (
    <Provider rootStore={store}>
        <Router />
    </Provider>
);
