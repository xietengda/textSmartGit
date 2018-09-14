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

module.exports = {
  formatTime: formatTime,
  lookPhoto: lookPhoto,
  delPhoto: delPhoto,
  changeDisBg: changeDisBg
}
