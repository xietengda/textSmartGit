/*
* @Created by liqihui on 2019-05-05.
* @Desc PictureImgComp
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, TouchableHighlight, Image, Modal, ScrollView
} from 'react-native'
import Size from "../../../config/Size";
//图片插件
import ImageViewer from 'react-native-image-zoom-viewer';

export default class PictureImgComp extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            previewImg: [],//预览图片，
            previewIndex: 0,//预览图片下标
            showPicModel: false,//是否显示全屏预览图片
            playVideo: true,//暂停视频
            imgArr: [
                { url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460", },
                { url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460" },
                { url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460" },
                { url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460" },
                { url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460" },
                { url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460", },
                { url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460" },
                { url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460" },
                { url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460" },
                { url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460" },
                { url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460", },
                { url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460" },
                { url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460" },
                { url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460" },
                { url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460" },
            ],
        };
    }

    //点击查看图片 index=点击图片下标
    checkPic = (index) => {
        let imgArr = this.state.imgArr;
        let imgIndex = index;
        //显示全屏查看图片
        this.setState({
            showPicModel: true,
            previewImg: imgArr,
            previewIndex: imgIndex
        },()=>{
            // this.props.backItem && this.props.backItem(imgArr,imgIndex);
        })
    }
    //渲染图片
    renderPic = (imgArr) => {
        let html = [];
        for (let i = 0; i < imgArr.length; i++) {
            let temp = parseInt(i) + 1;
            console.log(temp % 3 == 0)
            //只显示9张
            if (i < 8) {
                html.push(
                    <View>
                        {
                            temp % 3 != 0 ?
                                <View style={styles.p_l_r}>
                                    <TouchableHighlight onPress={() => { this.checkPic(i) }}>
                                        <Image style={styles.p_l_i} source={{ uri: imgArr[i].url }} resizeMode='center' />
                                    </TouchableHighlight>
                                </View>
                                :
                                <View style={styles.p_l}>
                                    <TouchableHighlight onPress={() => { this.checkPic(i) }}>
                                        <Image style={styles.p_l_i} source={{ uri: imgArr[i].url }} resizeMode='center' />
                                    </TouchableHighlight>
                                </View>
                        }
                    </View>
                )
            } else if (i == 8) {
                //判断是否超过9张
                if (imgArr.length > 9) {
                    html.push(
                        <TouchableHighlight onPress={() => { this.checkPic(i) }}>
                            <View style={styles.p_l}>
                                <Image style={styles.p_l_i} source={{ uri: imgArr[i].url }} resizeMode='center' />
                                <View style={styles.p_l_i_zc}><Text style={styles.p_l_i_zc_tx}>+{imgArr.length - 9}</Text></View>
                            </View>
                        </TouchableHighlight>
                    )
                } else {
                    <TouchableHighlight onPress={() => { this.checkPic(i) }}>
                        <View style={styles.p_l}>
                            <Image style={styles.p_l_i} source={{ uri: imgArr[i].url }} resizeMode='center' />
                        </View>
                    </TouchableHighlight>
                }
            }
        }

        return html;
    }

    render() {
        return(
            <View style={{flex:1}}>
                <View style={[styles.picView]}>
                    { this.renderPic(this.state.imgArr) }
                </View>
                {/* 全屏查看图片弹窗 */}
                <Modal
                    style={styles.picModel}
                    animationType="slide"
                    visible={this.state.showPicModel}
                    onRequestClose={() => {
                        this.setState({ showPicModel: false })
                    }}
                    transparent={false}
                >
                    <ImageViewer
                        imageUrls={this.state.previewImg}
                        onClick={()=>{
                            this.setState({ showPicModel: false })
                        }}
                        index={this.state.previewIndex} />
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    picModel: {
        flex: 1,
    },
    picView: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    //图片
    p_l_r: {
        width: Size.scaleSize(180),
        height: Size.scaleSize(180),
        marginBottom: Size.scaleSize(20),
        marginRight: Size.scaleSize(25),
    },
    p_l_i_zc_tx: {
        textAlign: 'center',
        color: '#fefefe',
        lineHeight: Size.scaleSize(180),
        fontSize: Size.scaleSize(36),
    },
    p_l_i_zc: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    p_l_i: {
        width: Size.scaleSize(180),
        height: Size.scaleSize(180),
    },
    p_l: {
        width: Size.scaleSize(180),
        height: Size.scaleSize(180),
        marginBottom: Size.scaleSize(20),
    },
})
