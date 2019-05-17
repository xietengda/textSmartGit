import React, { Component } from 'react'
import {
    StyleSheet, Image,
    View,
    Text, TouchableOpacity, TouchableHighlight,
    ScrollView, TextInput, ImageBackground, Modal
} from 'react-native';

import Size from '../../../config/Size';

//图片
const headImg = require('../../../assets/classmate/gang.jpg');
const vPlay = require('../../../assets/classmate/home/play-pause-big.png');
const rPlay = require('../../../assets/classmate/home/audio.png');
//删除按钮
const del = require('../../../assets/classmate/home/edit.png');
const delIcon = require('../../../assets/classmate/home/edit.png');


//视频插件
import Video from 'react-native-video';
//图片插件
import ImageViewer from 'react-native-image-zoom-viewer';

//链接
const link = require('../../../assets/classmate/home/link.png');


export default class IssueMsg extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playVideo: true,//暂停视频
            imgArr: [
                { url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460", },
                { url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460" },
                { url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460" },
                { url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460" },
                { url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460" },
                { url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460", },
            ],
            showPicModel: false,//是否显示全屏预览图片
            previewImg: [],//预览图片，
            previewIndex: 0,//预览图片下标
        }
    }

    //点击播放视频
    playVideo = () => {
        let play = this.state.playVideo;
        let temp = true;

        if (play) {
            temp = false;
        }
        this.setState({
            playVideo: temp,
        })

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
        })
    }

    //渲染图片  isDel是否可以删除
    renderPic = (imgArr, isDel) => {
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
                                    {/* 删除按钮 */}
                                    {
                                        isDel &&
                                        <TouchableHighlight
                                            style={styles.delIcon}
                                            onPress={() => { alert('删除') }}>
                                            <Image style={styles.delIcon} source={delIcon} />
                                        </TouchableHighlight>
                                    }

                                </View>
                                :
                                <View style={styles.p_l}>
                                    <TouchableHighlight onPress={() => { this.checkPic(i) }}>
                                        <Image style={styles.p_l_i} source={{ uri: imgArr[i].url }} resizeMode='center' />
                                    </TouchableHighlight>
                                    {/* 删除按钮 */}
                                    {
                                        isDel &&
                                        <TouchableHighlight
                                            style={styles.delIcon}
                                            onPress={() => { alert('删除') }}>
                                            <Image style={styles.delIcon} source={delIcon} />
                                        </TouchableHighlight>
                                    }

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
                    <View style={styles.p_l}>
                        <TouchableHighlight onPress={() => { this.checkPic(i) }}>
                            <Image style={styles.p_l_i} source={{ uri: imgArr[i].url }} resizeMode='center' />
                        </TouchableHighlight>
                        {/* 删除按钮 */}
                        {
                            isDel &&
                            <TouchableHighlight
                                style={styles.delIcon}
                                onPress={() => { alert('删除') }}>
                                <Image style={styles.delIcon} source={delIcon} />
                            </TouchableHighlight>
                        }

                    </View>
                }
            }
        }

        return html;
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                    <View style={styles.top}>
                        <Text style={styles.t_l}>取消</Text>
                        <Text style={styles.t_r}>发表</Text>
                    </View>

                    {/* 输入区域 */}
                    <View style={styles.iss_input_View}>
                        <TextInput
                            style={styles.iss_input}
                            placeholder={'分享新鲜事情...'}
                            placeholderTextColor={'#b1b1b1'}
                            underlineColorAndroid={'transparent'}
                            multiline={true} numberOfLines={6} />
                    </View>

                    {/* 分享文章  链接视频*/}
                    <View style={styles.s_article}>
                        <View style={styles.s_a_Cn}>
                            <Text style={styles.s_a_c_til} ellipsizeMode='tail' numberOfLines={1}>被分享用户的名称文章原创用户名：</Text>
                            <Text style={styles.s_a_c_tx} ellipsizeMode='tail' numberOfLines={1}>面试官问题：还有没有投递过其他公司或者是还拿到了哪家公司的OFFER，这是送分还是送机会</Text>

                            <View style={styles.l_s_movie}>
                                <View style={styles.l_s_m_L}>
                                    <ImageBackground style={styles.l_s_m_l_img} source={headImg} >
                                        <Image style={styles.l_s_m_l_icon} source={vPlay} />
                                    </ImageBackground>
                                </View>
                                <View style={styles.l_s_m_r_txView} ><Text style={styles.l_s_m_r_tx} ellipsizeMode='tail' numberOfLines={1}>课程的名称课程的名称课程的名课是是程的是是程的是是程的</Text></View>
                            </View>
                        </View>
                    </View>

                    {/* 分享文章  链接 */}
                    <View style={styles.s_article}>
                        <View style={styles.s_a_Cn}>
                            <Text style={styles.s_a_c_til} ellipsizeMode='tail' numberOfLines={1}>被分享用户的名称文章原创用户名：</Text>
                            <Text style={styles.s_a_c_tx} ellipsizeMode='tail' numberOfLines={1}>面试官问题：还有没有投递过其他公司或者是还拿到了哪家公司的OFFER，这是送分还是送机会</Text>

                            {/* 链接 */}
                            <View style={styles.l_s_movie}>
                                <View style={[styles.l_s_m_L, styles.l_s_m_linkView]}>
                                    <Image style={[styles.s_h_per, styles.s_h_link]} resizeMode="cover" source={link} />
                                </View>
                                <View style={styles.l_s_m_r_txView} ><Text style={[styles.l_s_m_r_tx, styles.s_h_r_text]} ellipsizeMode='tail' numberOfLines={1}>店铺名称店铺名称店铺名称店铺名称店铺名</Text></View>
                            </View>

                            {/* 个人店铺 */}
                            <View style={styles.l_s_movie}>
                                <View style={styles.l_s_m_L}>
                                    <Image style={styles.s_h_per} source={headImg} />
                                </View>
                                <View style={styles.l_s_m_r_txView} ><Text style={[styles.l_s_m_r_tx, styles.s_h_r_text]} ellipsizeMode='tail' numberOfLines={1}>店铺名称店铺名称店铺名称店铺名称店铺名</Text></View>
                            </View>
                            {/* 企业店铺 */}
                            <View style={styles.l_s_movie}>
                                <View style={styles.l_s_m_L}>
                                    <Image style={styles.s_h_ent} source={headImg} />
                                </View>
                                <View style={styles.l_s_m_r_txView} ><Text style={[styles.l_s_m_r_tx, styles.s_h_r_text]} ellipsizeMode='tail' numberOfLines={1}>店铺名称店铺名称店铺名称店铺名称店铺名</Text></View>
                            </View>


                        </View>
                    </View>

                    {/* 分享文章 视频 */}
                    <View style={styles.s_article}>
                        <View style={styles.s_a_Cn}>
                            <Text style={styles.s_a_c_til} ellipsizeMode='tail' numberOfLines={1}>被分享用户的名称文章原创用户名：</Text>
                            <Text style={styles.s_a_c_tx} ellipsizeMode='tail' numberOfLines={1}>面试官问题：还有没有投递过其他公司或者是还拿到了哪家公司的OFFER，这是送分还是送机会</Text>

                            {/* 视频 */}
                            <View style={[styles.l_videoView, styles.s_a_video]}>
                                <TouchableHighlight
                                    style={styles.l_video}
                                    onPress={() => { this.playVideo() }}>
                                    <View>
                                        {/* 视频播放器 */}
                                        <Video style={styles.l_video} source={require('../../../assets/classmate/cat.mp4')}
                                            ref={(ref) => {
                                                this.player = ref
                                            }}
                                            paused={this.state.playVideo}  //控制播放器是否暂停。
                                            audioOnly={true}
                                            posterResizeMode='contain' //确定当帧与原始视频尺寸不匹配时如何调整海报图像的大小。
                                            muted={true}   //控制音频是否静音。
                                            onEnd={this.onEnd}                      // 播放完成后的回调
                                            onError={this.videoError}               // 播放失败后的回调
                                            repeat={true}
                                        />
                                        {/* 播放按钮*/}
                                        {
                                            this.state.playVideo &&
                                            <View style={styles.playIconView} >
                                                <Image style={styles.playIcon} source={vPlay} />
                                            </View>
                                        }
                                        {/* 删除按钮 */}
                                        <TouchableHighlight
                                            style={styles.delIcon}
                                            onPress={() => { alert('删除') }}>
                                            <Image style={styles.delIcon} source={delIcon} />
                                        </TouchableHighlight>

                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>

                    {/* 分享文章 录音 */}
                    <View style={styles.s_article}>
                        <View style={styles.s_a_Cn}>
                            <Text style={styles.s_a_c_til} ellipsizeMode='tail' numberOfLines={1}>被分享用户的名称文章原创用户名：</Text>
                            <Text style={styles.s_a_c_tx} ellipsizeMode='tail' numberOfLines={1}>面试官问题：还有没有投递过其他公司或者是还拿到了哪家公司的OFFER，这是送分还是送机会</Text>

                            {/* 录音 */}
                            <TouchableOpacity style={styles.l_record} onPress={() => { console.log('111111') }}>
                                <Image style={styles.l_r_l} source={rPlay} />
                                <Text style={styles.l_r_r}>1'30''</Text>
                            </TouchableOpacity >
                        </View>
                    </View>

                     {/* 分享文章 图片 */}
                     <View style={styles.s_article}>
                        <View style={styles.s_a_Cn}>
                            <Text style={styles.s_a_c_til} ellipsizeMode='tail' numberOfLines={1}>被分享用户的名称文章原创用户名：</Text>
                            <Text style={styles.s_a_c_tx} ellipsizeMode='tail' numberOfLines={1}>面试官问题：还有没有投递过其他公司或者是还拿到了哪家公司的OFFER，这是送分还是送机会</Text>



                            {/* 图片 */}
                            <View style={[styles.picView, styles.share_pic]}>
                                {
                                    this.renderPic(this.state.imgArr)
                                }
                            </View>
                        </View>
                    </View>




                    {/* 分享课程 */}
                    <View style={[styles.l_s_movie, styles.s_courese]}>
                        <View style={styles.l_s_m_L}>
                            <ImageBackground style={styles.l_s_m_l_img} source={headImg} >
                                <Image style={styles.l_s_m_l_icon} source={vPlay} />
                            </ImageBackground>
                        </View>
                        <View style={styles.l_s_m_r_txView} ><Text style={styles.l_s_m_r_tx} ellipsizeMode='tail' numberOfLines={1}>课程的名称课程的名称课程的名课是是程的是是程的是是程的</Text></View>
                        <Image style={styles.s_c_del} source={del} />
                    </View>

                    {/* 视频 */}
                    <View style={styles.l_videoView}>
                        <TouchableHighlight
                            style={styles.l_video}
                            onPress={() => { this.playVideo() }}>
                            <View>
                                {/* 视频播放器 */}
                                <Video style={styles.l_video} source={require('../../../assets/classmate/cat.mp4')}
                                    ref={(ref) => {
                                        this.player = ref
                                    }}
                                    paused={this.state.playVideo}  //控制播放器是否暂停。
                                    audioOnly={true}
                                    posterResizeMode='contain' //确定当帧与原始视频尺寸不匹配时如何调整海报图像的大小。
                                    muted={true}   //控制音频是否静音。
                                    onEnd={this.onEnd}                      // 播放完成后的回调
                                    onError={this.videoError}               // 播放失败后的回调
                                    repeat={true}
                                />
                                {/* 播放按钮*/}
                                {
                                    this.state.playVideo &&
                                    <View style={styles.playIconView} >
                                        <Image style={styles.playIcon} source={vPlay} />
                                    </View>
                                }
                                {/* 删除按钮 */}
                                <TouchableHighlight
                                    style={styles.delIcon}
                                    onPress={() => { alert('删除') }}>
                                    <Image style={styles.delIcon} source={delIcon} />
                                </TouchableHighlight>

                            </View>
                        </TouchableHighlight>
                    </View>

                    {/* 图片 */}
                    <View style={[styles.picView, styles.iss_pic]}>
                        {
                            this.renderPic(this.state.imgArr, true)
                        }
                    </View>


                </ScrollView>


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
                    <ImageViewer imageUrls={this.state.previewImg} index={this.state.previewIndex} />
                </Modal>
            </View>
        )
    }
}

