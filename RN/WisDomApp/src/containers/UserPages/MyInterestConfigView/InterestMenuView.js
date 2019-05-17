import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'

import Size from '../../../config/Size'
import Color from '../../../config/Color'

export default class InterestMenuView extends Component {

    constructor(props){
        super(props)

        this.state = {
            list:[]
        }
    }

    // 组件将要被加载到视图之前调用
    componentWillMount(){
        this.setState({
            list: this.props.data
        })
    }

    renderRow(){

          return  this.state.list.map((aItem) => {
                var txt = aItem.title;
                return(
                    <View style={{paddingLeft: Size.scaleSize(20),
                        paddingRight: Size.scaleSize(20), 
                        paddingTop: Size.space_30}}>
                        <TouchableOpacity style={{
                            backgroundColor:aItem.selected ? Color.bg_1580e0:'white',
                            borderColor: Color.bg_1580e0, 
                            borderWidth: 0.5, 
                            height: Size.scaleSize(56),
                            borderRadius: Size.scaleSize(56)/2,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingLeft: 10,
                            paddingRight: 10,}}
                            onPress={()=>{
                                this.selected(aItem)
                            }}>
                            <Text style={{color: aItem.selected ? 'white' : Color.bg_1580e0, 
                                fontSize: Size.scaleSize(24)}}>{txt}</Text>
                        </TouchableOpacity>
                    </View>
                )
            })

    }

    render() {
        return (
            
            <View style={{flex:1, marginTop:15,}}>
                <View style={{ height: Size.scaleSize(30), justifyContent: 'center', }}>
                    <Text style={{color: Color.bg_1580e0, 
                        fontSize: Size.scaleSize(28),
                        left: Size.scaleSize(38)}}>{this.props.title}</Text>
                </View>
                <View style={styles.list}>
                    {this.renderRow()}
                </View>
            </View>
        )
    }

    // 选中状态
    selected(item) {
        
        let arrPush = [];
        this.state.list.forEach((aItem) => {
            
            if (item.title == aItem.title) {
                // 选中的  
                aItem.selected=!item.selected
            }

            arrPush.push(aItem);
        });
        
        this.setState({
            list: arrPush,
        })

        this.props.selected && this.props.selected()
    }
}

const styles = StyleSheet.create({
    list:{
        flex: 1,
        flexDirection: 'row', //这里的属性很重要，可以学习下flex布局
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        backgroundColor: '#FFFFFF',
        marginHorizontal: Size.scaleSize(20),
    },
})