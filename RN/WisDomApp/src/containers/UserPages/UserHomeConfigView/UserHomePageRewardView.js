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

const normal_headerIcon = require('../../../assets/user/Personal_homepage/normalheadportrait.png')
const largess_icon = require('../../../assets/user/Personal_homepage/largess.png')
const ranking_icon = require('../../../assets/user/Personal_homepage/ranking.png')

const arrow_image = require('../../../assets/user/notification_Center/list-more.png')

export default class UserHomePageRewardView extends Component {

    constructor(props) {
	    super(props);
	    this.state = {
            
	    };
	}

    render() {

        return (
            <View style={[styles.container, this.props.style]}>
                <TouchableOpacity style={{flexDirection: 'row', 
                    alignItems: 'center', 
                    width: Size.screenW-2*Size.scaleSize(24)-Size.scaleSize(105),
                    justifyContent: 'space-between',
                    borderRightColor: 'rgb(177,177,177)',
                    borderRightWidth: 1}}
                    onPress={()=>{
                        this.props.largessClick && this.props.largessClick()
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center', left: Size.scaleSize(22)}}>
                        <Image source={ranking_icon}/>
                        <Text style={{left: Size.scaleSize(30), 
                            color: Color.font_1a, 
                            fontSize: Size.scaleSize(28)}}>打赏榜</Text>
                    </View>
                    <View style={{flexDirection: 'row', 
                        alignItems: 'center', 
                        right: 10, }}>
                        <View style={{flexDirection: 'row', 
                            alignItems: 'center', 
                            right: 5, 
                            width: Size.scaleSize(160), 
                            justifyContent: 'space-around'}}>
                            <Image source={normal_headerIcon}/>
                            <Image source={normal_headerIcon}/>
                            <Image source={normal_headerIcon}/>
                        </View>
                        <Image source={arrow_image}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{width: Size.scaleSize(100), 
                    height: Size.scaleSize(109), 
                    alignItems: 'center', 
                    justifyContent: 'center'}}>
                    <Image source={largess_icon}/>
                </TouchableOpacity>
            </View>
            
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        backgroundColor: 'white',
        flexDirection:'row', 
        height: Size.scaleSize(109), 
        alignItems: 'center',
        marginHorizontal: Size.scaleSize(24),
        borderColor: 'rgba(177,177,177,0.4)',
        borderWidth: 0.5,
        borderRadius: Size.radius_12,
        marginTop: 10,
    },
    
})