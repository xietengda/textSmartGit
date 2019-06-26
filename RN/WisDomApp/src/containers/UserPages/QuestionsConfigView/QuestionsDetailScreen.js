import React, {Component} from 'react'

import {
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native'

import Size from '../../../config/Size'

const share_image = require('../../../assets/user/question/questions-tabbar-share.png')

import QuestionsDetailHeaderView from '../QuestionsConfigView/QuestionsDetailHeaderView'
import QuestionsDetailUserView from '../QuestionsConfigView/QuestionsDetailUserView'
import QuestionsDetailBottomView from '../QuestionsConfigView/QuestionsDetailBottomView'

export default class QuestionsDetailScreen extends Component {

    constructor (props) {
        super(props)
        this.state = {
            
        }
    }

    render (){
        
        return (

            <View style={styles.constain}>

                <ScrollView >
                    
                    {/* 问答信息 */}
                    <QuestionsDetailHeaderView />
                    {/* 用户信息 */}
                    <QuestionsDetailUserView style={{marginTop: Size.scaleSize(45)}}/>

                    {/* 答案内容 */}
                    <QuestionsDetailBottomView style={{marginTop: Size.scaleSize(30)}}/>
                </ScrollView>

            </View>
        )
    }
}

QuestionsDetailScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '问答详情',
    headerRight:(
        <TouchableOpacity onPress={()=>shareClick(navigation)}>
            <Image resizeMode='contain' source={share_image} style={styles.share_image}></Image>
        </TouchableOpacity>
    )
})

function shareClick(navigation) {
    Alert.alert('分享按钮')
}

const styles = StyleSheet.create ({
    constain: {
        
        height: Size.screenH-Size.kBottomAreaHeight-Size.kTopHeight,
    },
    share_image: {
        width: Size.scaleSize(45),
        height: Size.scaleSize(45),
        marginRight: Size.space_30,
    },
})