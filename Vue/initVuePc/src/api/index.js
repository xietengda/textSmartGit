import common from './common/index.js'; // 公共请求
import login from './login/index.js'; // 登录相关

const api = {
	common: { ...common }, // 公共请求
	login: { ...login }, // 登录
}
 
export default api
