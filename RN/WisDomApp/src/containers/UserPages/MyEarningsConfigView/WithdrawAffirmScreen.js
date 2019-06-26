import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';

export default class WithdrawAffirmScreen extends Component {
    constructor (props) {
      super(props)
      // 初始状态
      this.state = {
          name_text:'',
          amount_text:'',
      };
    }
  
    render () {
        return (
            <View style={styles.constain}>
                <View style={{marginHorizontal: Size.scaleSize(24), 
                        marginTop: Size.scaleSize(30), backgroundColor: 'white',
                        borderColor: 'rgba(177,177,177,0.3)', borderWidth: 0.5, 
                        borderRadius: Size.radius_12, paddingBottom: Size.scaleSize(67)}}>

                    <View style={{flexDirection: 'row',
                        alignItems: 'center',
                        height: Size.scaleSize(107),
                        borderBottomColor: 'rgba(177,177,177,0.2)',
                        borderBottomWidth: 0.5,}}>

                        <Text style={{color: Color.font_1a, 
                            fontSize: Size.scaleSize(28),
                            left: Size.scaleSize(45)}}>真实姓名：</Text>

                        <TextInput placeholder=" "
                            // 默认字体颜色
                            placeholderTextColor = {Color.font_b1}
                            // 光标颜色
                            selectionColor={Color.bg_1580e0}
                            // 如果为 true，表示多行输入
                            multiline={true}
                            editable={true}//是否可编辑
                            maxLength={30}//能够输入的最长字符数
                            style={styles.name_input}
                            onChangeText={(name_text) => this.setState({name_text})}
                        />
                    </View>

                    <View style={{height: Size.scaleSize(160), 
                        flexDirection: 'row', alignItems: 'center',
                        borderBottomColor: 'rgba(177,177,177,0.2)',
                        borderBottomWidth: 0.5,}}>
                        <Text style={{color: '#383838', 
                            fontSize: Size.scaleSize(28),
                            left: Size.scaleSize(45)}}>提现金额：</Text>
                        <TextInput placeholder=" "
                            // 默认字体颜色
                            placeholderTextColor = {Color.font_b1}
                            // 光标颜色
                            selectionColor={Color.bg_1580e0}
                            // 如果为 true，表示多行输入
                            multiline={true}
                            editable={true}//是否可编辑
                            maxLength={10}//能够输入的最长字符数
                            style={styles.amount_input}
                            onChangeText={(amount_text) => this.setState({amount_text})}
                        />
                        <TouchableOpacity style={{width: Size.scaleSize(131), 
                            alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{color: Color.bg_1580e0, 
                                fontSize: Size.scaleSize(24),
                                left: Size.scaleSize(45)}}>全部提现</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{alignItems: 'flex-end', 
                        height: Size.scaleSize(85), 
                        justifyContent: 'space-between',
                        marginTop: Size.scaleSize(30),
                        marginHorizontal: Size.scaleSize(20)}}>
                        <Text style={{color: Color.font_b1, 
                            fontSize: Size.scaleSize(28)}}>实际到账：0</Text>
                        <Text style={{color: Color.font_b1, 
                            fontSize: Size.scaleSize(24)}}>可提现 7899989.99，当日最大可提现20000</Text>
                    </View>

                    <TouchableOpacity onPress={()=>{this.withdraw()}} 
                        style={{backgroundColor: Color.bg_1580e0, 
                        marginHorizontal: Size.scaleSize(20), 
                        borderRadius: 5, height: Size.scaleSize(72),
                        alignItems: 'center', justifyContent: 'center',marginTop: Size.scaleSize(36)}}>
                        <Text style={{color: Color.white, 
                            fontSize: Size.scaleSize(32), }}>确认提现</Text>
                    </TouchableOpacity>

                    <View style={{marginHorizontal: Size.scaleSize(20), marginTop: Size.scaleSize(38)}}>
                        <Text style={{color: Color.font_b1, 
                            fontSize: Size.scaleSize(20), lineHeight:18}}>{'提现须知：\n1.收益满2元才能提现，最小提现金额2元，微信官方将收取0.6%的手续费。\n2.微信规定，实名认证用户每日可提现上限为2万元。根据监管要求，未实名认证用户不能进行提现操作。\n3.微信提现将于3个工作日直接转入微信钱包'}</Text>
                    </View>
                </View>
            </View>
        )
    }
    // 提现
    withdraw=()=>{
        this.props.navigation.navigate('WithdrawDetailScreen')
    }
    
  }

  WithdrawAffirmScreen.navigationOptions = ({ navigation }) => ({
      headerTitle: '提现'
  })
  
  const styles = StyleSheet.create({
    constain: {
        backgroundColor: Color.bg_color,
        height: Size.screenH,
    },
    name_input: {
        width: Size.screenW-2*Size.scaleSize(24)-Size.scaleSize(165)-Size.scaleSize(40),
        left: Size.scaleSize(45),
        height: Size.scaleSize(60),
    },
    amount_input: {
        width: Size.screenW-2*Size.scaleSize(24)-Size.scaleSize(165)-Size.scaleSize(30)-Size.scaleSize(131),
        left: Size.scaleSize(45),
        height: Size.scaleSize(60),
    }
  })