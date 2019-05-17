// 提问我的
import React, {Component} from 'react'
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  
} from 'react-native'

import Size from '../../../config/Size';

import QuestionsWithVoice from '../QuestionsConfigView/QuestionsWithVoice'

export default class QuestionsToMeView extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    // 0 提问我的  1 我提问的  2我偷听的
    this.state = {
        listArray0:[
          {
            status: 0,
            timeStatus: 0,
            answerStatus: 1,
          },
          {
            status: 0,
            answerStatus: 1,
            timeStatus: 0,
          },
          {
            status: 0,
            answerStatus: 0,
            timeStatus: 0,
          },
          {
            status: 0,
            answerStatus: 0,
            timeStatus: 1,
          },
        ],
        listArray1:[
          {
            status: 1,
            answerStatus: 1,
            timeStatus: 0,
          },
          {
            status: 1,
            answerStatus: 0,
            timeStatus: 0,
          },
          {
            status: 1,
            answerStatus: 1,
            timeStatus: 1,
          },
          {
            status: 1,
            answerStatus: 0,
            timeStatus: 0,
            payStatus: 1,// 未付款
          },
        ],
        listArray2:[
          {
            status: 2,
            answerStatus: 1,
          },
          {
            status: 2,
            answerStatus: 1,
          },
          {
            status: 2,
            answerStatus: 1,
          },
          {
            status: 2,
            answerStatus: 1,
          },
        ]
    };
  }

  _renderItem=({item, index})=> {
      return (
        <TouchableOpacity onPress={this.skipDetail}>
          <QuestionsWithVoice item={item} index={index} 
              selectedHeader={()=>{
                  this.props.selectedHeader && this.props.selectedHeader()
              }}
              answer={()=>{
                  this.props.answer && this.props.answer()
              }}
              pay={()=>{
                this.props.pay && this.props.pay();
              }}
              delete={()=>{
                Alert.alert('不耻下问才是好学生~\n确定放弃提问',
                '',
                [
                    {
                        text: '下次再问',
                        // onPress: () => ToastAndroid.show('wait', ToastAndroid.SHORT)
                        // style: 'cancel'
                    },
                    {
                        text: '继续付款',
                        // onPress: () => ToastAndroid.show('Cancel', ToastAndroid.SHORT),
                        // "default" | "cancel" | "destructive"
                        // style: 'cancel'
                    },
                ]);
              }}
          />
        </TouchableOpacity>
      )
  }

  _renderDataSource(status){
    if (status == 0) {
      return this.state.listArray0;
    } else if (status == 1) {
      return this.state.listArray1;
    } else if (status == 2) {
      return this.state.listArray2;
    }
  }

  render () {
      return (
        <FlatList  
            data={this._renderDataSource(this.props.status)}
            renderItem={this._renderItem}
            keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
        /> 
      )
  }

  skipDetail=()=>{
    this.props.navigation.navigate('QuestionsDetailScreen')
  }
}

const styles = StyleSheet.create({
    
})