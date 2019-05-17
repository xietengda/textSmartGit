import React, { Component } from 'react'
import {
  StyleSheet, Image,
  View,
  Text, TouchableOpacity, TouchableHighlight,
  ScrollView, TextInput, ImageBackground, Modal
} from 'react-native'

//适配
import Size from '../../config/Size';
import Color from '../../config/Color';

//单选按钮
import RadioModal from 'react-native-radio-master';
import {back} from "../../components/ImgIcon";
import ListItemRowComp from "./components/ListItemRowComp";


//图片
const headImg = require('../../assets/classmate/gang.jpg');
const share_image = require('../../assets/user/question/questions-tabbar-share.png')

//点赞
const like = {
  sel: require('../../assets/classmate/home/likes-press.png'),
  nor: require('../../assets/classmate/home/likes-normal.png')
}

//查看更多
const checkMore = require('../../assets/classmate/secondlevel/allreply.png');
//赞赏
const giveMoney = require('../../assets/classmate/home/largess-normal.png');
//付费提问
const quetion = require('../../assets/classmate/secondlevel/bottom-questions.png');
//单选 选中
const radioSel = require('../../assets/classmate/secondlevel/selected.png')



//渲染评论
const renderComment = (ComList) => {
  let renHtml = [];
  for (let x = 0; x < ComList.length; x++) {
    renHtml.push(
      <View style={styles.c_list_v}>
        <View style={styles.c_l_v_L}>
          <Image style={styles.c_l_v_img} source={headImg} />
        </View>
        <View style={styles.c_l_v_r}>
          <View style={styles.c_l_r_til}>
            <Text style={styles.c_l_r_t_name}
              numberOfLines={1}>我的用户名称我的用户名称用户名</Text>
            <Text style={styles.c_l_r_t_post}
              numberOfLines={1}>公司的名称公司的名称公司的名称·产品经理产品经理...</Text>
          </View>
          {/* 评论内容 */}
          <View style={styles.c_l_r_ComCn}>
            <Text style={styles.c_l_r_c_tx}>面试官问题：还有没有投递过其他公司或者是还拿到了哪家公司的OFFER，这是送分还是送机会</Text>

            {/* 时间和点赞 */}
            <View style={styles.c_l_r_time}>
              <View style={styles.c_l_r_t_l}><Text>07-03 12:30</Text></View>
              <View style={styles.c_l_r_t_r}>
                <Image style={styles.c_l_r_t_r_like} source={like.nor} />
                <Text style={styles.c_l_r_t_r_tx}>9999.99万</Text>
              </View>
            </View>
          </View>

          {/* 别人评论该评论内容 */}
          <View style={styles.otherCom}>
            {/* 用户评论 */}
            <View style={styles.o_c_l}>
              <View style={styles.o_c_l_top}>
                <Image style={styles.o_c_l_t1} source={headImg} />
                <Text style={styles.o_c_l_t2}
                  numberOfLines={1}>我的用户名称我的用户名称用户名</Text>
              </View>
              {/* 评论内容 */}
              <View style={styles.o_c_l_middle}>
                <Text style={styles.o_c_l_m_tx}>评论内容评论内容评论内容评论内容评论内容评内</Text>
              </View>
              {/* 时间 */}
              <View style={[styles.c_l_r_time, styles.o_c_l_time]}>
                <View style={styles.c_l_r_t_l}><Text>07-03 12:30</Text></View>
                <View style={styles.c_l_r_t_r}>
                  <Image style={styles.c_l_r_t_r_like} source={like.nor} />
                  <Text style={styles.c_l_r_t_r_tx}>9999.99万</Text>
                </View>
              </View>
            </View>

            {/* 用户回复 */}
            <View style={styles.o_c_l}>
              <View style={styles.o_c_l_top}>
                <Image style={styles.o_c_l_t1} source={headImg} />
                <View style={styles.o_c_l_t2_o} >
                  <View><Text style={styles.o_c_l_t2_1} ellipsizeMode='middle' numberOfLines={1}>史蒂芬狗剩史蒂芬狗剩</Text></View>
                  <Text>@</Text>
                  <View><Text style={styles.o_c_l_t2_1} ellipsizeMode='middle' numberOfLines={1}>切瓦拉格二狗子切瓦拉格二狗子</Text></View>
                </View>
              </View>
              {/* 评论内容 */}
              <View style={styles.o_c_l_middle}>
                <Text style={styles.o_c_l_m_tx}>评论内容评论内容评论内容评论内容评论内容评内</Text>
              </View>
              {/* 时间 */}
              <View style={[styles.c_l_r_time, styles.o_c_l_time]}>
                <View style={styles.c_l_r_t_l}><Text>07-03 12:30</Text></View>
                <View style={styles.c_l_r_t_r}>
                  <Image style={styles.c_l_r_t_r_like} source={like.nor} />
                  <Text style={styles.c_l_r_t_r_tx}>9999.99万</Text>
                </View>
              </View>
            </View>

            {/* 其他用户评论 */}
            <View style={styles.o_c_l}>
              <View style={styles.o_c_l_top}>
                <Image style={styles.o_c_l_t1} source={headImg} />
                <Text style={styles.o_c_l_t2} ellipsizeMode='tail' numberOfLines={1}>我的用户名称我的用户名称用户名</Text>
              </View>
              {/* 评论内容 */}
              <View style={styles.o_c_l_middle}>
                <Text style={styles.o_c_l_m_tx}>评论内容评论内容评论内容评论内容评论内容评内</Text>
              </View>
              {/* 时间 */}
              <View style={[styles.c_l_r_time, styles.o_c_l_time]}>
                <View style={styles.c_l_r_t_l}><Text>07-03 12:30</Text></View>
                <View style={styles.c_l_r_t_r}>
                  <Image style={styles.c_l_r_t_r_like} source={like.nor} />
                  <Text style={styles.c_l_r_t_r_tx}>9999.99万</Text>
                </View>
              </View>
            </View>


            {/* 查看更多评论 */}
            <View style={styles.checkMore}>
              <Text style={styles.checkTx}>查看全部回复</Text>
              <Image style={styles.c_m_Icon} source={checkMore} />
            </View>

          </View>

        </View>
      </View>
    )
  }

  return (
    <View style={styles.comCnView}>
      {renHtml}
    </View>
  );
}

