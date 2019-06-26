/*
* @Created by liqihui on 2019-05-05.
* @Desc ListItemRowComp
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, Image, TouchableOpacity, ImageBackground, TouchableHighlight, ScrollView
} from 'react-native'
import Size from "../../../config/Size";
import Color from "../../../config/Color";

//单选按钮
import PictureImgComp from "./PictureImgComp";
import VideoComp from "./VideoComp";
//图片
const headImg = require('../../../assets/classmate/gang.jpg');


const vPlay = require('../../../assets/classmate/home/play-pause-big.png');
const rPlay = require('../../../assets/classmate/home/audio.png');
//评论
const comment = require('../../../assets/classmate/home/comment.png');
//点赞
const like = {
    sel: require('../../../assets/classmate/home/likes-press.png'),
    nor: require('../../../assets/classmate/home/likes-normal.png')
}
//打赏
const goLike = {
    sel: require('../../../assets/classmate/home/largess-press.png'),
    nor: require('../../../assets/classmate/home/largess-normal.png')
}

//链接
const link = require('../../../assets/classmate/home/link.png');

//查看更多
const checkMore = require('../../../assets/classmate/secondlevel/allreply.png');
//赞赏
const giveMoney = require('../../../assets/classmate/home/largess-normal.png');
//付费提问
const quetion = require('../../../assets/classmate/secondlevel/bottom-questions.png');
//单选 选中
const radioSel = require('../../../assets/classmate/secondlevel/selected.png')


export default class ListItemRowComp extends Component {
    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {};

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }
    //跳转详情
    skipDetail = () => {
        this.props.navigation.navigate('MsgDetails')
    }
    /* 发表动态 */
    render() {
        return (
        <View>
            <View style={styles.listView}>
                <View style={styles.List_L}>
                    <Image style={styles.List_L_img} source={headImg} />
                </View>
                <View style={styles.List_R}>
                    {/* 发布人 */}
                    <View style={styles.list_til}>
                        <View><Text style={styles.list_t_name}>小旺仔小旺仔</Text></View>
                        <View><Text style={styles.list_t_com} ellipsizeMode='tail' numberOfLines={1}>公司的名称公司的名称公司的名称·产品经理产品经理产</Text></View>
                        {/* 删除按钮 */}
                        <Text style={styles.list_t_del}>删除</Text>
                    </View>
                    {/* 发布信息 */}
                    <View style={styles.list_Cn}>
                        <Text style={styles.list_Cn_tx} ellipsizeMode='tail' numberOfLines={6}>面试官问题：还有没有投递过其他公司或者是还拿到了哪家公司的面试官问题：还有没有投递过其他公司或者是还拿到了哪家公司的面试官问题：还有没有投递过其他公司或者是还拿到了哪家公司的面试官问题：还有没有投递过其他还有没有投递过其他还有没有投递过其他还有没有
                        </Text>
                        {/* 查看全文按钮 */}
                        <Text onPress={() => { this.skipDetail() }} style={styles.list_Cn_all}>...<Text style={styles.list_cn_btn}>查看全文>>></Text></Text>
                    </View>

                    {/* 视频链接 */}
                    <TouchableOpacity style={styles.l_s_movie}>
                        <View style={styles.l_s_m_L}>
                            <ImageBackground style={styles.l_s_m_l_img} source={headImg} >
                                <Image style={styles.l_s_m_l_icon} source={vPlay} />
                            </ImageBackground>
                        </View>
                        <View style={styles.l_s_m_r_txView} >
                            <Text style={styles.l_s_m_r_tx}
                                  numberOfLines={1}>课程的名称课程的名称课程的名课是是程的是是程的是是程的
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {/* 录音 */}
                    <TouchableOpacity style={styles.l_record} onPress={() => { console.log('111111') }}>
                        <Image style={styles.l_r_l} source={rPlay} />
                        <Text style={styles.l_r_r}>1'30''</Text>
                    </TouchableOpacity >

                    {/* 视频 */}
                    <VideoComp />
                    {/* 图片 */}
                    <PictureImgComp imgArr={this.state.imgArr}/>

                    {/* 店铺链接   */}
                    <View style={styles.storeView}>
                        {/* 链接 */}
                        <TouchableOpacity>
                            <View style={styles.l_s_movie}>
                                <View style={[styles.l_s_m_L, styles.l_s_m_linkView]}>
                                    <Image style={[styles.s_h_per, styles.s_h_link]} source={link} />
                                </View>
                                <View style={styles.l_s_m_r_txView} ><Text style={[styles.l_s_m_r_tx, styles.s_h_r_text]} ellipsizeMode='tail' numberOfLines={1}>店铺名称店铺名称店铺名称店铺名称店铺名</Text></View>
                            </View>
                        </TouchableOpacity>
                        {/* 个人店铺 */}
                        <TouchableOpacity>
                            <View style={styles.l_s_movie}>
                                <View style={styles.l_s_m_L}>
                                    <Image style={styles.s_h_per} source={headImg} />
                                </View>
                                <View style={styles.l_s_m_r_txView} ><Text style={[styles.l_s_m_r_tx, styles.s_h_r_text]} ellipsizeMode='tail' numberOfLines={1}>店铺名称店铺名称店铺名称店铺名称店铺名</Text></View>
                            </View>
                        </TouchableOpacity>
                        {/* 企业店铺 */}
                        <TouchableOpacity>
                            <View style={styles.l_s_movie}>
                                <View style={styles.l_s_m_L}>
                                    <Image style={styles.s_h_ent} source={headImg} />
                                </View>
                                <View style={styles.l_s_m_r_txView} ><Text style={[styles.l_s_m_r_tx, styles.s_h_r_text]} ellipsizeMode='tail' numberOfLines={1}>店铺名称店铺名称店铺名称店铺名称店铺名</Text></View>
                            </View>
                        </TouchableOpacity>
                    </View>


                    {/* 底部发布时间等*/}
                    <View style={styles.l_btm}>
                        <View style={styles.l_b_l}><Text style={styles.l_b_l_tx}>2017-04-12 13:30</Text></View>
                        <View style={styles.l_b_r}>
                            <View style={styles.l_b_rView}>
                                <Image style={styles.l_b_r_c} source={comment} />
                                <Text style={styles.l_b_r_tx}>626</Text>
                            </View>
                            <View style={styles.l_b_rView}>
                                <Image style={styles.l_b_r_l} source={like.sel} />
                                <Text style={styles.l_b_r_tx}>626</Text>
                                <Text style={styles.l_b_r_tx_sel}>626</Text>
                            </View>
                            <View style={styles.l_b_rView}>
                                <Image style={styles.l_b_r_gol} source={goLike.sel} />
                                <Text style={styles.l_b_r_tx}>626</Text>
                                <Text style={styles.l_b_r_tx_sel}>626</Text>
                            </View>
                        </View>
                    </View>


                </View>
            </View>
        </View>
        )
    }
}


