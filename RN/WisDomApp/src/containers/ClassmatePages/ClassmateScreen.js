/*
* @Author: liqihui
* @Date:  2018/12/19 1:21 PM
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/
import React, { Component } from 'react'
import {
  StyleSheet, Image,
  View,
  Text, TouchableOpacity, TouchableHighlight,
  ScrollView, FlatList, ImageBackground, Modal
} from 'react-native'

//适配
import Size from '../../config/Size';


//图片插件
import ImageViewer from 'react-native-image-zoom-viewer';


//选择图片
import ImagePicker from 'react-native-image-crop-picker';
import HeadBannerImg from "./components/HeadBannerImg";
import ListItemRowComp from "./components/ListItemRowComp";

//图片
const headImg = require('../../assets/classmate/gang.jpg');
const bgi = require('../../assets/classmate/home/background.png');
const videoPlay = require('../../assets/classmate/home/play-pause-big.png');
// const rPlay = require('../../assets/base/v_play.png');
//发布按钮classMate
const issue = require('../../assets/classmate/home/edit.png');
//评论
const comment = require('../../assets/classmate/home/comment.png');
//播放语音按钮
const pMusic = require('../../assets/classmate/home/audio.png');
//点赞
const like = {
  sel: require('../../assets/classmate/home/likes-press.png'),
  nor: require('../../assets/classmate/home/likes-normal.png')
}
//打赏
const goLike = {
  sel: require('../../assets/classmate/home/largess-press.png'),
  nor: require('../../assets/classmate/home/largess-normal.png')
}

//链接
const link = require('../../assets/classmate/home/link.png');

//选择图片
const selPhoto = require('../../assets/classmate/secondlevel/edit-popup-albums.png');
//选择课程
const selCourse = require('../../assets/classmate/secondlevel/edit-popup-course.png');
//选择拍照
const takePhoto = require('../../assets/classmate/secondlevel/edit-popup-Photograph.png');
//选择录音
const selRecord = require('../../assets/classmate/secondlevel/edit-popup-sound.png');
//选择文字
const selText = require('../../assets/classmate/secondlevel/edit-popup-words.png');


export default class ClassmateScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listArr: [
        { key: 'a', play: true, mp3: require('../../assets/classmate/hhha.mp3') },
        { key: 'b', play: true, mp3: require('../../assets/classmate/hhha.mp3') }
      ],
      imgArr: [
        { url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460", },
        { url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460" },
        { url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460" },
        { url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460" },
        { url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460" },
        { url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460" },
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
      showPicModel: false,//是否显示全屏预览图片
      previewImg: [],//预览图片，
      previewIndex: 0,//预览图片下标
      selIssType: false,//显示发布类型框
    };
  }

  //点击发布信息
  issueMsgFun = () => {
    var temp = true;
    if (this.state.selIssType) {
      temp = false;
    }
    this.setState({
      selIssType: temp
    })
  }

  //视频播放失败
  videoError = () => {
    console.log('失败')
  }

  //视频播放完成
  onEnd = () => {
    console.log('播放完')
  }

  componentDidMount() {
    this.props.navigation.setParams({
      title:'',
      opacity:0,
      isShowAbs: false,
    })
  }
  onScrollH(event){
    const scrollH = Size.scaleSize(560)-Size.kTopHeight;
    const scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY > Size.kTopHeight) {
      let opacity = scrollY / scrollH;
      opacity = scrollY > Size.scaleSize(560) ? 1 : opacity;
      this.props.navigation.setParams({
        opacity:opacity,
        isShowAbs:true,
      })
    } else {
      this.props.navigation.setParams({
        opacity:0,
        isShowAbs:false,
      })
    }
  }

  //选择图片上传
  selPhotoFun = () => {
    ImagePicker.openPicker({
      multiple: true
    }).then(images => {
      console.log(images);
    });
  }

  renderFlist(){
    {/* 发表动态 */}
    return(
      <FlatList
          extraData={this.state}
          style={styles.listCn}
          data={this.state.listArr}
          onScroll = {(event)=>this.onScrollH(event)}
          ListHeaderComponent={this.flatHead}
          ItemSeparatorComponent={() => <View style={{height: Size.space_20,
            backgroundColor: globalStyles.COLOR.bg_color}} />}
          renderItem={(item) => <ListItemRowComp item={item}
                                      navigation={this.props.navigation}
                                      />
          }
      />
    )
  }
  flatHead(){
    return(
      <View style={styles.topNav}>
        {/* 轮播背景图 */}
        <HeadBannerImg />
        {/* 粉丝、关注 */}
        <View style={styles.fansView}>
          <View style={[styles.fansText, styles.fansText1]}><Text style={styles.fansText}>关注 <Text style={styles.fansNum}>19999</Text></Text></View>
          <View style={styles.fansText}><Text style={styles.fansText}>粉丝 <Text style={styles.fansNum}>121554</Text></Text></View>
        </View>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>

        {this.renderFlist()}
        {/* 全屏查看图片弹窗 */}
        <Modal
            style={styles.picModel}
            animationType="slide"
            visible={this.state.showPicModel}
            transparent={false}
        >
          <ImageViewer
              imageUrls={this.state.previewImg}
              onClick={()=>{
                this.setState({ showPicModel: false })
              }}
              index={this.state.previewIndex} />
        </Modal>

        {/* 发布按钮 */}
        <View style={styles.issueView}>
          <TouchableOpacity onPress={this.issueMsgFun}>
            <Image style={styles.issue} source={issue} />
          </TouchableOpacity>
        </View>

        {/* 选择发布类型 */}
        {
          this.state.selIssType &&
          <TouchableOpacity style={styles.iss_Type_view} onPress={()=>{
            this.setState({
              selIssType:false,
            })
          }}>
            <View style={styles.iss_t_sub}>
              <View style={styles.iss_t_top}>
                <TouchableOpacity onPress={this.selPhotoFun}>
                  <View style={styles.iss_list}>
                    <Image style={styles.iss_l_icon} source={selPhoto} />
                    <View><Text style={styles.iss_l_tx}>相册</Text></View>
                  </View>
                </TouchableOpacity>
                <View style={styles.iss_list}>
                  <Image style={styles.iss_l_icon} source={selCourse} />
                  <View><Text style={styles.iss_l_tx}>课程</Text></View>
                </View>
                <View style={styles.iss_list}>
                  <Image style={styles.iss_l_icon} source={takePhoto} />
                  <View><Text style={styles.iss_l_tx}>拍摄</Text></View>
                </View>
                <View style={styles.iss_list}>
                  <Image style={styles.iss_l_icon} source={selRecord} />
                  <View><Text style={styles.iss_l_tx}>语音</Text></View>
                </View>
                <View style={styles.iss_list}>
                  <Image style={styles.iss_l_icon} source={selText} />
                  <View><Text style={styles.iss_l_tx}>文字</Text></View>
                </View>
              </View>
              <Text style={styles.iss_t_btm} onPress={this.issueMsgFun}>取消</Text>
            </View>
          </TouchableOpacity>
        }

      </View>
    )
  }
}
ClassmateScreen.navigationOptions=({navigation})=>({
  header:navigation.state.params && !navigation.state.params.isShowAbs && null,
  headerTitle: '同学圈',
  headerTransparent: true,
  headerStyle: {
    backgroundColor: globalStyles.COLOR.primary,
    // borderBottomWidth: 0.5,
    borderBottomColor: globalStyles.COLOR.border,
    opacity:navigation.state.params?navigation.state.params.opacity:0,
  },
})


