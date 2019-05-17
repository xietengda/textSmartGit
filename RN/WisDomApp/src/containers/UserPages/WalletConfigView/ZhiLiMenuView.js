import React, {Component} from 'react'
import {
    StyleSheet,
    FlatList,
    Text,
    View,
    TouchableOpacity
} from 'react-native'

import Size from '../../../config/Size'

import RechargeItemView from '../../UserPages/WalletConfigView/RechargeItemView'

export default class ZhiLiMenuView extends Component {
    constructor (props) {
        super(props)
        this.state = {
            menuArray:[
                {title: '6智力', money: '6元', selected: true},
                {title: '18智力', money: '18元', selected: false},
                {title: '68智力', money: '68元', selected: false},
                {title: '88智力', money: '88元', selected: false},
                {title: '108智力', money: '108元', selected: false},
                {title: '138智力', money: '138元', selected: false},
                {title: '388智力', money: '388元', selected: false},
                {title: '888智力', money: '888元', selected: false},
            ],
            money: '￥6.00',
        }
    }

    _renderItem=({item, index})=>{
        return (
            <TouchableOpacity onPress={() => {this.selected(item)}}>
                <RechargeItemView menuItem={item}/>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={this.props.style}>
                <Text style={styles.title}>充智力</Text>
                <View style={styles.menuList}>
                    <FlatList data={this.state.menuArray}
                        renderItem={this._renderItem}
                        // horizontal={true}
                        numColumns={4}
                        keyExtractor={({aItem, aIndex})=>{aIndex+aItem}}
                    />
                </View>
                <Text style={styles.money}>支付金额：{this.state.money}</Text>
            </View>
        )
    }
    // 选中状态
    selected(item) {
        let stylePush = [];
        this.state.menuArray.forEach((aItem) => {
            // 先全部置为false
            aItem.selected=false
            if (item === aItem) {
                // 选中的  置为true
                aItem.selected=true
            }
            stylePush.push(aItem);
        });
        this.setState({
            menuArray:stylePush,
            money: item.money,
        })
    }
}

const styles = StyleSheet.create({
    container: {
        
    },
    menuList: {
        left: Size.scaleSize(24),
        width: Size.screenW - 2*Size.scaleSize(24),
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    title: {
        color: 'rgb(177,177,177)',
        fontSize: Size.scaleSize(28),
        left: Size.scaleSize(44),
        marginTop: Size.scaleSize(30),
    },
    money: {
        color: 'rgb(26,26,26)',
        fontSize: Size.scaleSize(24),
        left: Size.scaleSize(44),
        marginTop: Size.scaleSize(30),
    },
})