const styles = StyleSheet.create({
    //付费问答框
    p_q_b_r2: {
        width: Size.scaleSize(128),
        height: Size.scaleSize(50),
        lineHeight: Size.scaleSize(50),
        fontSize: Size.scaleSize(28),
        color: '#ffffff',
        textAlign: 'center',
        backgroundColor: '#1580e0',
        borderRadius: Size.scaleSize(5)
    },
    p_q_b_r1_1: {
        color: '#b1b1b1',
        fontSize: Size.scaleSize(24)
    },
    p_q_b_r1_radio: {
        width: Size.scaleSize(150),
    },
    p_q_b_r: {
        position: 'absolute',
        right: 0,
        flexDirection: "row",
        justifyContent: 'center',
    },
    p_q_b_l: {
        position: 'absolute',
        left: 0,
        color: '#1a1a1a',
        fontSize: Size.scaleSize(28)
    },
    p_q_btm: {
        height: Size.scaleSize(73),
        lineHeight: Size.scaleSize(73),
        flexDirection: "column",
        justifyContent: 'center',
        marginHorizontal: Size.scaleSize(27),
    },
    p_q_input: {
        marginHorizontal: Size.scaleSize(27),
        height: Size.scaleSize(202),
        paddingTop: Size.scaleSize(23),
        paddingBottom: Size.scaleSize(23),
        paddingLeft: Size.scaleSize(24),
        paddingRight: Size.scaleSize(24),
        backgroundColor: 'white',
        borderRadius: Size.scaleSize(10),
        textAlignVertical: 'top',//设置文本从上到下
    },
    p_q_h_r: {
        position: 'absolute',
        right: 0,
    },
    p_q_h_tx3: {
        color: '#ff7e00',
        fontSize: Size.scaleSize(32),
    },
    p_q_h_tx2: {
        color: '#1580e0'
    },
    p_q_h_tx1: {
        color: '#1a1a1a',
        fontSize: Size.scaleSize(28),
    },
    p_q_h_l: {
        position: 'absolute',
        left: 0,
    },
    p_q_head: {
        height: Size.scaleSize(70),
        lineHeight: Size.scaleSize(70),
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Size.scaleSize(27),
    },
    paidQuetion: {
        position: 'absolute',
        width: '100%',
        height: Size.scaleSize(345),
        top: 0,
        zIndex: 3,
        // borderColor: 'red',
        // borderWidth: 1,
        backgroundColor: '#f5f5f5',
    },
    paidQuetionView: {
        position: 'absolute',
        width: '100%',
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },


    //顶部评论框
    q_r_q: {
        width: Size.scaleSize(40),
        height: Size.scaleSize(48),
        marginLeft: Size.scaleSize(30)
    },
    q_r_g: {
        width: Size.scaleSize(36),
        height: Size.scaleSize(48),
        marginLeft: Size.scaleSize(30)
    },
    q_r: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    q_input: {
        width: Size.scaleSize(557),
        height: Size.scaleSize(58),
        lineHeight: Size.scaleSize(58),
        backgroundColor: '#f5f5f5',
        borderRadius: Size.scaleSize(29),
        padding: 0,
        paddingLeft: Size.scaleSize(31),
        fontSize: Size.scaleSize(24),
        color: '#666',
        marginLeft: Size.scaleSize(30)
    },
    quetionView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: Size.scaleSize(98),
        // backgroundColor: 'red',
        borderTopColor: 'rgba(177,177,177,0.4)',
        borderTopWidth: 0.5,
    },

    //评论
    c_m_Icon: {
        width: Size.scaleSize(20),
        height: Size.scaleSize(19),
        marginLeft: Size.scaleSize(9)
    },
    checkTx: {
        color: '#137cdf',
        fontSize: Size.scaleSize(24),
        opacity: 0.5,
    },
    checkMore: {
        height: Size.scaleSize(70),
        lineHeight: Size.scaleSize(70),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    o_c_l_time: {
        marginHorizontal: Size.scaleSize(20)
    },
    o_c_l_m_tx: {
        color: '#1a1a1a',
        fontSize: Size.scaleSize(24),
        marginHorizontal: Size.scaleSize(19),
    },
    o_c_l_middle: {
        marginTop: Size.scaleSize(10),
        marginBottom: Size.scaleSize(20),
    },
    o_c_l_t2_1: {
        width: Size.scaleSize(210),
    },
    o_c_l_t2_o: {
        width: '80%',
        marginLeft: Size.scaleSize(20),
        flexDirection: 'row',
    },
    o_c_l_t2: {
        width: '80%',
        marginLeft: Size.scaleSize(20),
    },
    o_c_l_t1: {
        width: Size.scaleSize(50),
        height: Size.scaleSize(50),
        borderRadius: Size.scaleSize(50)/2,
        marginLeft: Size.scaleSize(20),
    },
    o_c_l_top: {
        height: Size.scaleSize(90),
        lineHeight: Size.scaleSize(90),
        flexDirection: 'row',
        alignItems: 'center',
    },
    o_c_l: {
        borderBottomColor: "#e9e9e9",
        borderBottomWidth: Size.scaleSize(2),
        paddingBottom: Size.scaleSize(15)
    },
    otherCom: {
        backgroundColor: '#f5f5f5',
    },
    c_l_r_t_r_tx: {
        color: '#b1b1b1',
        fontSize: Size.scaleSize(24),
        lineHeight: Size.scaleSize(27),
        marginLeft: Size.scaleSize(19),
    },
    c_l_r_t_r_like: {
        width: Size.scaleSize(32),
        height: Size.scaleSize(33),
        marginTop: Size.scaleSize(-10)
    },
    c_l_r_t_r: {
        position: 'absolute',
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    c_l_r_t_l: {
        position: 'absolute',
        left: 0,
    },
    c_l_r_time: {
        height: Size.scaleSize(60),
        lineHeight: Size.scaleSize(60),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Size.scaleSize(10)
    },
    c_l_r_c_tx: {
        color: '#1a1a1a',
        fontSize: Size.scaleSize(28),
    },
    c_l_r_ComCn: {
        marginTop: Size.scaleSize(30),
        marginBottom: Size.scaleSize(30),
    },
    c_l_r_t_post: {
        color: '#b1b1b1',
        fontSize: Size.scaleSize(24),
        marginTop: Size.scaleSize(20)
    },
    c_l_r_t_name: {
        color: '#1a1a1a',
        fontSize: Size.scaleSize(28),
        lineHeight: Size.scaleSize(40),
    },
    c_l_r_til: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    c_l_v_r: {
        width: '78%',
        marginLeft: Size.scaleSize(19),
    },
    c_l_v_img: {
        width: Size.scaleSize(90),
        height: Size.scaleSize(90),
        borderRadius: Size.scaleSize(90)/2,
        backgroundColor: 'black',
    },
    c_l_v_L: {
        width: Size.scaleSize(90),
        marginLeft: Size.scaleSize(24),
    },
    c_list_v: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: Size.scaleSize(40)
    },
    comCnView: {
        width: '100%',
    },
    h_t_r: {
        position: 'absolute',
        right: Size.scaleSize(23),
        color: "#b0b0b0",
        fontSize: Size.scaleSize(24),
    },
    h_t_l: {
        position: 'absolute',
        left: Size.scaleSize(32),
        color: "#1a1a1a",
        fontSize: Size.scaleSize(34),
    },
    h_til: {
        height: Size.scaleSize(80),
        lineHeight: Size.scaleSize(80),
        marginTop: Size.scaleSize(20),
        flexDirection: 'row',
        alignItems: 'center',
    },
    commView: {
        borderTopColor: 'rgba(177,177,177,0.4)',
        borderTopWidth: 0.5,
        marginTop: Size.scaleSize(20),
        // borderWidth: 1,
        // paddingBottom:Size.scaleSize(160)
    },
    // 列表
    //底部时间。点赞
    l_b_r_tx_sel: {
        color: '#1580e0',
        fontSize: Size.scaleSize(24),
        marginLeft: Size.scaleSize(9),
    },
    l_b_r_tx: {
        color: '#b1b1b1',
        fontSize: Size.scaleSize(24),
        marginLeft: Size.scaleSize(9),
    },
    l_b_r_gol: {
        width: Size.scaleSize(25),
        height: Size.scaleSize(31),
    },
    l_b_r_l: {
        width: Size.scaleSize(31),
        height: Size.scaleSize(32),
    },
    l_b_r_c: {
        width: Size.scaleSize(31),
        height: Size.scaleSize(29),
    },
    l_b_rView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: Size.scaleSize(25),
    },
    l_b_r: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    l_b_l_tx: {
        color: '#b1b1b1',
        fontSize: Size.scaleSize(24),
        lineHeight: Size.scaleSize(80),
    },
    l_b_l: {
        position: 'absolute',
        left: 0,
    },
    l_btm: {
        width: '100%',
        height: Size.scaleSize(80),
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
        alignItems: 'center'
    },
    // 跳转播放
    l_s_m_r_tx: {
        color: '#3a3a3a',
        fontSize: Size.scaleSize(24),
        lineHeight: Size.scaleSize(28),
        width: '75%',
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
        borderRadius: Size.radius_12,
    },
    list_cn_btn: {
        color: '#1580e0'
    },
    list_Cn_all: {
        position: 'absolute',
        width: Size.scaleSize(195),
        right: 0,
        bottom: Size.scaleSize(32),
        backgroundColor: 'white',
        lineHeight: Size.scaleSize(36),
        fontSize: Size.scaleSize(28),
        color: '#1a1a1a'
    },
    list_Cn_tx: {
        paddingTop: Size.scaleSize(30),
        paddingBottom: Size.scaleSize(27),
        fontSize: Size.scaleSize(28),
        color: Color.font_1a,
        lineHeight: Size.scaleSize(36),
    },

    list_Cn: {
        // borderColor: 'red',
        // borderWidth: 1,
        marginRight: 2,
        // backgroundColor: 'red',
    },
    list_t_com: {
        lineHeight: Size.scaleSize(35),
        fontSize: Size.scaleSize(24),
        color: '#b1b1b1',
        width: '80%'
    },
    list_t_name: {
        lineHeight: Size.scaleSize(40),
        fontSize: Size.scaleSize(28),
        color: '#1a1a1a',
    },
    list_t_del: {
        position: 'absolute',
        right: Size.scaleSize(24),
        fontSize: Size.scaleSize(24),
        color: '#b1b1b1',
        lineHeight: Size.scaleSize(80),
    },
    list_til: {
        height: Size.scaleSize(90),
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    List_R: {
        width: '80%',
        marginLeft: Size.scaleSize(20),
        // borderColor: 'red',
        // borderWidth: 1,
    },
    List_L_img: {
        width: Size.scaleSize(90),
        height: Size.scaleSize(90),
        borderRadius: Size.scaleSize(90)/2,
        backgroundColor: 'black',
    },
    List_L: {
        width: '12%',
        marginLeft: Size.scaleSize(24),
        // backgroundColor: 'red',
    },
    listView: {
        width: "100%",
        flex: 1,
        backgroundColor: 'white',
        marginBottom: Size.scaleSize(20),
        paddingTop: Size.scaleSize(30),
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    listCn: {
        width: Size.screenW,
        backgroundColor: '#f5f5f5',
    },
    // 列表
    container_bg: {
        flex: 1,
        backgroundColor: 'white',
    },
    // 列表
    container: {
        width: Size.screenW,
        height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight-Size.scaleSize(98),
        backgroundColor: 'white',
    }
})
