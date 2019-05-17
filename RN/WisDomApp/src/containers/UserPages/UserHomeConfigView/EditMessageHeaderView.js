import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color'

const name_edit_icon = require('../../../assets/user/Personal_homepage/name-edit.png')
const header_edit_icon = require('../../../assets/user/Personal_homepage/headportrait-edit.png')

export default class EditMessageHeaderView extends Component {

    constructor (props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        return(
            // View
            <View style={[styles.constain, this.props.style]}>

                <ImageBackground style={{width: Size.scaleSize(128), 
                    height: Size.scaleSize(128), 
                    borderRadius: Size.scaleSize(128)/2,
                    backgroundColor: '#b2b2b2'}}
                >
                    <TouchableOpacity onPress={()=>{
                        this.props.changeHeader && this.props.changeHeader()
                    }} 
                    style={{alignItems: 'center', justifyContent: 'center',
                        position: 'absolute', right: Size.scaleSize(5), top: Size.scaleSize(128)-Size.scaleSize(40),}}
                    >
                        <Image resizeMode='contain' source={header_edit_icon} />
                    </TouchableOpacity>
                </ImageBackground>

                <TouchableOpacity style={{flexDirection: 'row', marginTop: Size.scaleSize(20), }}>
                    <Text style={{color: Color.font_b1, 
                        fontSize: Size.scaleSize(24),}}>智学习</Text>
                    <Image source={name_edit_icon} style={{left: 5}}/>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    
    constain: {
        height: Size.scaleSize(263),
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems:'center',
    },
})