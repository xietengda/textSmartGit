import requestAll from './request' // 此处，引入存放对promise处理的文件


const apiUrl = 'https://www.niuyg.com/'
const webUrl = 'https://img.niuyg.com/'
const baseUrl = apiUrl + '?act='
class api {
	
	//获取url补充静态资源
	getUrl() {
		return webUrl;
	}
	
	
	//登录
	login(code){
		let data ={
			code
		};
		return requestAll.getRequest(apiUrl + 'api/login/getsessionkey?source=2', data);
	}
	
	//验证sessionkey
	checkSessionKey(sessionkey,openid){ 
		let data = {
			sessionkey,
			openid
		}
		return requestAll.getRequest(apiUrl + 'api/login/validatekey?source=2', data);
	}
	
	//UV
	getUV(){
		let data = {};
		return requestAll.getRequest(apiUrl + 'home/visit/uv?source=2', data);
	}
	
	//PV
	getPV(){
		let data = {};
		return requestAll.getRequest(apiUrl + 'home/visit/PV?source=2', data);
	}
	
	
	//将用户信息传回后台
	postUserInfo(openid,nickname,gender,avatarUrl,language,city,province){
		let data = {
			openid,
			nickname,
			gender,
			avatarUrl,
			language,
			city,
			province
		}
		return requestAll.postRequest(apiUrl + 'api/login/getuserinfo?source=2', data);
	}
	
	//获取轮播图
	getBanner() {
		let data = {};
		return requestAll.getRequest(apiUrl + 'api/video/banner?source=2', data);
	}
	
	//获取专辑视频      special_category_id专辑分类(大类)
 	//special_id专辑id查询专辑内的视频列表 (小类)  获取所有专辑列表则所有的参数都为空
    //页码page     返回多少条per_page 
	getAlbumVideo (special_category_id = "",special_id = "",page = 1,per_page = 10){
		let data = {
			special_category_id,
			special_id,
			page,
			per_page
		}
		return requestAll.getRequest(apiUrl + 'api/video/special_video_list?source=2', data);
	}
	
	//获取精选视频   参数：专辑分类special_category_id   分页page   专辑视频列表special_id   首页视频   返回多少条per_page 
	getSelVideo (category_id = "",home_recommend = "",page = 1,per_page = 10){
		let data = {
			category_id,
			home_recommend,
			page,
			per_page
		}
		return requestAll.getRequest(apiUrl + 'api/video/video_list?source=2', data);
	}
	
	//获取专辑分类名称
	getAlbumType(){
		let data={}
		return requestAll.getRequest(apiUrl + 'api/video/special_category?source=2', data);
	}
	
	//获取视频分类名称
	getVideoType(){
		let data={}
		return requestAll.getRequest(apiUrl + 'api/video/video_category?source=2', data);
	}
	
	//获取咨询分类名称
	getEssayType(){
		let data = {};
		return requestAll.getRequest(apiUrl + 'api/article/article_category?source=2', data);
	}
	
	//获取咨询文章列表        文章分类的id：article_category_id，页数：page   页面显示条数per_page
	getEssayList(article_category_id,page,per_page=10){
		let data = {
			article_category_id,
			page,
			per_page
		};
		return requestAll.getRequest(apiUrl + 'api/article/article_list?source=2', data);
	}
	
	//获取文章详情    文章id：article_id，    openid
	getEssayDetial(article_id,openid){
		let data = {
			article_id,
			openid
		};
		return requestAll.getRequest(apiUrl + 'api/article/article_details?source=2', data);
	}
	
	//获取评论列表 openid  comment_type 1文章 2视频        id:视频或文章的ID   page:页码         per_page:页面返回条数
	getCommendList(openid,comment_type,id,page=1,per_page=10){
		let data = {
			openid,
			comment_type,
			id,
			page,
			per_page
		};
		return requestAll.getRequest(apiUrl + 'api/comment/comment_list?source=2', data);
	}
	
	
	//获取点赞数   openid   topic_type:视频或文章的类型,1文章，2视频      url_id:选择对应的文章和视频的ID
	getCommendZan(openid,topic_type,url_id){
		let data = {
			openid,
			topic_type,
			url_id
		};
		return requestAll.getRequest(apiUrl + 'api/comment/fabulous?source=2', data);
	}
	
	//添加收藏 openid   collection_type：收藏类型，1文章，2视频 ,3专辑             url_id：选择对应的文章和视频、专辑
	addCollect(openid,collection_type,url_id){
		let data = {
			openid,
			collection_type,
			url_id
		};
		return requestAll.postRequest(apiUrl + 'api/comment/collection_add?source=2', data);
	}
	
