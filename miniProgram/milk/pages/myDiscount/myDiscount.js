var util = require('../../utils/util.js');

Page({
  data: {
    disList:[
      { num: '10', til: '新人专享10元无门槛券', date:'有效期2018-08-08至2018-06-30',dis_type:1,bgNum:1},
      { num: '20', til: '新人专享20元无门槛券', date: '有效期2018-08-08至2018-06-30', dis_type: 2, bgNum: 1 },
      { num: '10', til: '新人专享10元无门槛券', date: '有效期2018-08-08至2018-06-30', dis_type: 3, bgNum: 1},
      { num: '10', til: '新人专享10元无门槛券', date: '有效期2018-08-08至2018-06-30', dis_type: 1, bgNum: 1 },
      { num: '10', til: '新人专享10元无门槛券', date: '有效期2018-08-08至2018-06-30', dis_type: 1, bgNum: 1} ,
    ]
  },
  onLoad: function (options) {
    var disList = util.changeDisBg(this.data.disList); 

    this.setData({
      disList: disList
    });

  },
})