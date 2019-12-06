import requestAll from './request' // 此处，引入存放对promise处理的文件

//const apiUrl = 'https://www.helpyou100.com/'  //http://www.helpyou.com/
//const webUrl = 'https://www.helpyou100.com/'
   const apiUrl = 'http://www.helpyou.com/'  //http://www.helpyou.com/
   const webUrl = 'http://www.helpyou.com/'
const baseUrl = apiUrl + '?act='
const SessionKey = wx.getStorageSync('sessionkey')
const Langua = wx.getStorageSync('language')
class api {

	//图片上传  files：文件
	uploadPic(files,name,session = SessionKey,language = Langua){
		let data ={
			session,
			language
		};
		return requestAll.uploadFile(apiUrl + 'portal/list/upload_pic',files,name,data);
	}
	
	//获取url补充静态资源
	getUrl() {
		return webUrl;
	}
	
	
	//登录
	login(code){
		let data ={
			code
		};
		return requestAll.postRequest(apiUrl + 'wechat/login/login', data);
	}
	
	//验证sessionkey
	checkSessionKey(sessionkey,openid){ 
		let data = {
			sessionkey,
			openid
		}
		return requestAll.postRequest(apiUrl + 'wechat/login/checkLogin', data);
	}
	
	//首页分享
	indexShare(session,language){
		let data = {
			session,
			language
		}
		return requestAll.postRequest(apiUrl + 'portal/index/wechat_share', data);
	}
	
	
	//获取banner图  session:sessionKey   language:语言
	getBanner(session,language){
		let data = {
			session,
			language
		}
		return requestAll.postRequest(apiUrl + 'portal/index/top_banner', data);
	}
	 
	//首页信息类别广告图接口(美食/学校)  session  language:语言
	secondMenu(session,language){
		let data = {
			session,
			language
		}
		return requestAll.postRequest(apiUrl + 'portal/index/type_banner', data);
	}
	
	//首页广告图接口(狠优惠/有格调) session  language:语言
	lifeMenu(session,language){
		let data = {
			session,
			language
		}
		return requestAll.postRequest(apiUrl + 'portal/index/heji_sort_banner', data);
	}
	
	//首页推荐列表 session  language:语言  lat：纬度，lng：经度
	homeRecom(session,language,lat,lng){
		let data = {
			session,
			language,
			lat,
			lng
		}
		return requestAll.postRequest(apiUrl + 'portal/index/goods_recommend', data);
	}
	
	//首页定位 lat=>纬度, lng=>经度 language:语言
	getLocation(lat,lng,session,language){
		let data = {
			lat,
			lng,
			session,
			language
		}
		return requestAll.postRequest(apiUrl + 'portal/index/getAddress', data);
	}
	
	//获取用户信息 encryptedData=>完整用户信息的加密数据  Iv=>加密算法的初始向量，
	getUserInfo(encryptedData,iv,session = wx.getStorageSync('sessionkey'),language = wx.getStorageSync('language')){
		let data = {
			encryptedData,
			iv,
			session,
			language
		}
		return requestAll.postRequest(apiUrl + 'wechat/login/getUserinfo', data);
	}
	
	
	//获取商家列表的'美食'和'全城'列表 lat=>纬度, lng=>经度  cid=>分类id 
	getCondition(lat,lng,cid,session = SessionKey,language = Langua){
		let data = {
			lat,
			lng,
			cid,
			session,
			language
		}
		return requestAll.postRequest(apiUrl + 'goods/list/index', data);
	}
	
	//搜索商家列表结果接口 
	// keyword 搜索关键字  lat=>纬度，lng=>经度，cid=>分类id，可不传，默认所有分类展示，city=>城市id，不传默认所有城市，
	//order=>智能排序，选中传3 人气最高，选中传2 距离最近，选中传1 page=>页码，size=>每页显示条数，
	getSeaResult(keyword,lat,lng,cid,city,order,page = 1, size = 10,session = SessionKey,language = Langua){
		let data = {
			keyword,
			lat,
			lng,
			cid,
			city,
			order,
			page,
			size,
			session,
			language
		}
		return requestAll.postRequest(apiUrl + 'goods/list/listAjax', data);
	}
	