//导航
IssueMsg.navigationOptions = ({ navigation }) => ({
    header: null,
})


const styles = StyleSheet.create({

    //图片
    //分享了里面的图片
    share_pic:{
        marginTop:Size.scaleSize(29)
    },
    //自己选择图片
    iss_pic: {
        width: 'auto',
        marginHorizontal: Size.scaleSize(78)
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
    p_l_r: {
        width: Size.scaleSize(180),
        height: Size.scaleSize(180),
        marginBottom: Size.scaleSize(20),
        marginRight: Size.scaleSize(25),
    },
    picView: {
        borderWidth: 1,
        borderColor: 'red',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    picModel: {
        flex: 1,
    },

    //录音
    l_r_r: {
        color: 'white',
        fontSize: Size.scaleSize(32),
        letterSpacing: Size.scaleSize(1),
    },
    l_r_l: {
        width: Size.scaleSize(34),
        height: Size.scaleSize(46),
    },
    l_record: {
        width: Size.scaleSize(430),
        height: Size.scaleSize(78),
        paddingHorizontal: Size.scaleSize(21),
        backgroundColor: '#1580e0',
        borderRadius: Size.scaleSize(39),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Size.scaleSize(28),
    },

    //店铺链接  此处样式复用了视频链接样式
    s_h_r_text: {
        width: '95%'
    },
    s_h_ent: {
        width: Size.scaleSize(56),
        height: Size.scaleSize(56),
        borderRadius: Size.scaleSize(5),
    },
    s_h_per: {
        width: Size.scaleSize(56),
        height: Size.scaleSize(56),
        borderRadius: 100,
    },
    l_s_m_linkView: {
        width: Size.scaleSize(56),
        height: Size.scaleSize(56),
        backgroundColor: '#1580e0',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    s_h_link: {
        width: Size.scaleSize(42),
        height: Size.scaleSize(42),
    },

    //视频
    delIcon: {
        position: 'absolute',
        zIndex: 4,
        width: Size.scaleSize(32),
        height: Size.scaleSize(32),
        top: 0,
        right: 0,
    },
    l_video: {
        width: Size.scaleSize(229),
        height: Size.scaleSize(405),
        borderColor: 'yellow',
        borderWidth: 1,
    },
    l_videoView: {
        marginLeft: Size.scaleSize(45),
    },
    playIcon: {
        width: Size.scaleSize(101),
        height: Size.scaleSize(101)
    },
    playIconView: {
        position: 'absolute',
        top: 0,
        width: '100%',
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // 分享课程
    s_c_del: {
        width: Size.scaleSize(36),
        height: Size.scaleSize(36),
        position: 'absolute',
        right: Size.scaleSize(34),
        zIndex: 3,
    },
    s_courese: {
        width: 'auto',
        marginHorizontal: Size.scaleSize(23),
        borderColor: '#f5f5f5',
    },
    l_s_m_r_tx: {
        color: '#3a3a3a',
        fontSize: Size.scaleSize(28),
        lineHeight: Size.scaleSize(40),
        width: '68%',
    },
    l_s_m_r_txView: {
        marginLeft: Size.scaleSize(10),
    },
    l_s_m_l_icon: {
        width: Size.scaleSize(30),
        height: Size.scaleSize(30),
    },
    l_s_m_l_img: {
        width: Size.scaleSize(75),
        height: Size.scaleSize(56),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    l_s_m_L: {
        // width: Size.scaleSize(75),
        height: Size.scaleSize(56),
        marginLeft: Size.scaleSize(21),
    },
    l_s_movie: {
        width: '100%',
        height: Size.scaleSize(96),
        backgroundColor: '#f5f5f5',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderColor: '#1a1a1a',
        borderWidth: Size.scaleSize(2),
        borderRadius: Size.scaleSize(10),
        marginTop: Size.scaleSize(29)
    },
    //分享文章
    s_a_c_tx: {
        color: '#1a1a1a',
        fontSize: Size.scaleSize(28),
    },
    s_a_c_til: {
        color: '#1580e0',
        fontSize: Size.scaleSize(28),
    },
    s_a_Cn: {
        marginTop: Size.scaleSize(32),
        marginBottom: Size.scaleSize(32),
        marginHorizontal: Size.scaleSize(32),
    },
    s_a_video: {
        marginLeft: 0,
        marginTop: Size.scaleSize(29)
    },
    s_article: {
        backgroundColor: '#f5f5f5'
    },

    //输入区域
    iss_input: {
        marginTop: Size.scaleSize(35),
        marginBottom: Size.scaleSize(35),
        marginHorizontal: Size.scaleSize(32),
        textAlignVertical: 'top',//设置文本从上到下
    },
    iss_input_View: {
    },


    t_r: {
        position: 'absolute',
        right: Size.scaleSize(33),
        width: Size.scaleSize(128),
        height: Size.scaleSize(58),
        textAlign: 'center',
        backgroundColor: '#1580e0',
        lineHeight: Size.scaleSize(58),
        borderRadius: Size.scaleSize(5),
        color: 'white'
    },
    t_l: {
        position: 'absolute',
        left: Size.scaleSize(40),
        fontSize: Size.scaleSize(28),
        color: '#1a1a1a'
    },
    top: {
        height: Size.scaleSize(84),
        lineHeight: Size.scaleSize(84),
        flexDirection: 'column',
        justifyContent: 'center',
        borderBottomColor: '#efefef',
        borderBottomWidth: Size.scaleSize(2)
    },
    container: {
        flex: 1,
        borderColor: 'red',
        borderWidth: 1,
    }
})
