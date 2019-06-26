/*
* @Created by liqihui on 2019-05-06.
* @Desc index
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, Image, TouchableOpacity, Platform
} from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Size from "../../../config/Size";
const IS_IOS = Platform.OS === 'ios';
const ENTRIES1 = [
    {
        title: 'Beautiful and dramatic Antelope Canyon',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://pics1.baidu.com/feed/8d5494eef01f3a29d02b9955e26219355d607c12.jpeg?token=21b954300f03b2442a9f1416137feae4&s=15B3519548033CCC489D808D03006043'
    },
    {
        title: 'Earlier this morning, NYC',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'http://tx.haiqq.com/uploads/allimg/170509/0U5326359-4.jpg'
    },
    {
        title: 'White Pocket Sunset',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: 'http://image.suning.cn/content/catentries/00000000012533/000000000125330391/fullimage/000000000125330391_1f.jpg'
    },
    {
        title: 'Acrocorinth, Greece',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://pics1.baidu.com/feed/8d5494eef01f3a29d02b9955e26219355d607c12.jpeg?token=21b954300f03b2442a9f1416137feae4&s=15B3519548033CCC489D808D03006043'
    },
    {
        title: 'The lone tree, majestic landscape of New Zealand',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'http://www.da-mai.com/upload/dynamic/image/20180123/20180123114548_57429.png'
    },
];
export default class index extends Component {
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
    _renderIteList ({item, index}) {
        return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
    }
    render() {
        return (
            <View style={styles.cover}>
                {/*<Text style={[styles.title, styles.titleDark]}>{`Example ${number}`}</Text>*/}
                {/*<Text style={[styles.subtitle, styles.titleDark]}>{title}</Text>*/}
                <Carousel
                    data={ ENTRIES1}
                    renderItem={ this._renderIteList}
                    sliderWidth={Size.scaleSize(330)}
                    itemWidth={Size.scaleSize(330)+Size.scaleSize(2)*2}
                    containerCustomStyle={styles.slider}
                    // contentContainerCustomStyle={styles.sliderContentContainer}
                    layout={'stack'}
                    loop={true}
                />
            </View>
        );
    }

}

export class SliderEntry extends Component {

    get image () {
        const { data: { illustration }, parallax, parallaxProps, even } = this.props;
        return (
            <Image
                source={{ uri: illustration }}
                style={styles.image}
            />
        )
    }

    render () {
        const { data: { title, subtitle }, even } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.slideInnerContainer}
                onPress={() => { alert(`You've clicked '${title}'`); }}
            >
                { this.image }
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    cover: {
        position:'absolute',
        right: Size.space_20,
        bottom:Size.space_20,
        width:Size.scaleSize(300),
        height:Size.scaleSize(400),
        // backgroundColor:'red',
        borderRadius:Size.radius_12,
        // backgroundColor:'red'
    },
    slideInnerContainer: {
        width: Size.scaleSize(300),
        height: Size.scaleSize(400),
        paddingHorizontal: Size.scaleSize(2),
        // paddingBottom: 18, // needed for shadow
        // backgroundColor:'cyan'
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: IS_IOS ? 8 : 0,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
})
