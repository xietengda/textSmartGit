import requestAll from '../request.js';

const common = {
    // 获取url补充静态资源
    getUrl() {
        return requestAll.webUrl;
    },
    // 获取验证图片
	getCodeFun(dataModel) {
		return requestAll._request(requestAll.apiUrl + 'api/v1/user/getVerifyCode', dataModel, 'GET', {needLoading: false, type: 'downLoad'});
    },	
    //获取当前用户可见菜单
	getUserHasMenu(dataModel) {
		return requestAll._request(requestAll.apiUrl + `api/v1/menu/userList/${dataModel.userId}`, dataModel, 'POST', {needLoading: false});
	},
}

export default common