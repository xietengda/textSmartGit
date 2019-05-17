/*
* @Created by liqihui on 2019-05-11.
* @Desc InitStartScreen
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
} from 'react-native';

class InitStartScreen extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

//根据是否保存了userToken，判断跳转哪个界面
    _bootstrapAsync = async () => {
         let res = await storage.loadData('launchComponent');
        const guide = (res === undefined || false) ? true : false;
        this.props.navigation.navigate(guide ? 'GuideComponent' : 'MyTab');
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <Text style={{marginTop:10}}>加载中...</Text>
            </View>
        );
    }
}
export default InitStartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
