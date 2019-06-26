import React, {Component} from 'react'

import {
    FlatList,
    ScrollView,
    StyleSheet,
    View,
    Keyboard,
    Animated,
    Easing,
} from 'react-native'

import Size from '../../../config/Size'

import FreezeItemView from '../WalletConfigView/FreezeItemView'
import Color from '../../../config/Color';

import PopupApplyFreezeWin from '../WalletConfigView/PopupApplyFreezeWin'

export default class FreezeAmountScreen extends Component {

    constructor (props) {
        super(props)
        this.state = {
            listArray:[
                "1",
                "2",
                "2",
                "2",
                "2",
                "2",
                "2",
                "2",
                "2",
                "2",
            ],
            showApplyStatus:false,
            // 键盘高度
            keyBoardHeight: 0,
            // 弹窗偏移
            offsetY: new Animated.Value(0),
        }
    }
    componentWillMount() {
        this.keyboard();
    }
    keyboard(){
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    _keyboardDidShow(e) {
        this.setState({
            keyBoardHeight: e.endCoordinates.height
        });
        // this.start();
    }
    _keyboardDidHide() {
        this.setState({
            keyBoardHeight: 0,
        });
        // this.stop();
    }

    _renderItem=({item, index})=>{
        return(
            <FreezeItemView item={item} index={index} 
            applyUnfreeze={()=>{
                this.setState({
                    showApplyStatus: true,
                })
            }}/>
        )
    }

    //显示动画
    start(){
        Animated.timing(
            this.state.offsetY,
            {
                easing: Easing.linear,
                duration: 1000,
                toValue: 1,
            }
        ).start();
    }

    //隐藏动画
    stop(){
        Animated.timing(
            this.state.offsetY,
            {
                easing: Easing.linear,
                duration: 1000,
                toValue: 0,
            }
        ).start();
    }

    render (){
        return (
            <View style={styles.constain}>
                <ScrollView >
                    <FlatList style={{}} data={this.state.listArray}
                        renderItem={this._renderItem}
                        keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
                        listKey={({aItem, aIndex})=>{aItem+aIndex}}
                    />
                </ScrollView>

                {/* 申请解冻弹窗 */}
                { this.state.showApplyStatus && 
                <PopupApplyFreezeWin cancel={()=>{
                    this.setState({
                        showApplyStatus: false,
                    })
                }}
                submit={()=>{
                    this.setState({
                        showApplyStatus: false,
                    })
                }}/>}
            </View>
        )
    }
}

FreezeAmountScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '冻结金额'
})

const styles = StyleSheet.create ({
    constain: {
        height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight,
    },
})