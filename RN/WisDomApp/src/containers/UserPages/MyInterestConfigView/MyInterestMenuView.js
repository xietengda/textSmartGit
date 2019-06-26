import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native'

import Size from '../../../config/Size'
import Color from '../../../config/Color'

const icon = require('../../../assets/user/Personal_homepage/myInterest.png')

export default class MyInterestMenuView extends Component {

    renderRow(){
        
          return  this.props.data.map((aItem) => {
                var txt = aItem.title;
                return(
                    <View style={{paddingLeft: Size.scaleSize(20),
                        paddingRight: Size.scaleSize(20), 
                        paddingTop: Size.space_30}}>
                        <TouchableOpacity style={{backgroundColor: Color.font_ff7e00, 
                            height: Size.scaleSize(56),
                            borderRadius: Size.scaleSize(56)/2,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingLeft: 10,
                            paddingRight: 10,}}>
                            <Text style={{color:Color.white, 
                                fontSize: Size.scaleSize(24)}}>{txt}</Text>
                        </TouchableOpacity>
                    </View>
                )
            })

    }

    render() {
        console.log('data====', this.props.data)
        return (
            
            <View style={{flex:1, marginTop:15, 
                paddingBottom: 40, 
                borderBottomColor: '#f0f0f0', 
                borderBottomWidth: 0.5}}>
                <View style={{ height: Size.scaleSize(80), 
                    alignItems: 'center', 
                    flexDirection: 'row', 
                    marginHorizontal: Size.scaleSize(54)}}>

                    <Image resizeMode='contain' source={icon} 
                        style={{width: Size.scaleSize(70), height: Size.scaleSize(70)}}/>

                    <Text style={{color: Color.font_1a, 
                        fontSize: Size.scaleSize(28),
                        left: Size.scaleSize(20)}}>{this.props.title}</Text>
                </View>
                <View style={styles.list}>
                    {this.renderRow()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    list:{
        flex: 1,
        flexDirection: 'row', //这里的属性很重要，可以学习下flex布局
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        backgroundColor: '#FFFFFF',
        marginHorizontal: Size.scaleSize(27),
    },
})