export default class MsgDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      MsgDetail: [{ key: 'a', play: true }],
      comList: [
        { id: 1 }, { id: 2 }, { id: 3 },
      ],
      showQuetion: false,//是否显示付费问答

    };
  }

  //视频播放失败
  videoError = () => {
    console.log('失败')
  }

  //切换显示付费问答
  toggleQuetion = () => {
    let showQ = this.state.showQuetion;
    let temp = true;
    if (showQ) {
      temp = false;
    }
    this.setState({
      showQuetion: temp
    })
  }

  //跳转详情

  skipDetail = () => {
    this.props.navigation.navigate('MsgDetails')
  }


  render() {
    return (
      <View style={styles.container_bg}>
        <View style={styles.container}>
          <ScrollView style={{}}>
            <ListItemRowComp />


          {/* 评论 */}
          <View style={styles.commView}>
            <View style={styles.h_til}>
              <Text style={styles.h_t_l}>全部评论</Text>
              <Text style={styles.h_t_r}>32.13万条</Text>
            </View>

            {/* 评论内容 */}
            {
              renderComment(this.state.comList)
            }

          </View>

          </ScrollView>
        </View>


        {/* 评论框 */}
        <View style={styles.quetionView}>
          <TextInput
            style={styles.q_input}
            placeholder='期待你的真知灼见~'
            placeholderTextColor='#b1b1b1'
            numberOfLines={1} />
          <View style={styles.q_r}>
            <TouchableHighlight>
              <Image style={styles.q_r_g} source={giveMoney} resizeMode='contain' />
            </TouchableHighlight>
            <TouchableHighlight onPress={() => { this.toggleQuetion() }}>
              <Image style={styles.q_r_q} source={quetion} resizeMode='contain' />
            </TouchableHighlight>

          </View>
        </View>

        {/* 付费提问 */}
        {
          this.state.showQuetion && <View style={styles.paidQuetionView}>
            <View style={styles.paidQuetion}>
              <View style={styles.p_q_head}>
                <View style={styles.p_q_h_l}><Text style={styles.p_q_h_tx1}>提问<Text style={styles.p_q_h_tx2}>xxxx</Text>：</Text></View>
                <View style={styles.p_q_h_r}><Text style={styles.p_q_h_tx3}>¥55.00</Text></View>
              </View>
              <TextInput
                style={styles.p_q_input}
                placeholder={'老师说：喜欢提问才是最可爱的人~'}
                placeholderTextColor={'#b1b1b1'}
                underlineColorAndroid={'transparent'}
                multiline={true} numberOfLines={6} />

              <View style={styles.p_q_btm}>
                <Text style={styles.p_q_b_l} onPress={() => { this.toggleQuetion() }}>取消</Text>
                <View style={styles.p_q_b_r}>
                  <View style={styles.p_q_b_r1}>
                    {/* 显示值 value: 'content', */}
                    <RadioModal
                      innerStyle={styles.p_q_b_r1_radio}
                      txtColor={'#000000'}
                      noneColor={'#efefef'}
                      selectedValue={this.state.language}
                      seledImg={radioSel} //被选中图片
                      txtColor={styles.p_q_b_r1_1}  //定义按钮文字样式
                      onValueChange={(id, item) => { console.log('language=' + id + 'item=' + item) }}
                    >
                      <Text value={0}>匿名提问</Text>
                    </RadioModal>
                  </View>
                  <Text style={styles.p_q_b_r2}>提交</Text>
                </View>
              </View>
            </View>
          </View>
        }

      </View>
    )
  }
}

//导航
MsgDetails.navigationOptions = ({ navigation }) => ({
  headerTitle: '动态详情',
  headerBackImage: back, //使用组件
  headerRight:(
      <TouchableOpacity onPress={()=>{

      }}
      style={{alignItems: 'center', justifyContent: 'center',
      width: 55, height: 44, }}>
        <Image source={share_image} style={{ }}/>
      </TouchableOpacity>
  )
})

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
  // 评论



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

  //图片
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
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  //视频
  l_video: {
    width: Size.scaleSize(229),
    height: Size.scaleSize(405),
  },
  l_videoView: {
    width: "100%",
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
