/*
* @Created by lihoude on 2019-04-01.
* @Desc FastScreen
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
} from 'react-native'
import { Provider } from "mobx-react";
import App from "../../../App";
import store from "../../store/store";

export default class InitScreen extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        return (
            <Provider {...store}>
                <App />
            </Provider>
        )
    }
}

const styles = StyleSheet.create({})