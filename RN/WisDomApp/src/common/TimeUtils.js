import React from 'react'
import moment from 'moment/moment'

// endTime 2019/5/14 00:00:00 or May 14 2019 00:00:00
function getTimeCountDown(endTime) {
  var oDate = new Date();//获取日期对象
  var oldTime = oDate.getTime();//现在距离1970年的毫秒数
  // var newDate = new Date('2019/1/1 00:00:00');
  var newDate = new Date(endTime);
  var newTime = newDate.getTime();//2019年距离1970年的毫秒数
  var second = Math.floor((newTime - oldTime) / 1000);//未来时间距离现在的秒数
  var day = Math.floor(second / 86400);//整数部分代表的是天；一天有24*60*60=86400秒 ；
  second = second % 86400;//余数代表剩下的秒数；
  var hour = Math.floor(second / 3600);//整数部分代表小时；
  second %= 3600; //余数代表 剩下的秒数；
  var minute = Math.floor(second / 60);
  second %= 60;
  // const timea =  this.tow(day)+"天"+this.tow(hour)+"小时"+this.tow(minute)+"分"+this.tow(second)+"秒";
  const aDay = tow(day);
  const aHour = tow(hour);
  const aMinute = tow(minute);
  const aSecond = tow(second);
  const obj = {
    day:aDay,
    hour:aHour,
    minute:aMinute,
    second:aSecond,
  };
  return obj;

}
function tow(n) {
  return n >= 0 && n < 10 ? '0' + n : '' + n;
}
/**
 *@ClassName:TimeUtils.js
 *@Describe:TODO
 *@Author:grofis
 *@Time:2018/7/30 17:00
 **/
function getStartAndEnd (date) {
  var y = date.getFullYear(),
    m = date.getMonth()
  var firstDay = new Date(y, m, 1)
  var lastDay = new Date(y, m + 1, 0)
  return {
    first: moment(firstDay).format('YYYY-MM-DD'),
    firstTime: firstDay.getTime(),
    last: moment(lastDay).format('YYYY-MM-DD'),
    lastTime: lastDay.getTime()
  }
}

// 获取开始时间和结束之间的每一天
function getDateArray (startDay, endDay) {
  var arr = new Array()
  var dt = new Date(startDay)
  endDay = new Date(endDay)
  while (dt <= endDay) {
    var temp = new Date(dt)
    var day = new Object()
    day.millisecond = temp.getTime()
    day.date = moment(temp).format('YYYY-MM-DD')
    day.ids = new Array()
    day.types = new Array()

    arr.push(day)
    dt.setDate(temp.getDate() + 1)
  }

  return arr
}

function dateFormat (date) {
  if (date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  } else {
    return date = ''
  }
}

function getDay (date) {
  if (date == null) {
    date = new Date()
  }
  return moment(date).format('YYYY-MM-DD')
}

function getHour (date) {
  if (date == null) {
    date = new Date()
  }
  return moment(date).format('HH:mm')
}

function dateToDate (date) {
  var sDate = new Date()
  if (typeof date === 'object' &&
        typeof new Date().getMonth === 'function'
  ) {
    sDate = date
  } else if (typeof date === 'string') {
    var arr = date.split('-')
    if (arr.length == 3) {
      sDate = new Date(arr[0] + '-' + arr[1] + '-' + arr[2])
    }
  }

  return sDate
}

// 月份相减
function subtractMonth (num) {
  var date = new Date()
  num = parseInt(num)
  var sDate = dateToDate(date)

  var sYear = sDate.getFullYear()
  var sMonth = sDate.getMonth() + 1
  var sDay = sDate.getDate()

  var eYear = sYear
  var eMonth = sMonth - num
  var eDay = sDay
  while (eMonth <= 0) {
    eYear--
    eMonth = 12 + eMonth
  }
  // console.log('eMonth ---xx-----',eMonth);
  var eDate = new Date(eYear, eMonth - 1, eDay)
  while (eDate.getMonth() != eMonth - 1) {
    eDay--
    eDate = new Date(eYear, eMonth - 1, eDay)
  }
  var dateTime = eDate.getFullYear() + '/' + (eDate.getMonth() + 1) + '/' + eDate.getDate()
  if (num === 0) {
    // 表示结束时间
    return dateTime + ' 23:59:59'
  }
  return dateTime + ' 00:00:00'
}

function isNull (object) {
  if (object == null || typeof object === undefined) {
    return true
  }
  return false
};

// 获取星期
function getWeek (dateString) {
  var date
  if (isNull(dateString)) {
    date = new Date()
  } else {
    var dateArray = dateString.split('-')
    date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2])
  }
  // var weeks = new Array("日", "一", "二", "三", "四", "五", "六");
  // return "星期" + weeks[date.getDay()];
  return '星期' + '日一二三四五六'.charAt(date.getDay())
};

function getShowDateName (d) {
  var td = new Date()
  let ny = td.getFullYear()
  td = new Date(ny, td.getMonth(), td.getDate())
  var oday = new Date(Date.parse(d.replace(/-/g, '/')))
  let oy = oday.getFullYear()

  var od = new Date(oy, oday.getMonth(), oday.getDate())
  var xc = (od - td) / 1000 / 60 / 60 / 24

  if (xc == -1) {
    return '昨天 ' + moment(oday).format('HH:mm')
  } else if (xc == 0) { // 今天
    return moment(oday).format('HH:mm')
  } else if (ny == oy) {
    return moment(od).format('MM-DD')
  } else {
    return moment(od).format('YYYY-MM-DD')
  }
}


function getYearMonth(nS) {
  if(nS == undefined || nS == '')return '';
  let timestamp2 = new Date(nS);
  let year = timestamp2.getFullYear();
  let month = timestamp2.getMonth()+1;
  let date = year+ "年"+ month + "月";
  return  date;
}

module.exports = {
  getYearMonth,
  getTimeCountDown,
}
