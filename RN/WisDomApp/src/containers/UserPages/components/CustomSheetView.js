import React, {Component} from 'react'
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity,
    Modal,
    ImageBackground,
    Animated,
    FlatList,
} from 'react-native'

import Size from '../../../config/Size'
import Color from '../../../config/Color'

export default class CustomSheetView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offsetY: new Animated.Value(Size.screenH),
        };
    }

    componentDidMount(){
        this.startAnimation();
    }

    startAnimation(){
        Animated.timing(
            this.state.offsetY,            // 动画中的变量值
            {
                toValue: 0,                   // 
                duration: 300,              // 让动画持续一段时间
            }
        ).start();
    }

    _renderItem=({item, index})=> {
        return (
            <TouchableOpacity style={{width: Size.screenW, height: Size.scaleSize(100), backgroundColor: 'white',
                alignItems: 'center', justifyContent: 'center',
                borderBottomColor: 'rgba(177,177,177,0.4)', borderBottomWidth:0.5}}
            onPress={()=>{
                this.props.selectIndex && this.props.selectIndex(index)
            }}>
                <Text style={{color: '#3a3a3a', 
                    fontSize: Size.scaleSize(32),}}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <Modal animationType={'fade'} transparent = {true}>

                <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                    
                    <Animated.View style={[{width: Size.screenW, height: Size.screenH, }, 
                        {transform: [{ translateY: this.state.offsetY }]}
                    ]}>
                        <View style={{backgroundColor: 'rgba(240, 240, 240, 1)', position: 'absolute',
                            paddingBottom: Size.kBottomAreaHeight, bottom: 0, }}>

                            <FlatList
                                data={this.props.dataSource}
                                renderItem={this._renderItem}
                                keyExtractor={({aItem, aIndex})=>{aItem+aIndex}}
                            />

                            <TouchableOpacity style={{width: Size.screenW, height: Size.scaleSize(90), backgroundColor: 'white',
                                alignItems: 'center', justifyContent: 'center', marginTop: Size.scaleSize(20)}}
                            onPress={()=>{
                                this.props.cancel && this.props.cancel()
                            }}>
                                <Text style={{color: Color.bg_1580e0, fontSize: Size.scaleSize(32)}}>取消</Text>
                            </TouchableOpacity>
                        </View>

                    </Animated.View>

                </View>
                
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    
})
