import React, {Component}from 'react'
import {
    StyleSheet,
    View,
    Image,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native'

import Swiper from 'react-native-swiper';

import Size from '../../config/Size';
import Color from '../../config/Color';

const guidepage1 = require('../../assets/base/guidepage1.png')
const guidepage2 = require('../../assets/base/guidepage2.png')
const guidepage3 = require('../../assets/base/guidepage3.png')

export default class GuideComponent extends Component {
    render() {
        return (

            <Swiper style={{backgroundColor: 'white',}} height={Size.screenH} 
                    onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                    dot={<View style={{}} />}
                    activeDot={<View style={{}} />}

                    loop={false}>

                <View style={{flex: 1, justifyContent: 'center'}} >
                    <Image resizeMode='contain' source={guidepage1} style={{width: Size.screenW}} />
                </View>

                <View style={{flex: 1, justifyContent: 'center'}} >
                    <Image resizeMode='contain' source={guidepage2} style={{width: Size.screenW}} />
                </View>

                <View style={{flex: 1, justifyContent: 'center'}}>
                    <View style={{justifyContent: 'center', backgroundColor: 'white',}}>

                        <Image resizeMode='contain' source={guidepage3} style={{width: Size.screenW}}/>
                        <View style={{position: 'absolute', bottom: 32, 
                            width: Size.screenW, alignItems: 'center', }}>

                            <TouchableOpacity style={{width: 120, height: 40, }}
                            onPress={()=>{
                                // 立即体验
                                this.props.navigation.navigate('MyApp');//进入底部导航主页
                                // 设置第一次打开标识
                                storage.save('launchComponent', true);
                            }}>

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                
            </Swiper>
        )
    }
}

GuideComponent.navigationOptions = ({ navigation }) => ({
    header:null
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    guideImage: {
        backgroundColor: 'white',
    },
})
