import requestAll from '../request.js';

const login = {
    //后台登录
	loginFun(dataModel) {
		return requestAll._request(requestAll.apiUrl + 'api/v1/user/signIn', dataModel, 'POST');
	},
}

export default login