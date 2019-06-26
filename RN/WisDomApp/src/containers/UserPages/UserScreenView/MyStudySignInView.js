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

export default class MyStudySignInView extends Component {
    constructor (props) {
        super(props)
        this.state = {
            menuArray:[
                {grade: '+10', day: '第1天', selected: true},
                {grade: '+20', day: '第2天', selected: false},
                {grade: '+30', day: '第3天', selected: false},
                {grade: '+40', day: '第4天', selected: false},
                {grade: '+50', day: '第5天', selected: false},
                {grade: '+80', day: '第6天', selected: false},
                {grade: '+100', day: '第7天', selected: false},
            ],
        }
    }

    render() {
        return (
            <View style={[styles.container_v, this.props.style]}>

                <View style={[styles.container]}>
                {
                    this.state.menuArray.map((item)=>{
                        return (
                            <TouchableOpacity onPress={() => {this.selected(item)}}
                                style={{width: Size.scaleSize(90), height: Size.scaleSize(90),
                                backgroundColor: item.selected ? Color.bg_1580e0 : Color.font_b1, borderRadius: Size.scaleSize(90)/2, 
                                alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{color: 'white', fontSize: Size.scaleSize(24), marginBottom: 2}}>{item.grade}</Text>
                                <Text style={{color: 'white', fontSize: Size.scaleSize(24)}}>{item.day}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
                </View>
            </View>
        )
    }
    // 选中状态
    selected(item) {
        let selectedPush = [];
        this.state.menuArray.forEach((aItem) => {
            if (item === aItem) {
                // 选中的  置为true
                aItem.selected=true
            }
            selectedPush.push(aItem);
        });
        this.setState({
            menuArray:selectedPush,
        })
    }
}

const styles = StyleSheet.create({
    container_v: {
        backgroundColor: 'white',
        marginHorizontal: Size.scaleSize(24),
        borderColor: 'rgba(177,177,177,0.3)',
        borderWidth: 0.5,
        borderRadius: Size.radius_12,
        height: Size.scaleSize(150),
    },
    container: {
        height: Size.scaleSize(150),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: Size.scaleSize(5),
    },
})