import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  SectionList,
  TouchableOpacity,
  Animated,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';

import LargessListHeader from '../UserHomeConfigView/LargessListHeaderView'

import QuestionsStatusHeaderView from '../QuestionsConfigView/QuestionsStatusHeaderView'
import LargessListBottomView from '../UserHomeConfigView/LargessListBottomView'

import LargessListItemView from '../UserHomeConfigView/LargessListItemView'

import PopupWindowOfGift from '../components/PopupWindowOfGift'
import RewardReminderPopup from '../UserHomeConfigView/RewardReminderPopup'

export default class LargessListScreen extends Component {
    constructor (props) {
      super(props)
      // 初始状态
      this.state = {
        listArray:[{ data:[ 
            {title: '1'}, 
            {title: '1'}, 
            {title: '1'}, 
            {title: '1'}, 
            {title: '1'}, 
            {title: '1'}, 
            {title: '1'}, 
            {title: '1'}, 
            {title: '1'}, 
            {title: '1'},] 
        }],
        showReward: false,
      };
      this.giftItem;
    }
  
    _renderItem=(info)=> {
        return (
            <LargessListItemView />
        )
    }

    _listHeaderComponent=()=>{
        return (
            <LargessListHeader largess={()=>{this.showGiftsView()}}/>
        )
    }
    _sectionComp = (info) => {
        return (
            <QuestionsStatusHeaderView keysArray={[{title:'    周榜    '}, {title:'    总榜    '}]} 
                style={{backgroundColor: 'white'}}/>
        )
    }
  
    render () {
        return (
            <View style={{flex: 1}}>
                <View style={styles.constain}>
                    <View style={{height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight-Size.scaleSize(150)}}>
                        <SectionList  
                            sections={this.state.listArray}
                            renderItem={this._renderItem}
                            keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
                            listKey={({aItem, aIndex})=>{aItem+aIndex}}
                            ListHeaderComponent={this._listHeaderComponent}
                            renderSectionHeader={this._sectionComp}
                        /> 
                    </View>
                    <LargessListBottomView style={{position:'absolute', bottom: 0}} reward={()=>{
                        this.upAnimation();
                    }}/>
                    
                </View>

                {/* 礼物弹窗 */}
                <PopupWindowOfGift 
                    ref={(ref= PopupWindowOfGift) => { //方法对引用PopupWindowOfGift元素的ref引用进行操作
                        this.giftView = ref
                    }}
                    closeCallback={(skipStatus)=>{
                        if (skipStatus) {
                            // 跳转我的余额
                            this.props.navigation.navigate('WalletBalance')
                        }
                    }}
                    showTip={(item)=>{
                        this.setState({
                            showReward: true,
                        })
                        this.giftItem=item;
                    }}
                />

                {/* // 余额不足  提示框 */}
                { this.state.showReward && <RewardReminderPopup item = {this.giftItem}
                    cancel={()=>{
                        this.setState({
                            showReward: false,
                        })
                    }}
                    recharge={()=>{
                        // 充值
                        this.setState({
                            showReward: false,
                        })
                        this.downAnimation();
                        this.props.navigation.navigate('WalletBalance')
                    }}
                    reward={()=>{
                        // 打赏
                        this.setState({
                            showReward: false,
                        })
                }}/>}
            </View>
            
        )
    }
    upAnimation(){
        this.giftView.upAnimation();
    }

    downAnimation(){
        this.giftView.downAnimation();
    }
    // 礼物弹窗
    showGiftsView=()=>{
        this.upAnimation();
    }
  }

  LargessListScreen.navigationOptions = ({ navigation }) => ({
      headerTitle: '打赏榜'
  })
  
  const styles = StyleSheet.create({
    constain: {
        height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight,
    },
  })