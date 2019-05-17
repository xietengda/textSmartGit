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

const delete_icon = require('../../../assets/user/settings/binding-list-delete.png')

export default class TitleAndInputView extends Component {

    constructor(props) {
	    super(props);
	    this.state = {
            text:''
	    };
	}

    render() {

        return (
            <View style={this.props.style}>
                <View style={styles.container}>
                    <Text style={styles.title}>{this.props.title}</Text>

                    <View style={{flexDirection: 'row', 
                        alignItems: 'center', 
                        left: Size.scaleSize(30), 
                        borderBottomColor: 'rgba(177,177,177,0.5)',
                        borderBottomWidth: 0.5,
                        height: Size.scaleSize(50),
                        width: Size.screenW-2*Size.scaleSize(45)-Size.scaleSize(110)-Size.scaleSize(30),
                        justifyContent: 'space-between',
                        }}>
                        <TextInput 
                            placeholder={this.props.placeholder}
                            placeholderTextColor={Color.font_b1}
                            selectionColor={Color.bg_1580e0}
                            secureTextEntry={this.props.entry}
                            style={styles.inputText}
                            onChangeText={(text) => this.setState({text})}
                        />

                        <TouchableOpacity style={{width: 25, 
                            height: 25, alignItems: 'center', justifyContent: 'center'}}>
                            <Image source={delete_icon}/>
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
        alignItems: 'center',
        marginHorizontal: Size.scaleSize(45),
    },
    title: {
        color: 'black',
        fontSize: Size.scaleSize(28),
    },
    inputText: {
        width: Size.screenW-2*Size.scaleSize(45)-Size.scaleSize(110)-Size.scaleSize(30) - Size.scaleSize(40),
        fontSize: Size.scaleSize(28),
    },
})