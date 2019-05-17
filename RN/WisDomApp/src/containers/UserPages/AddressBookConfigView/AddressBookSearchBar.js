import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Alert,
} from 'react-native'

import Size from '../../../config/Size';
import Color from '../../../config/Color';

const search_icon = require('../../../assets/user/mail_list/maillist-tabbar-search.png')

const delete_icon = require('../../../assets/user/settings/binding-list-delete.png')

export default class AddressBookSearchBar extends Component {

    constructor(props) {
	    super(props);
	    this.state = {
            search_text:'',
	    };
	}

    render() {

        return (
            <View style={[styles.container, this.props.style]}>

                <View style={{flexDirection: 'row', 
                    marginLeft: Size.scaleSize(42), 
                    alignItems: 'center', 
                    height: 44,}}>

                    
                    <Image resizeMode='contain' source={search_icon} style={styles.search_image}/>

                    <View style={{left: Size.scaleSize(20), 
                        flexDirection: 'row', 
                        alignItems: 'center',
                        // backgroundColor: 'red',
                        width: Size.screenW-Size.scaleSize(42)-Size.scaleSize(90)-Size.scaleSize(53),
                        justifyContent: 'space-between'}}>
                        <TextInput
                            placeholder="搜索"
                            // 默认字体颜色
                            placeholderTextColor = {Color.font_b1}
                            // 光标颜色
                            selectionColor={Color.bg_1580e0}
                            // 如果为 true，表示多行输入
                            // multiline={true}
                            editable={true}//是否可编辑
                            // maxLength={100}//能够输入的最长字符数
                            //获得焦点
                            autoFocus={true} 
                            style={styles.search_input}
                            onChangeText={(search_text) => this.setState({search_text})}
                        />
                        {/* 撤销 */}
                        <TouchableOpacity style={styles.delete_button}>
                            <Image source={delete_icon} style={styles.delete_image}/>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.cancel_button} onPress={()=>{
                        this.props.navigation.goBack();
                    }}>
                        <Text style={{color: '#3a3a3a', fontSize: Size.scaleSize(28)}}>取消</Text>
                    </TouchableOpacity>  
                </View>
                
            </View>
        )
    }
    skipEdit=()=>{
        this.props.navigation.navigate('QuestionsEditScreen')
    }
}

const styles = StyleSheet.create ({
    container: {
        // position:'absolute', 
        backgroundColor: 'white',
        height: Size.kTopHeight,
        justifyContent: 'flex-end',
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(204,204,204,0.5)',
    },
    search_image: {
        width: Size.scaleSize(35), 
        height: Size.scaleSize(35), 
    },
    delete_button: {
        width: 44, 
        height: 44, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    delete_image: {
        width: Size.scaleSize(25), 
        height: Size.scaleSize(25), 
    },
    search_input: {
        width: Size.screenW-Size.scaleSize(42)-Size.scaleSize(90)-Size.scaleSize(53)-44,
        height: 44,
    },
    
    cancel_button: {
        // backgroundColor: 'gray',
        position:'absolute', 
        width: Size.scaleSize(90), 
        height: 44, 
        alignItems: 'flex-start',
        justifyContent: 'center',
        right: Size.scaleSize(0),
    },
})