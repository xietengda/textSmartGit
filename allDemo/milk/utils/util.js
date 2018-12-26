const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/*查看图片*/
function lookPhoto(e){
  var listArr = e.currentTarget.dataset.listArr;
  var listIndex = e.currentTarget.dataset.listIndex;

  wx.previewImage({
    current: listIndex, // 当前显示图片的http链接
    urls: listArr // 需要预览的图片http链接列表
  })
}

/*删除图片 e:点击对象，para:this.data*/
function delPhoto(e,para){
  var photoIndex = e.currentTarget.dataset.photoIndex;

  var newArr = [];

  for (var x in para) {
    if (photoIndex != x) {
      newArr.push(para[x]);
    }
  }
  return newArr;
}

/*更换优惠券背景 para:传入的优惠券数据*/
function changeDisBg(para){
  var disList = para;
  var bgNum = 0;
  for (var x in disList) {
    if (bgNum < 5) {
      bgNum += 1;
      disList[x].bgNum = bgNum;
    } else {
      bgNum = 0;
      bgNum += 1;
      disList[x].bgNum = bgNum;
    }
  }
  return disList;
}

//检查手机格式
function checkPhone(phone) {
  if (!(/^1[34578]\d{9}$/.test(phone))) {
    return false;
  } else {
    return true
  }
}

//加载图标
function showLoading(){
    wx.showLoading({
      title: '请稍后...'
    })
}

//隐藏图标
function hideLoading() {
  wx.hideLoading()
}

//提示语
function showToast(para,paraTwo = 'none'){
  wx.showToast({
    title: para,
    icon: paraTwo,
    duration: 1000
  })
}

//转base64  data:要转换的值
function toBase64(data){
  var toBase64Table = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  var base64Pad = '=';
  var result = '';
  var length = data.length;
  var i;
  // Convert every three bytes to 4 ascii characters.                                                 

  for (i = 0; i < (length - 2); i += 3) {
    result += toBase64Table[data.charCodeAt(i) >> 2];
    result += toBase64Table[((data.charCodeAt(i) & 0x03) << 4) + (data.charCodeAt(i + 1) >> 4)];
    result += toBase64Table[((data.charCodeAt(i + 1) & 0x0f) << 2) + (data.charCodeAt(i + 2) >> 6)];
    result += toBase64Table[data.charCodeAt(i + 2) & 0x3f];
  }

  // Convert the remaining 1 or 2 bytes, pad out to 4 characters.                                     

  if (length % 3) {
    i = length - (length % 3);
    result += toBase64Table[data.charCodeAt(i) >> 2];
    if ((length % 3) == 2) {
      result += toBase64Table[((data.charCodeAt(i) & 0x03) << 4) + (data.charCodeAt(i + 1) >> 4)];
      result += toBase64Table[(data.charCodeAt(i + 1) & 0x0f) << 2];
      result += base64Pad;
    } else {
      result += toBase64Table[(data.charCodeAt(i) & 0x03) << 4];
      result += base64Pad + base64Pad;
    }
  }
  return result;
}

module.exports = {
  formatTime: formatTime,
  lookPhoto: lookPhoto,
  delPhoto: delPhoto,
  checkPhone: checkPhone,
  showToast: showToast,
  showLoading: showLoading,
  hideLoading: hideLoading,
  changeDisBg: changeDisBg,
  toBase64: toBase64
}
