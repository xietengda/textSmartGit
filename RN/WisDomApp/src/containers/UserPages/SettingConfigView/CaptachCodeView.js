import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';

export default class CaptachCodeView extends Component {

    constructor(props) {
	    super(props);
	    this.state = {
            code:''
	    };
	}

    render() {

        return (
            <View style={this.props.style}>
                <View style={styles.container}>
                    <Text style={styles.title}>验证码</Text>

                    <View style={{flexDirection: 'row', 
                        alignItems: 'flex-end', 
                        left: Size.scaleSize(30), 
                        height: Size.scaleSize(50),
                        width: Size.screenW-2*Size.scaleSize(45)-Size.scaleSize(82)-Size.scaleSize(30),
                        justifyContent: 'space-between',
                        }}>

                        <View style={{
                            borderBottomColor: 'rgba(177,177,177,0.5)',
                            borderBottomWidth: 0.5,}}>
                            <TextInput 
                                placeholder={this.props.placeholder}
                                placeholderTextColor={Color.font_b1}
                                selectionColor={Color.bg_1580e0}
                                style={styles.inputText}
                                onChangeText={(code) => this.setState({code})}
                            />
                        </View>

                        <TouchableOpacity style={{width: Size.scaleSize(160), 
                            height: Size.scaleSize(54), 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            borderRadius: 2.5, 
                            backgroundColor: Color.font_ff7e00}}>
                            <Text style={{color: 'white', fontSize: Size.scaleSize(24)}}>获取验证码</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flexDirection:'row', 
        height: Size.scaleSize(90), 
        alignItems: 'flex-end',
        marginHorizontal: Size.scaleSize(45),
    },
    title: {
        color: 'black',
        fontSize: Size.scaleSize(28),
    },
    inputText: {
        width: Size.screenW-2*Size.scaleSize(45)-Size.scaleSize(82)-Size.scaleSize(60)-Size.scaleSize(160),
        fontSize: Size.scaleSize(28),
    },
})