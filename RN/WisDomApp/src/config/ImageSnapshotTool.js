import {
    Platform,
    Dimensions,
    PixelRatio,
    Alert,
    CameraRoll,
    RNFetchBlob,
} from 'react-native'

const RNFS = require('react-native-fs'); //文件处理
const storeLocation = RNFS.ExternalDirectoryPath;

import { captureScreen, captureRef } from 'react-native-view-shot';

//把组件试图 转化 生成图片
function takeViewToImage(refView) {
    // ReactNative.takeSnapshot(this.refs.shareView, {format: 'png', quality: 1}).then(
    //     (uri) => {
    //         {this.props.saveShareUri && this.props.saveShareUri(uri)}
    //         console.log("Image saved to", uri)
    //     }
    // ).catch(
    //     (error) => console.log('error:' + error)
    // );
    
    return captureRef(refView, {
        format: "png",
        quality: 1,// 图片的质量0.0 - 1.0 (default)。
        result: "tmpfile",
        //最后生成的类型，可以是tmpfile、base64、data-uri。
    })
    .then(
        uri => {
            console.log("Image saved to", uri)
            return uri;
        },
        error => {
            console.error("Oops, snapshot failed", error)
            return null;
        }
    );
}

//保存图片
function saveImage(screenShotShowImg) {
        
    if (!screenShotShowImg) return;

    if (Platform.OS === 'ios') {
        CameraRoll.saveToCameraRoll(screenShotShowImg).then((result) => {
            alert('保存成功！地址如下：\n' + result);
        }).catch((error) => {
            alert('保存失败！\n' + error);
        });
    } else {
    //调用该方法是 对 截屏的图片进行拼接，仅限Android端拼接，IOS的我不会，切此处的base64Img是未进行拼接‘data:image/png;base64’字段的base64图片格式
      //不经过拼接直接保存到相册
        // saveForAndroid(screenShotShowImg, (result) => {
        //     alert('保存成功！地址如下：\n' + result);
        // }, () => {
        //     alert('保存失败！');
        // });
        console.log('screenShotShowImg===', screenShotShowImg);
        let pathName = new Date().getTime() + "friendShareView.png"
        let downloadDest = storeLocation +'/'+pathName;

        console.log('------地址' + downloadDest);
        const ret = RNFS.downloadFile({fromUrl: 'http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg', toFile: downloadDest});
        ret.promise.then(res => {
            if(res && res.statusCode === 200){
                var promise = CameraRoll.saveToCameraRoll("file://" + downloadDest);
                promise.then(function(result) {
                    alert('保存成功！地址如下：\n' + result);
                }).catch(function(error) {
                    Alert.alert('没有读写权限。请在[设置]-[应用权限]-[智学习应用]开启');
                })
            } else {
                alert('保存失败！\n' + res);
            }
        }).catch(err => {
            alert('保存失败！\n' + err);
        });
    }
}

function saveForAndroid(base64Img, success, fail) {
    // const RNFS = require('react-native-fs'); //文件处理
    // const storeLocation = RNFS.DocumentDirectoryPath;
    // let pathName = new Date().getTime() + "friendShareView.png"
    // let downloadDest = storeLocation +'/'+pathName;
    // const ret = RNFS.downloadFile({fromUrl:base64Img, toFile:downloadDest});
    //   ret.promise.then(res => {
    //     if(res && res.statusCode === 200){
    //         var promise = CameraRoll.saveToCameraRoll("file://" + downloadDest);
    //         promise.then(function(result) {
    //             alert('保存成功！地址如下：\n' + result);
    //         }).catch(function(error) {
    //             alert('保存失败！\n' + error);
    //         })
    //     }
    //   })
    // const dirs = RNFS.ExternalDirectoryPath; // 外部文件，共享目录的绝对路径（仅限android）
    // const downloadDest = `${dirs}/${((Math.random() * 10000000) || 0)}.png`;
    let pathName = new Date().getTime() + "friendShareView.png"
    let downloadDest = storeLocation +'/'+pathName;
    const imageDatas = base64Img.split('data:image/png;base64,');
    const imageData = imageDatas[1];
    RNFetchBlob.fs.writeFile(downloadDest, imageData, 'base64').then((result) => {
        console.log('result=====', result);
        try {
        CameraRoll.saveToCameraRoll(downloadDest).then(
            (e1) => {
                console.log('success', e1);
                success && success(e1);
            }).catch((e2) => {
                console.log('failed', e2);
                Alert.alert('没有读写权限。请在[设置]-[应用权限]-[XX应用]开启');
            });
        } catch (e3) {
            console.log('catch', e3);
            fail && fail();
        }
    });
}

module.exports = {
    takeViewToImage,
    saveImage,
}