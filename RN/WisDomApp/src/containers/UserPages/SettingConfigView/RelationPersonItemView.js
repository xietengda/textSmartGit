import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';

const phone_icon = require('../../../assets/user/settings/about-phone.png')

export default class RelationPersonItemView extends Component {

    constructor(props) {
	    super(props);
	    this.state = {
            
	    };
	}

    render() {

        return (
            <View style={{
                paddingTop: 10,}}>
                <View style={{marginHorizontal: Size.scaleSize(24), 
                    borderRadius: Size.radius_12,
                    backgroundColor:'white',
                    paddingTop: 10,
                    paddingBottom: 15,}}>
                    <View style={{flexDirection: 'row', 
                        marginHorizontal: Size.scaleSize(20), 
                        justifyContent: 'space-between',
                        height: Size.scaleSize(90),
                        alignItems: 'center'}}>
                        <View style={{height: Size.scaleSize(80),justifyContent: 'space-between',}}>
                            <Text style={{color: Color.font_1a, fontSize: Size.scaleSize(24)}}>小强</Text>

                            <TouchableOpacity>
                                <Text style={{color: Color.bg_1580e0, fontSize: Size.scaleSize(24)}}>8178-8888</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity>
                            <Image source={phone_icon}/>
                        </TouchableOpacity>
                    </View>

                    <Text style={{marginHorizontal: Size.scaleSize(20), 
                        marginTop: Size.scaleSize(20),
                        color: Color.font_b1,
                        fontSize: Size.scaleSize(24)}}>客服描述客服描述客服描述客服描述客服描述客服描述客服描述客服描述</Text>
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Size.scaleSize(90),
        marginHorizontal: Size.scaleSize(44),
    },
})