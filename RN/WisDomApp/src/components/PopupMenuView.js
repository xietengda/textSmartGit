import React, {Component} from 'react'
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity,
    Modal,
    ImageBackground,
    FlatList,
} from 'react-native'

import Size from '../config/Size'
import Color from '../config/Color'

const more_background = require('../assets/store/more-background.png');

const share_icon = require('../assets/store/share.png');
const complaint_icon = require('../assets/store/complaint.png');
const block_icon = require('../assets/store/blacklist.png');
const find_icon = require('../assets/store/find.png');

export default class PopupMenuView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listArray: [
                {icon:share_icon, title: '分享'},
                {icon:complaint_icon, title: '投诉'},
                {icon:block_icon, title: '拉黑'},
                {icon:find_icon, title: '发现'},
            ]
        };
    }

    _renderItem=({item, index})=> {
        return (
            <TouchableOpacity onPress={()=>{this.skipItem(index)}}>
                <View style={{flexDirection: 'row', alignItems: 'center', 
                    justifyContent: 'space-between', marginHorizontal: Size.scaleSize(14),
                    height: Size.scaleSize(79), borderBottomColor: 'rgba(177,177,177,0.3)',
                    borderBottomWidth: 0.5}}>
                    <Image source={item.icon}/>

                    <Text style={{color: Color.font_1a, 
                        fontSize: Size.scaleSize(28)}}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            
            <Modal animationType={'fade'} transparent = {true}>

                <TouchableOpacity activeOpacity={1} style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)'}} 
                onPress={()=>{
                    this.props.closeView && this.props.closeView()
                }}>
                    
                </TouchableOpacity>
                
                 <ImageBackground source={more_background}
                 style={{position: 'absolute', width: Size.scaleSize(140), 
                     height: Size.scaleSize(331), right: Size.scaleSize(25), 
                     top: Size.kTopHeight-10}}>

                     <FlatList 
                         style={{marginTop: 10, }}
                         data={this.state.listArray}
                         renderItem={this._renderItem}
                         keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
                     />

                 </ImageBackground>

            </Modal>
        )
    }
    skipItem= (index) => {
        this.props.selectMenuIndex && this.props.selectMenuIndex(index)
    }
}

const styles = StyleSheet.create({
    
})