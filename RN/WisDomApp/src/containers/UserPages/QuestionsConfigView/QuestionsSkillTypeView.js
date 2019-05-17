import React, {Component} from 'react'
import {
    StyleSheet,
    FlatList,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native'

import Size from '../../../config/Size'
import Color from '../../../config/Color';

const choose_image = require('../../../assets/user/settings/list-more.png')
// 展开
const unfold_image = require('../../../assets/user/credit/credit-details.png')

export default class QuestionsSkillTypeView extends Component {
    constructor (props) {
        super(props)
        this.state = {
            typeArray:[
                {title: '职场成长', selected: true},
                {title: '教育培训', selected: false},
                {title: '亲子育儿', selected: false},
                {title: '情感心理', selected: false},
                {title: '健康养生', selected: false},
                {title: '商业创业', selected: false},
                {title: '财经楼市', selected: false},
                {title: '生活文艺', selected: false},
                {title: '女性时尚', selected: false},
                {title: '读书文化', selected: false},
            ],
            choose_status: false,
        }
    }

    _renderItem=({item, index})=>{
        return (
            <View style={{height:Size.scaleSize(58)+Size.scaleSize(30), 
                width: (Size.screenW-Size.scaleSize(28))/4, 
                alignItems: 'flex-end',
                justifyContent: 'center'}}>
                <TouchableOpacity 
                    onPress={() => {this.selected(item)}} 
                    style={[styles.type_view, {backgroundColor: item.selected? Color.bg_1580e0:'white'}]}>
                    <Text style={{color: item.selected? 'white':Color.bg_1580e0, fontSize: Size.scaleSize(28),}}>{item.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>

                <View style={styles.choose_view}>
                    <View style={{flexDirection: 'row', 
                        height: Size.scaleSize(80), 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        left: Size.scaleSize(25),
                        width: Size.screenW-2*Size.scaleSize(25)-2*Size.scaleSize(25),}}>
                        
                        <Text style={{color: Color.font_1a, fontSize:Size.scaleSize(28)}}>擅长的类型</Text>

                        <TouchableOpacity 
                            style={{flexDirection: 'row', 
                            alignItems: 'center',
                            width: Size.screenW/2,
                            height: Size.scaleSize(80),
                            justifyContent: 'flex-end'}} 
                            onPress={this.change_type}>
                            <Text style={{color: Color.font_b1, fontSize:Size.scaleSize(24), right: Size.scaleSize(5), }}>请选择</Text>
                            <Image source={ this.state.choose_status? unfold_image:choose_image}/>
                        </TouchableOpacity>
                    </View>
                </View>
                
                { this.state.choose_status && <FlatList data={this.state.typeArray}
                    style={styles.menuList}
                    renderItem={this._renderItem}
                    // horizontal={true}
                    numColumns={4}
                    keyExtractor={({aItem, aIndex})=>{aIndex+aItem}}
                />}
            </View>
        )
    }
    change_type=()=>{
        this.setState({
            choose_status: !this.state.choose_status,
        })
    }
    // 选中状态
    selected(item) {
        let stylePush = [];
        this.state.typeArray.forEach((aItem) => {
            // 先全部置为false
            aItem.selected=false
            if (item === aItem) {
                // 选中的  置为true
                aItem.selected=true
            }
            stylePush.push(aItem);
        });
        this.setState({
            typeArray: stylePush,
        })
    }
}

const styles = StyleSheet.create({
    container: {
        
    },
    choose_view: {
        borderColor: '#eeeeee',
        borderWidth: 0.5,
        borderRadius: 5,
        height: Size.scaleSize(80),
        marginHorizontal: Size.scaleSize(25),
    },
    menuList: {
        marginTop: Size.scaleSize(15),
        // left: Size.scaleSize(24),
        // width: Size.screenW - 2*Size.scaleSize(24),
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    type_view: {
        borderColor: Color.bg_1580e0,
        borderWidth: 0.5,
        borderRadius: 2.5,
        height: Size.scaleSize(58),
        width: (Size.screenW-5*Size.scaleSize(28))/4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: 'rgb(177,177,177)',
        fontSize: Size.scaleSize(28),
        left: Size.scaleSize(44),
        marginTop: Size.scaleSize(30),
    },
    money: {
        color: 'rgb(26,26,26)',
        fontSize: Size.scaleSize(24),
        left: Size.scaleSize(44),
        marginTop: Size.scaleSize(30),
    },
})