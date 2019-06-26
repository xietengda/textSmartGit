import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Alert,
} from 'react-native'

import Size from '../../../config/Size';

export default class OrderStatusView extends Component {

    constructor(props) {
	    super(props);
	    this.state = {
            statusArray0:[
                '取消订单',
                '立即付款',
            ],
            statusArray1:[
                '取消订单',
            ],
	    };
    }
    
    _renderItem=({item, index})=> {
        return (
            <TouchableOpacity onPress={()=>{this.selected(item)}} style={[{borderColor: (item=='立即付款')?'rgb(38,116,188)':'rgb(177,177,177)'}, styles.border_bg]}>
                <Text style={[{color:(item=='立即付款')?'rgb(38,116,188)':'rgb(177,177,177)'}, styles.text]}>{item}</Text>
            </TouchableOpacity>
        )
    }

    render() {

        return (
            <View style={[styles.container, this.props.style]}>
                <FlatList 
                    data={ this.props.status == 1 ? this.state.statusArray0 : this.state.statusArray1}
                    renderItem={this._renderItem} 
                    numColumns={4}
                    keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
                    listKey={({aItem, aIndex})=>{aItem+aIndex}}
                />
            </View>
        )
    }
    // 点击订单状态
    selected(item) {
        if (item == '取消订单') {
            this.cancel(item);
        } else if (item == '删除订单') {
            this.delete(item);
        }
    }
    // 取消订单
    cancel(item) {
        Alert.alert('确定取消订单?',
        '',
        [
            {
                text: '取消',
                // onPress: () => ToastAndroid.show('wait', ToastAndroid.SHORT)
                // style: 'cancel'
            },
            {
                text: '确定',
                // onPress: () => ToastAndroid.show('Cancel', ToastAndroid.SHORT),
                // "default" | "cancel" | "destructive"
                // style: 'cancel'
            },
        ]);
    }
    // 删除订单
    delete(item) {
        Alert.alert('确定删除订单?',
        '',
        [
            {
                text: '取消',
                // onPress: () => ToastAndroid.show('wait', ToastAndroid.SHORT)
            },
            {
                text: '删除',
                // onPress: () => ToastAndroid.show('Cancel', ToastAndroid.SHORT),
                style: 'destructive'
            },
        ]);
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: Size.scaleSize(90),
    },
    border_bg: {
        borderWidth: 1, 
        width: Size.scaleSize(148),
        height: Size.scaleSize(50),
        borderRadius: Size.scaleSize(50)/2,
        alignItems:'center', 
        justifyContent:'center',
        // 定位：绝对定位relative，相对定位absolute，固定定位pix
        // position: 'absolute',
        marginLeft: Size.scaleSize(30),
    },
    text: {
        fontSize: Size.scaleSize(28),
    },
})