	//获取商家详情  goods_id：商家id 
	getMCDetail(goods_id,session = SessionKey,language = Langua){
		let data = {
			goods_id,
			session,
			language
		}
		return requestAll.postRequest(apiUrl + 'goods/list/detail', data);
	}
	
	//收藏/取消 (商家/帖子)
	//openid 用户openid,  type 1=》商家收藏  2=》帖子收藏,  object_id 商家id或帖子id
	collectPost(openid,type,object_id,session = SessionKey,language = Langua){
		let data = {
			openid,
			type,
			object_id,
			session,
			language
		}
		return requestAll.postRequest(apiUrl + 'user/index/collection_sub', data);
	}
	
	//获取狠优惠列表
	getDiscountList(page,size = 10,session = SessionKey,language = Langua){
		let data = {
			page,
			size,
			session,
			language
		}
		return requestAll.postRequest(apiUrl + 'portal/index/heji_sort_1', data);
	}
	
	//获取格调美食列表  lat=>纬度，lng=>经度，  page:页码  size:条数
	getStyleList(lat,lng,page,size = 10,session = SessionKey,language = Langua){
		let data = {
			lat,
			lng,
			page,
			size,
			session,
			language
		}
		return requestAll.postRequest(apiUrl + 'portal/index/heji_sort_2', data);
	}
	
	
	//获取社区列表 lang:社区语言  type:查询分类  1是综合，2是求助 
	getPostList(lang,type,keyword,page,size = 10,session = SessionKey,language = Langua){
		let data = {
			lang,
			type,
			keyword,
			page,
			size,
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'portal/list/listAjax', data);
	}
	
	//点赞、取消点赞 帖子/评论  object_id 	内容id    type 1:帖子,2:评论
	likePost(object_id,type,session = SessionKey,language = Langua){
		let data = {
			object_id,
			type,
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'portal/list/likePost', data);
	}
	
	//获取帖子详情 id:帖子详情 
	postDetial(id,session,language){
		let data = {
			id,
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'portal/list/detail', data);
	}
	
	//获取帖子评论 列表
	postComment(id,page,size = 10,session = SessionKey,language = Langua){
		let data = {
			id,
			page,
			size,
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'portal/list/detail_comment', data);
	}
	
	//评论帖子 object_id:帖子id  content:内容
	comPost(object_id,content,session = SessionKey,language = Langua){
		let data = {
			object_id,
			content,
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'portal/list/commentPost', data);
	}
	
	//回复评论 object_id:帖子id   parent_id:评论id(该帖子下的评论id) content:内容  to_user_id:被回复用户id
	postReply(object_id,parent_id,content,to_user_id,session = SessionKey,language = Langua){
		let data = {
			object_id,
			parent_id,
			content,
			to_user_id,
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'portal/list/replyPost', data);
	}
	
	//获取发帖的热门搜索  lang:语言选择  type：1:综合  2:求助 
	hotSearch(lang = Langua,type,session = SessionKey,language = Langua){
		let data = {
			lang,
			type,
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'portal/list/get_tag', data);
	}
	
	//发帖  title：标题  content：内容 type 1:综合 2：求助  imgs：图片 tag 标签
	addComment(title,content,type,imgs,tag,session = SessionKey,language = Langua){
		let data = {
			title,
			content,
			type,
			imgs,
			tag,
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'portal/list/sendPost', data);
	}
	
	
	//关于我们
	aboutUs(session = SessionKey,language = Langua){
		let data = {
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'portal/index/aboutus', data);
	}
	
