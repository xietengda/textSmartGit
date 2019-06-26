import React, {Component} from 'react'
import {
    StyleSheet,
    FlatList,
    Text,
    View,
    TouchableOpacity
} from 'react-native'

import Size from '../../../config/Size'
import Color from '../../../config/Color'

import QuestionsNumberView from '../QuestionsConfigView/QuestionsNumberView'

export default class MyStudyDurationView extends Component {
    constructor (props) {
        super(props)
        this.state = {
            listArray:[
                {duration: '3天', title: '连续学习',},
                {duration: '120分钟', title: '学习时长',},
                {duration: '80学分', title: '今日获得',},
            ],
        }
    }

    render() {
        return (
            <View style={[styles.container_v, this.props.style]}>
                {
                    this.state.listArray.map((item)=>{
                        return (
                            <QuestionsNumberView number={item.duration} desc={item.title} 
                                style={{backgroundColor: 'white', 
                                borderWidth: 0.5, 
                                borderColor: 'rgba(177,177,177,0.3)', 
                                borderRadius: Size.radius_12,
                                height: Size.scaleSize(137), 
                                width: (Size.screenW-2*Size.scaleSize(24)-2*Size.scaleSize(14))/3, }}/>
                        )
                    })
                }
            </View>
        )
    }
    // 选中状态
    selected(item) {
        
    }
}

const styles = StyleSheet.create({
    container_v: {
        marginHorizontal: Size.scaleSize(24),
        height: Size.scaleSize(137),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})