const styles = StyleSheet.create({

  //选择发布类型
  iss_t_btm: {
    height: Size.scaleSize(98),
    lineHeight: Size.scaleSize(98),
    textAlign: 'center',
    color: '#1a1a1a',
    fontSize: Size.scaleSize(28),
    borderTopColor: '#efefef',
    borderTopWidth: Size.scaleSize(2),
  },
  iss_l_tx: {
    textAlign: 'center',
    color: '#1a1a1a',
    fontSize: Size.scaleSize(24),
    marginTop: Size.scaleSize(19)
  },
  iss_l_icon: {
    width: Size.scaleSize(100),
    height: Size.scaleSize(100),
  },
  iss_list: {
  },
  iss_t_top: {
    height: Size.scaleSize(202),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Size.scaleSize(25),
  },
  iss_t_sub: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: Size.scaleSize(300),
    backgroundColor: 'white',
  },
  iss_Type_view: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
    left:0,
    right:0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  // 发布按钮
  issue: {
    width: Size.scaleSize(80),
    height: Size.scaleSize(80),
  },
  issueView: {
    position: 'absolute',
    bottom: Size.scaleSize(165),
    right: Size.scaleSize(47),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
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
  picModel: {
    flex: 1,
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
    paddingTop: Size.scaleSize(35),
    paddingBottom: Size.scaleSize(32),
    fontSize: Size.scaleSize(28),
    color: "#1a1a1a",
    lineHeight: Size.scaleSize(36),
  },
  list_Cn: {
    flex:1
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
    height: Size.scaleSize(80),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  List_R: {
    width: '80%',
    marginLeft: Size.scaleSize(20),
  },
  List_L_img: {
    width: Size.scaleSize(90),
    height: Size.scaleSize(90),
    borderRadius: 100,
  },
  List_L: {
    width: '12%',
    marginLeft: Size.scaleSize(24),
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
    backgroundColor: '#fff',
  },
  // 列表
  fansNum: {
    fontSize: Size.scaleSize(24),
    lineHeight: Size.scaleSize(32),
    color: '#ff7e00',
  },
  fansText1: {
    paddingTop: Size.scaleSize(5),
  },
  fansText: {
    fontSize: Size.scaleSize(24),
    flexDirection: 'column',
    justifyContent: 'center',
    lineHeight: Size.scaleSize(30),
    color: 'white',
  },
  fansView: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: Size.kStatusBarHeight,
    width: Size.scaleSize(190),
    height: Size.scaleSize(74),
    lineHeight: Size.scaleSize(74),
    backgroundColor: 'rgba(0, 0, 0,.5)',
    borderTopLeftRadius: Size.scaleSize(37),
    borderBottomLeftRadius: Size.scaleSize(37),
    textAlign: 'center',
    paddingLeft: Size.scaleSize(36),
    paddingTop: Size.scaleSize(2),
  },
  topNav: {
    width: "100%",
    height: Size.scaleSize(281)+Size.kTopHeight,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBgp: {
    width: "100%",
    height: '100%',
  },
  topSilde: {
    width: "100%",
    height: '100%',
  },
  headWarp: {
    width: "100%",
    height: '100%',
  },
  container: {
    flex: 1,
  }
})