	//获取用户发布帖子列表
	myPostList(user_id,page,size = 10,session = SessionKey,language = Langua){
		let data = {
			user_id,
			page,
			size,
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'portal/user/getMyPost', data);
	}
	
	//用户评论列表
	myCommentList(user_id,page,size = 10,session = SessionKey,language = Langua){
		let data = {
			user_id,
			page,
			size,
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'portal/user/getMyReply', data);
	}
	
	//收到的评论列表
	getMyComment(page,size = 10,session = SessionKey,language = Langua){
		let data = {
			page,
			size,
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'portal/user/getMyComment', data);
	}
	
	//获取用户的关注列表
	userAtten(page,size = 10,session = SessionKey,language = Langua){
		let data = {
			page,
			size,
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'portal/user/getMyFollow', data);
	}
	
	//获取用户的粉丝列表
	userFans(page,size = 10,session = SessionKey,language = Langua){
		let data = {
			page,
			size,
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'portal/user/getMyFans', data);
	}
	
	//关注用户
	attenUser(user_id,session = SessionKey,language = Langua){
		let data = {
			user_id,
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'portal/user/setFollow', data);
	}
	
	//取消关注用户
	cancelAttenUser(user_id,session = SessionKey,language = Langua){
		let data = {
			user_id,
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'portal/user/deleteFollow', data);
	}
	
	//获取用户收藏商家
	collectMerchant(page,size = 10,session = SessionKey,language = Langua){
		let data = {
			page,
			size,
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'user/index/collection_goods_list', data);
	}
	
	//获取用户收藏帖子
	userCollectPost(page,size = 10,session = SessionKey,language = Langua){
		let data = {
			page,
			size,
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'user/index/collection_post_list', data);
	}
	
	
	//用户浏览商家列表
	historymerChant(page,size = 10,session = SessionKey,language = Langua){
		let data = {
			page,
			size,
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'user/index/history_goods', data);
	}
	
	//用户浏览帖子列表
	historyPost(page,size = 10,session = SessionKey,language = Langua){
		let data = {
			page,
			size,
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'user/index/history_post', data);
	}
	
	//赞我的列表
	priseMeList(page,size = 10,session = SessionKey,language = Langua){
		let data = {
			page,
			size,
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'user/index/likeme', data);
	}
	
	
	//退出登录
	logOut(session,language){
		let data = {
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'wechat/login/logout', data); 
	}
	
	//获取用户关注和粉丝数  user_id：用户id 可以为空
	attenAndFans(user_id,session,language){
		let data = {
			user_id,
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'portal/user/getUserCenter', data); 
	}
	
	//获取系统消息
	systemInfo(session,language){
		let data = {
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'portal/user/mySystemMsg', data); 
	}
	
	//检测是否有新消息
	detectionMsg(session,language){
		let data = {
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'portal/user/check_new_msg', data); 
	}
	
	//删除帖子/评论  id: 	帖子或者评论id  type:1:帖子，2:评论
	delFile(id,type,session,language){
		let data = {
			id,
			type,
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'portal/list/delete_post', data); 
	}
	
	//设置成已读信息
	setIsRead(id,session,language){
		let data = {
			id,
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'portal/user/mySystemMsgRead', data); 
	}

	//文章列表
	article(session = SessionKey,language = Langua){
		let data = {
			session,
			language
		}
		return  requestAll.postRequest(apiUrl + 'portal/list/article', data); 
	}

	//文章详情
	articleDetail(session = SessionKey,language = Langua, id){
		let data = {
			session,
			language,
			id
		}
		return  requestAll.postRequest(apiUrl + 'portal/list/articleDetail', data); 
	}
	
	//获取旅游文章列表
	getTour(session,language,page,size = 10){
		let data = {
			session,
			language,
			page,
			size
		}
		return  requestAll.postRequest(apiUrl + 'portal/list/tour', data); 
	}
	
}

export default {
	api:api
}