import React, {Component} from 'react'
import {
    AppRegistry,
    View,
    Text,
    Picker,
    StyleSheet,
    TouchableHighlight,  
    Animated,  
    Easing,  
    Dimensions,  
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';

const {width, height} = Dimensions.get('window');  

const [aWidth, aHeight] = [width, Size.scaleSize(520)+Size.kBottomAreaHeight]; 

var FirstData = [
    '北京市',
    '广东省',
    '广西省',
    '河南省',
    '河北省',
    '湖南省'
]
var SecondData = [
    '北京市',
    '广东省',
    '广西省',
    '河南省',
    '河北省',
    '湖南省'
]
var ThirdData = [
    '北京市',
    '广东省',
    '广西省',
    '河南省',
    '河北省',
    '湖南省'
]

// 读取本地json文件(城市选择器,后续更新)
// let jsonData = require('./area.json')

export default class AddressPickerView extends Component {

    constructor(props) {
        super(props)

        this.state={

            firstValue:  FirstData[0],
            secondValue: SecondData[0],
            thirdValue:  ThirdData[0],

            offsetY: new Animated.Value(-aHeight),  
            opacity: new Animated.Value(0),  
            choice: this.props.defaultVal ? this.props.defaultVal : FirstData[0]+SecondData[0]+ThirdData[0],  
            hide: true,  
        }
        this.parent ={};  
    }


    updateFirstValue(language) {

        this.setState({
            firstValue: language,

        })
    }
    updateSecondValue(language) {

        this.setState({
            secondValue: language,

        })
    }
    updateThirdValue(language) {

        this.setState({
            thirdValue: language,

        })
    }

    renderPicker(key, i) {

        console.log(key, i)

        return <Picker.Item color={'#3a3a3a'} fontSize={Size.scaleSize(36)} key={i} label={key} value={key} />
    }

    render() {
        if(this.state.hide){  
            return (<View />)  
        } else {
            return (

                <View style={styles.container}>
                    <Animated.View style={[styles.mask, {opacity: this.state.opacity}]} >  
                    </Animated.View> 
    
                    <Animated.View style={[styles.tip , {bottom: this.state.offsetY}]}>
                        <View style={styles.tipTitleView} >  
                            <Text style={styles.cancelText} onPress={this.cancel.bind(this)}>取消</Text>  
                            <Text style={styles.okText} onPress={this.ok.bind(this)} >确定</Text>  
                        </View>  
                        <View style={styles.pickerViewContainer}>
                            <Picker style={styles.pickerStyle}
                                itemStyle={styles.itempicker}  
                                selectedValue={this.state.firstValue}
                                onValueChange={(language) => this.updateFirstValue(language)}>
                                {FirstData.map((key, i) => this.renderPicker(key, i))}
                            </Picker>
                            <Picker style={styles.pickerStyle}
                                itemStyle={styles.itempicker}  
                                selectedValue={this.state.secondValue}
                                onValueChange={(language) => this.updateSecondValue(language)}>
                                {SecondData.map((key, i) => this.renderPicker(key, i))}
                            </Picker>
                            <Picker style={styles.pickerStyle}
                                itemStyle={styles.itempicker}  
                                selectedValue={this.state.thirdValue}
                                onValueChange={(language) => this.updateThirdValue(language)}>
                                {ThirdData.map((key, i) => this.renderPicker(key, i))}
                            </Picker>
                        </View>
                        
                    </Animated.View> 
                </View>
            );
        }
    }
    //显示动画  
    showPickerView() {  
        Animated.parallel([  
            Animated.timing(  
                this.state.opacity,  
                {  
                    easing: Easing.linear,  
                    duration: 300,  
                    toValue: 0.1,  
                }  
            ),  
            Animated.timing(  
                this.state.offsetY,  
                {
                    easing: Easing.linear,  
                    duration: 300,  
                    toValue: 0,  
                }
            )  
        ]).start();   
    }  
  
    //隐藏动画  
    hiddenPickerView(){  
        Animated.parallel([  
            Animated.timing(  
              this.state.opacity,  
              {  
                easing: Easing.linear,  
                duration: 300,  
                toValue: 0,  
              }  
            ),  
            Animated.timing(  
              this.state.offsetY,  
              {  
                easing: Easing.linear,  
                duration: 300,  
                toValue: -aHeight,  
              }  
            )
        ]).start();  
  
        this.timer = setTimeout(  
            () => this.setState({hide: true}),  
            500  
        );  
    }  
  
    //取消  
    cancel() {  
      if(!this.state.hide){  
        this.hiddenPickerView();  
      }  
    }  
  
    //选择  
    ok() {  
        if(!this.state.hide){  
            this.hiddenPickerView();  
            this.props.callback && this.props.callback(this.parent, this.state.firstValue+'-'+this.state.secondValue+'-'+this.state.thirdValue);  
        }
    }  
  
    show(obj) { 
        this.parent = obj;  
        if(this.state.hide){  
            this.setState({ 
                hide: false
            }, this.showPickerView());  
        }  
    }
}

const styles = StyleSheet.create({
    container: {  
        flex: 1, 
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: Size.screenH-Size.kTopHeight,
        width: Size.screenW,
    },  
    mask: {  
      backgroundColor: 'black',  
      opacity: 0.1,  
      position: "absolute",  
      width: Size.screenW,  
      height: Size.screenH-Size.kTopHeight,
    },
    tip: {  
      position:"absolute", 
      backgroundColor: Color.bg_color, 
      width: Size.screenW,  
      height: aHeight,
      bottom: 0,
    }, 
    pickerViewContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    pickerStyle: {
        flex: 1,
    },
    tipTitleView: {  
        backgroundColor: 'white', 
        height: Size.scaleSize(88),  
        width: Size.screenW,  
        flexDirection:'row',  
        alignItems:'center',  
        justifyContent:'space-between',  
        borderBottomWidth:0.5,  
        borderColor: 'rgba(177,177,177,0.4)',  
    },  
    cancelText:{  
        color: Color.font_1a,  
        fontSize: Size.scaleSize(36),  
        paddingLeft: Size.scaleSize(45),  
    },  
    okText:{  
        color: Color.bg_1580e0,  
        fontSize: Size.scaleSize(36),  
        paddingRight: Size.scaleSize(45), 
    }, 
    itempicker:{  
        color: '#3a3a3a',  
        fontSize: Size.scaleSize(36), 
      // height: Size.scaleSize(72),  
    } 
})