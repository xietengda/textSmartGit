import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';

export default class VoiceTimerShaftView extends Component {

    constructor(props) {
	    super(props);
	    this.state = {
            startTime:'',
            endTime:'',
	    };
	}

    render() {

        return (
            <View style={[styles.container, this.props.style]}>
                <Text style={{color: Color.font_1a, 
                    fontSize: Size.scaleSize(24)}}>
                {parseInt(this.props.voiceTime/60)+':'+(this.props.voiceTime%60 > 9 ? this.props.voiceTime%60 : '0'+this.props.voiceTime%60)}
                </Text>

                <View style={styles.bg_line}>
                
                    {/* 实际语音录制时间 */}
                    <View style={{
                        backgroundColor: Color.bg_1580e0,
                        height: 1,
                        width: this.props.voiceTime/(5*60)*(Size.screenW-2*Size.scaleSize(150)),
                    }}>

                    </View>

                    <View style={{
                        backgroundColor: Color.bg_1580e0,
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                    }}>
                        
                    </View>

                </View>

                <Text style={{color: Color.font_1a, 
                    fontSize: Size.scaleSize(24)}}>5:00</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bg_line: {
        backgroundColor: 'rgba(240,240,240,1)', 
        height: 1,  
        width: Size.screenW-2*Size.scaleSize(150),
        flexDirection: 'row',
        alignItems: 'center',
    }
})