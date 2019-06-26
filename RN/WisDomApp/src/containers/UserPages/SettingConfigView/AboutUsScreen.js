// 关于我们
import React, {Component} from 'react'
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  View,
  Text,
  Image,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';

const arrow_image = require('../../../assets/user/notification_Center/list-more.png')

export default class AboutUsScreen extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
        
    };
  }

  render () {
      return (
          <View style = {styles.constain}>
            <ScrollView style={{}}>
                <View style={styles.border_logo}>
                    <Image style={styles.logo_image}/>
                    <Text style={{color: Color.font_1a, 
                        fontSize: Size.scaleSize(24), 
                        marginTop: Size.scaleSize(30)}}>学无止，智无限</Text>
                </View>

                <View style={styles.border_skip}>
                    <TouchableOpacity style={{flexDirection: 'row', 
                        height: Size.scaleSize(90),
                        alignItems:'center',
                        borderBottomColor: 'rgba(177,177,177,0.3)',
                        borderBottomWidth: 0.5,}}
                        onPress={()=>{
                            this.props.navigation.navigate('RelationUsScreen')
                        }}>
                        <Text style={{color: Color.font_1a, 
                            fontSize: Size.scaleSize(28), 
                            left: 10}}>联系我们</Text>
                        <Image source={arrow_image} style={{position: 'absolute', right: 10,}}/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={{flexDirection: 'row', 
                        height: Size.scaleSize(90),
                        alignItems:'center'}}>
                        <Text style={{color: Color.font_1a, 
                            fontSize: Size.scaleSize(28),
                            left: 10}}>服务使用协议</Text>
                        <Image source={arrow_image} style={{position: 'absolute', right: 10,}}/>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Text style={{color: Color.font_b1, 
                    fontSize: Size.scaleSize(24),
                    textAlign: 'center',
                    width: Size.screenw}}>Copyright2018 智学习.All Right Reserved</Text>
            
          </View>
      )
  }

  update=()=>{
      
  }
}

AboutUsScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '关于我们'
})

const styles = StyleSheet.create({
    constain: {
        height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight,
    },
    border_logo: {
        justifyContent: 'center', 
        alignItems: 'center', 
        marginHorizontal: Size.scaleSize(24), 
        backgroundColor: 'white',
        paddingTop: Size.scaleSize(30),
        paddingBottom: Size.scaleSize(30),
        borderRadius: Size.radius_12,
        marginTop: 10,
        borderColor: 'rgba(177,177,177,0.3)',
        borderWidth: 0.5,
    },
    border_skip: {
        marginHorizontal: Size.scaleSize(24), 
        backgroundColor: 'white',
        borderRadius: Size.radius_12,
        marginTop: 10,
        borderColor: 'rgba(177,177,177,0.3)',
        borderWidth: 0.5,
    },
    logo_image: {
        width: Size.scaleSize(100),
        borderRadius: 10,
        height: Size.scaleSize(100),
        backgroundColor: 'red',
    },
})