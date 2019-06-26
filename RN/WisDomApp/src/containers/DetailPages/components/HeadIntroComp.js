/*
* @Created by liqihui on 2019-04-15.
* @Desc HeadIntroComp
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, TouchableOpacity, Image
} from 'react-native'
import model from "../model";
import Size from "../../../config/Size";
import LinearGradient from 'react-native-linear-gradient';
const moreText = require('../../../assets/coursedetails/more.png')

export default class HeadIntroComp extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            text:'毕竟现如今Windows 10的市场份额已经超越Windows 7，成为全球最大的桌面操作系统xxxx。毕竟现如今Windows 10的市场份额已经超越Windows 7，成为全球最大的桌面操作系统xxxx。毕竟现如今Windows 10的市场份额已经超越Windows 7，成为全球最大的桌面操作系统xxxx。毕竟现如今Windows 10的市场份额已经超越Windows 7，成为全球最大的桌面操作系统xxxx。毕竟现如今Windows 10的市场份额已经超越Windows 7，成为全球最大的桌面操作系统xxxx。毕竟现如今Windows 10的市场份额已经超越Windows 7，成为全球最大的桌面操作系统xxxx。毕竟现如今Windows 10的市场份额已经超越Windows 7，成为全球最大的桌面操作系统xxxx。毕竟现如今Windows 10的市场份额已经超越Windows 7，成为全球最大的桌面操作系统xxxx。毕竟现如今Windows 10的市场份额已经超越Windows 7，成为全球最大的桌面操作系统xxxx。毕竟现如今Windows 10的市场份额已经超越Windows 7，成为全球最大的桌面操作系统xxxx。毕竟现如今Windows 10的市场份额已经超越Windows 7，成为全球最大的桌面操作系统xxxx。毕竟现如今Windows 10的市场份额已经超越Windows 7，成为全球最大的桌面操作系统xxxx。毕竟现如今Windows 10的市场份额已经超越Windows 7，成为全球最大的桌面操作系统xxxx。毕竟现如今Windows 10的市场份额已经超越Windows 7，成为全球最大的桌面操作系统xxxx。毕竟现如今Windows 10的市场份额已经超越Windows 7，成为全球最大的桌面操作系统xxxx。毕竟现如今Windows 10的市场份额已经超越Windows 7，成为全球最大的桌面操作系统xxxx。毕竟现如今Windows 10的市场份额已经超越Windows 7，成为全球最大的桌面操作系统xxxx。毕竟现如今Windows 10的市场份额已经超越Windows 7，成为全球最大的桌面操作系统xxxx。毕竟现如今Windows 10的市场份额已经超越Windows 7，成为全球最大的桌面操作系统xxxx。毕竟现如今Windows 10的市场份额已经超越Windows 7，成为全球最大的桌面操作系统xxxx。',
            text1:'毕竟现如今Windows 10的市场份额已经超越Windows 7，成为全球最大的桌面操作系统xxxx。',
            isIntroH: false,//判断简介内容是否超出831
            isClick:false,//判断简介内容是否清除isIntroH的判断
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={ this.state.isIntroH ? styles.bottomIntro_isH : styles.bottomIntro} onLayout={(event)=>{
                if (this.state.isClick){ return; }
                const layout = event.nativeEvent.layout;
                // const scrollHeight = Size.scaleSize(layout.y)+Size.kTopHeight;
                // const layoutH = Size.isIphoneX ? scrollHeight : scrollHeight+Size.kTabBarHeight
                model.scrollDetailH = layout.y-Size.kTopHeight;
                if (layout.height > Size.scaleSize(830)){
                    this.setState({isIntroH:true})
                }
            }}>
                <Text style={[styles.intro,{color:this.state.isIntroH ? '#c1c1c1' : '#000'}]}>{this.state.text}</Text>
                {this.state.isIntroH && <LinearGradient colors={['rgba(255,255,255,0)','rgba(255,255,255,0.6)', 'rgba(255,255,255,0.8)', 'rgba(255,255,255,1)',]} style={styles.floatIntro}>
                    <TouchableOpacity onPress={()=>{
                        this.setState({
                            isIntroH: false,
                            isClick:true,
                        })
                    }}>
                        <Image style={{width:Size.scaleSize(44),height:Size.scaleSize(26)}} source={moreText}></Image>
                    </TouchableOpacity>
                </LinearGradient>}
            </View>

        )
    }
}

const styles = StyleSheet.create({
    bottomIntro_isH: {
        height:Size.scaleSize(830),
        marginTop:Size.space_20,
        paddingHorizontal: Size.scaleSize(44),
        paddingVertical: Size.space_30,
        backgroundColor: '#fff',
    },
    bottomIntro:{
        marginTop:Size.space_20,
        paddingHorizontal:Size.scaleSize(44),
        paddingVertical: Size.space_30,
        backgroundColor: '#fff'
    },

    intro:{
        // color:'#c1c1c1',

        lineHeight: Size.space_40
    },
    // 简介上面的遮盖层
    floatIntro: {
        position:'absolute',
        left:0,
        top:0,
        right:0,
        paddingBottom:Size.space_30,
        height: Size.scaleSize(830),
        justifyContent:'flex-end',
        alignItems:'center'
    },
})
