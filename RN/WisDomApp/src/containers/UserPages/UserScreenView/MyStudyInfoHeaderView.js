import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    Alert,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';

const bg_image = require('../../../assets/user/credit/background.png')
const circle_image = require('../../../assets/user/home/home-signin-circle.png')

export default class MyStudyInfoHeaderView extends Component {

    constructor(props) {
	    super(props);
	    this.state = {
            count:'9999',
	    };
	}

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground resizeMode='stretch' source={bg_image} style={styles.bg_image}>
                    <TouchableOpacity 
                    onPress={()=>{
                        this.props.skipCreditDetail && this.props.skipCreditDetail()
                    }}>
                        <ImageBackground 
                            source={circle_image}
                            style={{alignItems: 'center', justifyContent: 'center',
                            marginTop: Size.kTopHeight, width: Size.scaleSize(284), 
                            height: Size.scaleSize(284),}}>
                            {/* 学分 */}
                            <Text style={{color: 'white', 
                                // 动态修改数字大小
                                fontSize: Size.scaleSize(124- (this.state.count.length > 2 ? 10*this.state.count.length : 0)),
                                marginBottom: Size.scaleSize(40),
                                }}>{this.state.count}</Text>

                            <Text style={{color: 'white', 
                                fontSize: Size.scaleSize(28), marginTop: Size.scaleSize(10),
                                position: 'absolute', 
                                bottom: Size.scaleSize(57)}}>总学分</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    
                </ImageBackground>
            </View>
            
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        // height: Size.scaleSize(451), 
        alignItems: 'center',
    },
    bg_image: {
        width: Size.screenW+Size.scaleSize(30),
        height: Size.scaleSize(361)+Size.kTopHeight, 
        alignItems: 'center',
        // justifyContent: 'center',
    },
})