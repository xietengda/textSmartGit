import React, { Component } from 'react';  
import {  
  StyleSheet,  
  View,  
  Image,  
  Text,  
  TouchableHighlight,  
  Animated,  
  Easing,  
  Dimensions,  
  Picker,  
  TouchableOpacity,  
} from 'react-native';  

import Size from '../../../config/Size';
import Color from '../../../config/Color';

const {width, height} = Dimensions.get('window');  

const [aWidth, aHeight] = [width, Size.scaleSize(520)+Size.kBottomAreaHeight]; 

export default class ZCustomPickerView extends Component {  

    constructor(props) {  
      super(props);  
      this.state = {  
        offsetY: new Animated.Value(-aHeight),  
        opacity: new Animated.Value(0),  
        choice: this.props.defaultVal ? this.props.defaultVal : this.props.options[0],  
        hide: true,  
      };  
      this.options = this.props.options;  
      this.parent ={};  
    }  
  
    componentWillUnMount(){  
        this.timer && clearTimeout(this.timer);  
    }  
  
    componentDidMount() {  
        
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

                        <Picker  
                            style={styles.picker}  
                            mode={Picker.MODE_DIALOG}  
                            itemStyle={styles.itempicker}  
                            selectedValue={this.state.choice}  
                            onValueChange={choice => this.setState({choice: choice})}>  
                            {this.options.map((aOption) =>  
                                <Picker.Item color={'#3a3a3a'} label={aOption} value={aOption} key={aOption} /> 
                            )}
                        </Picker>
                        
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
            this.props.callback && this.props.callback(this.parent, this.state.choice);  
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
  picker:{  
    justifyContent:'center',
    // height: 216,//Picker 默认高度  
    width: Size.screenW,
    // height: Size.scaleSize(432),
    // backgroundColor: Color.bg_color,
  },  
  itempicker:{  
    color: '#3a3a3a',  
    fontSize: Size.scaleSize(36), 
    // height: Size.scaleSize(72),  
  }  
});  