	//取消收藏 openid   collection_type：收藏类型，1文章，2视频 ,3专辑         url_id：选择对应的文章和视频、专辑
	getQXCollect(openid,collection_type,url_id){
		let data = {
			openid,
			collection_type,
			url_id
		};
		return requestAll.postRequest(apiUrl + 'api/comment/collection_del?source=2', data);
	}
	
	//点赞  openid   topic_type:视频或文章的类型,1文章，2视频      url_id:选择对应的文章和视频的ID
	getFabulous(openid,topic_type,url_id){
		let data = {
			openid,
			topic_type,
			url_id
		};
		return requestAll.postRequest(apiUrl + 'api/comment/fabulous_add?source=2', data);
	}
	
	//提交评论    openid      内容content    comment_type 1为文章，2为视频, source_id :文章/视频id parent_id:回复的id
	submitComment(openid,content,comment_type,source_id,parent_id = 0){
		let data = {
			openid,
			content,
			comment_type,
			source_id,
			parent_id
		};
		return requestAll.postRequest(apiUrl + 'api/comment/comment_add?source=2', data);
	}
	
	//回复评论      comment_id 评论ID   content回复内容  reply_openid回复（当前用户）   user_openid（发表评论用户的openid）
//	submitReply(comment_id,content,reply_openid,user_openid){
//		let data = {
//			comment_id,
//			content,
//			reply_openid,
//			user_openid
//		};
//		return requestAll.postRequest(apiUrl + 'api/comment/reply_comment?source=2', data);
//	}
	
	//删除评论 接收参数：id   评论ID
	delComment(id){
		let data = {
			id
		};
		return requestAll.getRequest(apiUrl + 'api/comment/comment_del?source=2', data);
	}
	
	//获取收藏  openid  collection_type 1文章 2视频 3专辑  page:页码  per_page：条数
	getCollect(openid,collection_type,page,per_page=10){
		let data = {
			openid,
			collection_type,
			page,
			per_page
		};
		return requestAll.getRequest(apiUrl + 'api/comment/collection?source=2', data);
	}
	
	//收到的评论   接收参数：当前用户的openid   页码  page   页面显示条数per_page   
	receiceComment(openid,page,per_page = 10){
		let data = {
			openid,
			page,
			per_page
		};
		return requestAll.getRequest(apiUrl + 'api/comment/received_comment?source=2', data);
	}
	
	//发出的评论   接收参数：当前用户的openid  页码  page   页面显示条数per_page   
	issueComment(openid,page,per_page = 10){
		let data = {
			openid,
			page,
			per_page
		};
		return requestAll.getRequest(apiUrl + 'api/comment/my_comment?source=2', data);
	}
	
	//搜索关键字排行榜  keyword：搜索关键字  （只要搜索一次就请求一次）
	searchVisit(keyword){
		let data={
			keyword
		};
		return requestAll.getRequest(apiUrl + 'api/moresearch/keyword_visit?source=2', data);
	}
	
	//热门搜索
	getHotsearch(){
		let data={};
		return requestAll.getRequest(apiUrl + 'home/visit/keyword_hot?source=2', data);
	}
	
	//获取搜索结果  keyword: 搜索关键字 type:1视频 2:文章   page :页码   per_page:条数
	getSearchRes(keyword,type,page,per_page = 10){
		let data={
			keyword,
			type,
			page,
			per_page
		};
		return requestAll.getRequest(apiUrl + 'api/moresearch/search?source=2', data);
	}
	
	//获取视频详情   openid    视频id: id   专辑：special_id   条数：page_num
	getVideoDetial(openid,id,special_id,page_num){
		let data={
			openid,
			id,
			special_id,
			page_num
		};
		return requestAll.getRequest(apiUrl + 'api/video/video_details?source=2', data);
	}
	
	//视频排名，传视频ID和PC端状态，视频video_id,来源source 1PC　２小程序
	videoVisit(video_id){
		let data={
			video_id
		};
		return requestAll.getRequest(apiUrl + 'home/visit/video_visit?source=2', data);
	}
	
	//视频排名，传视频ID和PC端状态，视频article_id,来源source 1PC　２小程序
	articleVisit(article_id){
		let data={
			article_id
		};
		return requestAll.getRequest(apiUrl + 'home/visit/article_visit?source=2', data);
	}
	
	
	//未读消息 openid 
	unreadMsg(openid){
		let data={
			openid
		};
		return requestAll.getRequest(apiUrl + 'api/comment/message?source=2', data);
	}
	
	//获取小程序码   page:页面url    scene：访问带的页面的参数
	getProgramCode(page,scene){
		let data={
			page,
			scene
		};
		return requestAll.getRquestUrl(apiUrl + 'api/login/qrcode', data);
	}
	
}

export default {
	api:api
}