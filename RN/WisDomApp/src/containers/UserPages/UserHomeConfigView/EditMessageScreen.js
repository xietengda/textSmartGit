// 编辑资料
import React, {Component} from 'react'
import {
  StyleSheet,
  SectionList,
  TouchableOpacity,
  Alert,
  View,
  Text,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';
import {getYearMonth} from "../../../common/TimeUtils";

import EditMessageHeaderView from '../UserHomeConfigView/EditMessageHeaderView'

import TitleAndDetailSkipView from '../components/TitleAndDetailSkipView'

import DateTimePicker from "react-native-modal-datetime-picker";
import CustomSheetView from '../components/CustomSheetView'
import ZCustomPickerView from '../components/ZCustomPickerView'
import AddressPickerView from '../components/AddressPickerView'

export default class EditMessageScreen extends Component {
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
        isDateTimePickerVisible: false,
        date: '2019年4月',
        changeHeader: false,
        selectedIndex: 0,
        listArray:[
            {key: 0, data:[{title: '头像', detail: ''} ] },

            {key: 1, data:[{title: '生日', detail: '1998-12-10'},
            {title: '真实姓名', detail: '罗涛'},
            {title: '性别', detail: '男'},
            {title: '签名', detail: '学无止境'}] },

            {key: 2, data:[{title: '所在地', detail: '广东-广州'},
            {title: '单位名称', detail: '填写公司'},
            {title: '职位', detail: '填写职位'},
            {title: '偏好', detail: '美容 护肤'},
            {title: '学历', detail: '填写学历'}] },],
    };
  }

  _renderHeaderData(index){
    if (index == 0) {
      return [{title: '拍照'}, {title: '从相册选择'}]
    } else if (index == 2) {
      return [{title: '男'}, {title: '女'}]
    }
  }
  // 学历选择数据
  _renderEducationData(){
    
    return ['小学', '初中', '高中', '中专', '大专', '本科', '硕士']
  }

  _renderItem = (info) => {
    
    if (info.index == 0 && info.section.key == 0) {
        return (
            <EditMessageHeaderView changeHeader={()=>{
              this.setState({
                selectedIndex: 0,
                changeHeader: true,
              })
            }}/>
        )
    }
    return (
        <TouchableOpacity onPress={()=>{this.skipDetail(info.index, info.section.key)}}>
            <TitleAndDetailSkipView title={info.item.title} 
                detail={info.item.detail} 
                bottomSpace= {0.5}/>
        </TouchableOpacity>
    )
  }

  _sectionComp = (info) => {
      return (
          <View style={{height: 10}}></View>
      )
  }

  render () {
      return (
        <View style={styles.constain_bg}>
            <View style = {styles.constain}>
                <SectionList
                    renderSectionHeader={this._sectionComp}
                    renderItem={this._renderItem}
                    sections={this.state.listArray}
                    // ItemSeparatorComponent={() => <View><Text></Text></View>}
                    keyExtractor={(aItem,aIndex)=>{aItem+aIndex}}
                />
            </View>

            <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
                titleIOS={'选择生日日期'}
                titleStyle={{fontSize:Size.scaleSize(32)}}
                cancelTextIOS={'取消'}
                confirmTextIOS={'确定'}
            />

            { this.state.changeHeader && <CustomSheetView 
            dataSource = {this._renderHeaderData(this.state.selectedIndex)}
            cancel={()=>{
                this.setState({
                  changeHeader: false,
                })
            }}/>}

            {/* 学历选择 */}
            <ZCustomPickerView 
              ref={(ref= ZCustomPickerView) => { //方法对引用ZCustomPickerView元素的ref引用进行操作
                this.pickerView = ref
              }}
              options={this._renderEducationData()}
              callback={(parent, choice)=>{
                  let tmpArr = this.state.listArray;
                  var item = tmpArr[2].data[4];
                  item.detail = choice;
                  this.setState({
                    listArray: tmpArr,
                  })
            }}/>

            {/* 地址选择 */}
            <AddressPickerView 
              ref={(ref= AddressPickerView) => { //方法对引用ZCustomPickerView元素的ref引用进行操作
                this.addressView = ref
              }}
              callback={(parent, choice)=>{
                  let tmpArr = this.state.listArray;
                  var item = tmpArr[2].data[0];
                  item.detail = choice;
                  this.setState({
                    listArray: tmpArr,
                  })
            }}/>
        </View>
        // <View style={styles.constain_bg}>
        //   <View style = {styles.constain}>
        //     <FlatList  
        //         data={this.state.listArray}
        //         renderItem={this._renderItem}
        //         keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
        //     />
        //   </View>
        // </View>
      )
  }

  skipDetail=(index, key)=>{
    if (key == 0) {

    } else if (key == 1) {
      if (index == 0) {
        // 生日
        this.showDateTimePicker()
      } else if (index == 1) {
        // 真实姓名
        this.props.navigation.navigate('EditInputContentScreen')
      } else if (index == 2) {
        // 性别
        this.setState({
          selectedIndex:index,
          changeHeader: true,
        })
      } else if (index == 3) {
        // 签名
        this.props.navigation.navigate('EditInputContentScreen')
      } 
    } else if (key == 2) {
      if (index == 0) {
        // 所在地
        this.addressView.show();
      } else if (index == 1) {
        // 单位名称
        this.props.navigation.navigate('EditInputContentScreen')
      } else if (index == 2) {
        // 职位
        this.props.navigation.navigate('EditInputContentScreen')
      } else if (index == 3) {
        // 偏好
        this.props.navigation.navigate('MyInterestScreen')
      } else if (index == 4) {
        // 学历
        this.pickerView.show();
      }
    }
  }
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
      this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
      // console.log("A date has been picked: ", getYearMonth(date));
      this.setState({
          date: getYearMonth(date),
      })
      this.hideDateTimePicker();
  };
}

EditMessageScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: '编辑资料'
})

const styles = StyleSheet.create({
  constain_bg: {
      backgroundColor: Color.bg_color,
      // backgroundColor: 'red',
      height: Size.screenH-Size.kTopHeight,
  },
    constain: {
        height: Size.screenH-Size.kTopHeight-Size.kBottomAreaHeight,
        // backgroundColor: Color.bg_color,
    },
})