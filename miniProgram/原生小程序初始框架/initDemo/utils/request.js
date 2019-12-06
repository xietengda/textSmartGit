




class request {


   // post请求
   postRequest(url, data) {
      var promise = new Promise((resolve, reject) => {

         if (!url.includes('wechat/saveFormId')) {
            wx.showLoading({
               title: '加载中...',
            })
         }
        
         //请求头
         let header = {
            'content-type': 'application/x-www-form-urlencoded',
            "accessToken": wx.getStorageSync('accessToken')
         }
         //如果 匹配 就换content-type 类型
         if (url.includes('wechat/appLogin') || url.includes('companyInfo/list') || url.includes('wechat/saveFormId')  || url.includes('companyInfo/save') || url.includes('companyInfo/update') || url.includes('companyInfo/delet') || url.includes('topic/info/add')  || url.includes('topic/comment') || url.includes('meeting/save')  || url.includes('exhibition/addSignup')  || url.includes('wechat/getTemplateIds')) {  
            header['content-type'] = 'application/json';
         }
         wx.request({
            url: url,
            data: data,
            method: 'POST',
            header: header,
            success: function (res) {//服务器返回数据
               if (res.data.code == 0) {
                  resolve(res);
               } else {//返回错误提示信息
                  resolve(res);
               }
               wx.hideLoading();
            },
            error: function (err) {
               reject(err);
            },

         })
      });
      return promise;
   }

   // get请求
   getRequest(url, data) {
      var promise = new Promise((resolve, reject) => {
         wx.showLoading({
            title: '加载中...',
         })
         //请求头
         let header = {
            'content-type': 'application/x-www-form-urlencoded',
            "accessToken": wx.getStorageSync('accessToken')
         }

         //如果 匹配 就换content-type 类型
         if (url.includes('companyInfo/info') || url.includes('mine/topic/list')) {
            header['content-type'] = 'application/json';
         }
         wx.request({
            url: url,
            data: data,
            method: 'get',
            header: header,
            success: function (res) {//服务器返回数据
               if (res.data.code == 0) {
                  resolve(res);
               } else {//返回错误提示信息
                  resolve(res);
               }
               wx.hideLoading();
            },
            error: function (err) {
               reject(err);
               wx.hideLoading();
            }
         })
      });
      return promise;
   }


   //上传图片
   uploadFilePost(url, data){
      var promise = new Promise((resolve, reject) => {
         wx.showLoading({
           title: '上传中...',
         })
         const uploadFile = data.file;
         wx.uploadFile({
            url: url, 
            filePath: uploadFile,
            name: 'file',
            formData: {},
            success (res){
               if (res.data.code == 0) {
                  resolve(res);
               } else {//返回错误提示信息
                  resolve(res);
               }
               wx.hideLoading();
            },
            error: function (err) {
               reject(err);
               wx.hideLoading();
            }
          })
      });
      return promise;
   }
  

}

export default request;