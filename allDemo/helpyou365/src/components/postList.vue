<template>
	<div class="postCn" :class="[isIphonex ? 'ixBtm':'']" v-if="postList.length != 0">
		<div class="poList" v-for='(item,key1) in postList' :key="postList">
			<div class="poTop div_float">
				<div class="headView">
					<img class="headImg" :src="item.avatar" :data-author-id='item.user_id' @click="goPerson" />
					<span class="hgIcon shengjIcon" v-if='item.recommended == 1'></span>
				</div>
				<div class="poMsg">
					<div class="poSub">
						<div class="m1">{{item.user_nickname}}
							<!--<span class="zhid" v-if='item.is_top == 1'>{{language.mpTop}}</span><span class="jing" v-if='item.recommended == 1'>{{language.mpBest}}</span>-->
							<span class="zhidIcon" v-if='item.is_top == 1'></span>
							<!--<span class="shengjIcon" ></span>-->
						</div>
						<div class="m2">{{item.published_time}}</div>
					</div>
				</div>
				<!--帖子的删除和关注作者操作-->
				<div class="poCaoz">
					<div class="poDel" v-if="showDel" @click="postDel" :data-post-id='item.id' :data-post-index='key1'>{{language.mpDelete}}</div>
					<div class="poAtten" :data-user-id='item.user_id'  v-if="showAtten && userid != item.user_id && item.user_isfollow == 0" @click="attenUser"><span>+</span><span>{{language.mAtten}}</span></div>
				</div>
			</div>
			<!--如果是详情接触限值4行，不现实全文按钮-->
			<div class="poCn" :class="[essayDetail?'':'eli_four']"   :data-post-id='item.id' @tap="goEassDetial" >{{item.post_content}}</div>   <!----{{item.pLength}}-->
			<!--全文长度大于96个出现“全文”按钮-->
			<div class="allText" :data-post-id='item.id' @tap="goEassDetial" v-if="!essayDetail && item.conLength > 96">{{language.mpAllText}}</div>
			
			<div class="imgView" :class="[item.pLength == 2 || item.pLength == 4 ? 'imgView':'imgViewOther']">
				<!--判断图片显示样式 sType: cro 横向  row 竖向 squ 正方形-->
				<!--横向图片  1张-->
				<div class="imgCro" v-if="item.sType =='cro'">
					<image :data-p-id='key1' :data-s-index='imgIndex' :key='img' @click='lookImg' v-for='(img,imgIndex) in item.photos' :src="img" mode="widthFix" />
				</div>
				<!--竖向图片 1张-->
				<div class="imgRow" v-else-if="item.sType =='row'">
					<image :data-p-id='key1' :data-s-index='imgIndex' :key='img' @click='lookImg' v-for='(img,imgIndex) in item.photos' :src="img" />
				</div>
				<!--正方形 1张-->
				<div class="imgSquare" v-else-if="item.sType =='squ'">
					<image :data-p-id='key1' :data-s-index='imgIndex' :key='img'  @click='lookImg' v-for='(img,imgIndex) in item.photos' :src="img" />
				</div>
				<!--正方形 3.5.6.7.8.9张-->
				<div class="imgSquare3 div_float" v-else-if="item.pLength != 1 || item.pLength != 2 || item.pLength != 4">
					<image :data-p-id='key1' :data-s-index='imgIndex' :key='img'  @click='lookImg' v-for='(img,imgIndex) in item.photos' :src="img" />
				</div>
				<!--正方形 2.4张-->
				<div class="imgSquare2 div_float" v-else-if="item.pLength == 2 || item.pLength == 4">
					<image :data-p-id='key1' :data-s-index='imgIndex' :key='img'  @click='lookImg' v-for='(img,imgIndex) in item.photos' :src="img" />
				</div>
			</div>
			
			

			<!--标签-->
			<div class="poLabel div_float">
				<div v-if="item.tag != '' && item.tag != null"><span class="labelIcon"></span>{{item.tag}}</div>
			</div>
			
			<!--操作-->
			<div class="poOper div_float" v-if="!noPeration">
				<div class="poL div_float">
					<span class="dianzan" :class="[item.user_islike == 1 ? 'ydzIcon':'dzIcon']" :data-p-index='key1'  @click="clickDianz" :data-post-id='item.id'></span>
					<div class="dzImg div_float" :class="[item.HeadLength == 1?'dzImg1':'']" v-if='item.HeadLength == 1'>
						<image v-for='hImg in item.userlike_avatar' :key="hImg" :src="hImg" />
					</div>
					<div class="dzImg div_float" :class="[item.HeadLength == 2?'dzImg2':'']" v-if='item.HeadLength == 2'>
						<image v-for='hImg in item.userlike_avatar' :key="hImg" :src="hImg" />
					</div>
					<div class="dzImg div_float" v-if='item.HeadLength == 3'>
						<image v-for='hImg in item.userlike_avatar' :key="hImg" :src="hImg" />
					</div>
					<div class="dzRs">{{item.post_like}}{{language.mpPraise}}</div>
				</div>
				<div class="poR">
					<div class="poShare shareIcon">
						<button open-type='share' :data-post-id='item.id'></button>
					</div>
					<div class="poCom" :data-post-id='item.id' @tap="goEassDetial"><span class="msgIcon"></span>{{item.comment_count}}</div>
					<div class="poCollect " :class="item.user_iscollect == 1 ? 'collectIcon':'notCollect'" :data-p-index='key1'   :data-post-id='item.id' @click="clickCollect" ></div>
				</div>
			</div>
			
			<!--浏览和点赞-->
			<div class="browseView div_float" v-if="noPeration">
				<div class="browse">{{language.pdBrowse}} {{item.post_hits}}</div>
				<div class="like" @click="clickDianz" :data-post-id='item.id'><span :class="item.user_islike == 1 ? 'ydzIcon':'dzIcon'"></span>{{item.post_like}}</div>
			</div>
			
			
			<!--评论-->
			<div class="poComCn" v-if="!noComment && item.comment_count != 0 ">
				<!--parent_id为0的话就是评论-->
				<div class="poComLi" v-for='com in item.comment':key='com' v-if="com.parent_id == 0"><span class="blueT">{{com.user_name}}</span>：{{com.content}}</div>
				<!--回复-->
				<div class="poComLi"  v-for='com in item.comment' :key='com' v-if="com.parent_id != 0"><span class="blueT">{{com.user_name}}</span>{{language.pdReplyText}}<span class="blueT">{{com.to_user_name}}</span>：{{com.content}}</div>
				<div class="checkMore" :data-post-id='item.id' @click="lookMore">{{language.pdMoreText}}</div>
			</div>

		</div>
	</div>
	
	
	<div class="atlasNull" v-else>
		<div class="icon nullPhoto"></div>
		<div class="til">{{language.pdNullPost}}</div>
	</div>
	
</template>

<script>
	export default {
		data() {
			return {
				userid:wx.getStorageSync('userId'),//登陆用户id
			}
		},
		props:[
			'postList',
//			'poLabel',
			'noPeration',//没有操作（列表将不显示转发/评论/点赞按钮）
			'noComment',//不显示列表
			'showAtten',//显示右上角的关注按钮
			'showDel',//显示右上角删除
			'language',//显示语言
			'essayDetail',//是否是详情页面
		],
		components: {
		},
		computed:{
            isIphonex(){
                return this.$store.store.state.isIphonex
            },
       	},
		methods: {
			//查看个人信息
			goPerson(e){
				this.$emit('checkPerson',e);
			},
			//点击查看帖子
			goEassDetial(e){
				this.$emit('eassDetial',e);
			},
			//查看更多评论
			lookMore(e){
				this.$emit('checkMore',e);
			},
			//点击收藏
			clickCollect(e,){
				this.$emit('collectPost',e)
			},
			//点击点赞
			clickDianz(e){
				this.$emit('postDianz',e);
			},
			//删除帖子
			postDel(e){
				this.$emit('deletePost',e);
			},
			//点击查看图片
			lookImg(e){
				this.$emit('checkImg',e);
			},
			//关注用户
			attenUser(e){
				this.$emit('attenPerson',e);
			}
		}, 

		created() {}
	}
</script>

<style scoped>
	.poDetailCn .poList{
		padding-bottom: 0;
		margin-bottom: 0;
	}
	.browseView .like>span{
		width: 36rpx;
		height: 35rpx;
		display: inline-block;
		vertical-align: middle;
		margin-right: 10rpx;
		margin-top: -12rpx;
	}
	.browseView .like{
		float: right;
		color: #7a7a7a;
		font-size: 28rpx;
	}
	.browseView .browse{
		float: left;
		color: #7a7a7a;
		font-size: 28rpx;
	}
	.browseView{
		height: 70rpx;
		line-height: 70rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	.poCaoz .poAtten span:nth-child(1){
		font-size: 30rpx;
	}
	.poCaoz .poAtten{
		width:125rpx;
		height:50rpx;
		border-radius:30rpx;
		border:2rpx solid #eeeeee;
		color:#f90000;
		text-align:center;
		line-height:47rpx;
		vertical-align:middle;
		font-size: 0;
	}
	.poCaoz .poAtten>span{
		font-size:24rpx;
	}
	.poCaoz .poDel{
		width: 125rpx;
		height: 50rpx;
		border-radius: 30rpx;
		border: 2rpx solid #eeeeee;
		color: #7a7a7a;
		font-size: 24rpx;
		text-align: center;
		line-height: 50rpx;
		vertical-align:middle;
	}
	.poCaoz>div{
		display: inline-block;
	}
	.poCaoz{
		display:inline-block;
		vertical-align:middle;
	}
	.poComCn .checkMore {
		font-size: 26rpx;
		color: #666;
	}
	
	.blueT {
		color: #557694;
	}
	
	.poComCn span {
		margin: 0 5rpx;
	}
	
	.poComCn .poComLi {
		height: 50rpx;
		line-height: 50rpx;
		font-size: 26rpx;
		color: #000;
	}
	
	.poCollect {
		width: 36rpx;
		height: 35rpx;
		margin-top: 4rpx !important;
	}
	
	.poR .poCom>span {
		display: inline-block;
		vertical-align: middle;
		margin-top: -1rpx;
		width: 32rpx;
		height: 35rpx;
		margin-right: 12rpx;
	}
	.poR .poCom .msgIcon{
		width: 35rpx;
		height: 37rpx;
	}
	.poR .poCom {
		line-height: 40rpx;
		color: #333333;
		font-size: 28rpx;
		margin-top: 1rpx !important;
	}
	
	.poR .poShare button {
		position: absolute;
		width: 28rpx;
		height: 28rpx;
		top: 0;
		left: 0;
		padding: 0;
		opacity: 0;
	}
	
	.poR .poShare {
		position: relative;
		width: 35rpx;
		height: 35rpx;
		margin-top: 6rpx !important;
	}
	
	.poR>div {
		float: left;
		margin: 0 15rpx;
	}
	
	.poR {
		float: right;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 0;
	}
	
	.poL .dzRs {
		float: left;
		color: #797979;
		font-size: 28rpx;
		margin-left: 15rpx;
	}
	.dzImg2{
		width: 65rpx !important;
	}
	.dzImg1{
		width: 30rpx !important;
	}
	.poL .dzImg image:nth-child(3) {
		left: 65rpx
	}
	
	.poL .dzImg image:nth-child(2) {
		left: 32rpx
	}
	
	.poL .dzImg image {
		position: absolute;
		width: 37rpx;
		height: 37rpx;
		border-radius: 100%;
	}
	
	.poL .dzImg {
		float: left;
		position: relative;
		width: 110rpx;
		height: 40rpx;
	}
	
	.poL .dianzan {
		float: left;
		width: 36rpx;
		height: 36rpx;
		margin-right: 14rpx;
	}
	
	.poOper .poL {
		float: left;
		height: 40rpx;
		line-height: 40rpx;
	}
	
	.poOper {
		margin: 30rpx 0;
	}
	
	.poLabel>div>span {
		display: inline-block;
		vertical-align: middle;
		width: 26rpx;
		height: 30rpx;
		margin-top: -5rpx;
		margin-right: 10rpx;
		margin-left: 10rpx;
	}
	
	.poLabel>div {
		padding: 0 20rpx;
		height: 48rpx;
		line-height: 48rpx;
		font-size: 24rpx;
		color: #323332;
		float: left;
		margin-right: 20rpx;
		margin-bottom: 15rpx;
		border-radius: 25rpx;
		margin-top: 15rpx;
		background-color: #f3f3f3;
	}
	
	.poLabel {
		margin-top: 20rpx;
	}
	
	.imgSquare3 image {
		display: inline-block;
		width: 213rpx;
		height: 213rpx;
		margin-right: 10rpx;
		margin-bottom: 10rpx;
	}
	
	/*.imgSquare3 image:nth-child(3),
	.imgSquare3 image:nth-child(6) {
		margin-right: 0 !important;
	}*/
	
	.imgSquare2 image {
		display: inline-block;
		width: 213rpx;
		height: 213rpx;
		margin-right: 16rpx;
		margin-bottom: 20rpx;
	}
	
	.imgSquare2 {
		width: 460rpx !important;
		font-size: 0;
	}
	
	.imgSquare image {
		width: 335rpx !important;
		height: 335rpx;
	}
	
	.imgRow image {
		width: 335rpx;
		max-height: 440rpx;
	}
	
	.imgCro image {
		width: 442rpx;
		height: auto;
		display: block;
	}
	.imgViewOther{
		width: auto !important;
	}
	.imgView {
		width: 460rpx;
		margin-top: 20rpx;
	}
	.imgView>div{
		font-size: 0;
	}
	
	.allText {
		color: #F90000;
		font-size: 28rpx;
		margin: 10rpx 0;
	}
	
	.poCn {
		color: #666666;
		font-size: 28rpx;
		margin: 10rpx 0;
		clear: both;
	}
	
	
	
	.poSub .m2 {
		color: #999999;
		font-size: 24rpx;
	}
	
	.poSub .m1 span{
		display: inline-block;
		width: 60rpx;
		height: 45rpx;
		margin: 0 5rpx;
		vertical-align: middle;
	}
	.poSub .m1 {
		color: #333333;
		font-size: 32rpx;
	}
	
	.poSub {
		display: inline-block;
		vertical-align: middle;
		line-height: 45rpx;
	}
	
	.poMsg {
		display: inline-block;
		vertical-align: middle;
		margin-left: 23rpx;
		/*height: 126rpx;
		line-height: 126rpx;*/
		width: 420rpx;
	}
	
	.headImg {
		display: inline-block;
		vertical-align: middle;
		width: 100rpx;
		height: 100rpx;
		border-radius: 100%;
		margin-top: 13rpx;
	}
	.hgIcon{
		position: absolute;
		width: 60rpx;
		height: 60rpx;
		display: inline-block;
		/*border: 1px solid red;*/
		right: -20rpx;
		top: -18rpx;
		border-radius: 100%;
	}
	.headView{
		position: relative;
		display: inline-block;
		vertical-align: middle;
	}
	
	.poTop {
		padding: 20rpx 0;
		position: relative;
	}
	
	.poList {
		padding: 0 5%;
		margin-bottom: 20rpx;
		padding-bottom: 40rpx;
		background-color: #FFFFFF;
	}
	
	.postCn {
		/*margin-top: 30rpx;*/
		background-color: #F5F5F5;
		padding-bottom: 20rpx;
	}
	
	.zhidIcon{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAgCAYAAABts0pHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowZDQyMzc5NS03ZjAwLTg4NGMtYmNhNy1mYWEwNjlhZTg3ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NkRGOUIzMzRENjlEMTFFODgwQUY4MzlDRkM5OUI1OTIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NkRGOUIzMzNENjlEMTFFODgwQUY4MzlDRkM5OUI1OTIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OGE3NTI5MDUtNGJjZi1mNTQ3LWIwOTUtZTliYTIzNTQyYTk2IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YTRlZTlkMmQtZDY4YS0xMWU4LWJmMzItOGQ3NjU4MDc0NWMxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Dcue3AAABEVJREFUeNrMWNtvFFUc/s5c9tZCirSEFjEWCpZKNMSoUfqAJmiCr1brhRDoC9FEIoY/QOXNS728+CYQk8YSiEZDYlOh1FAxDYJIk1J8QEpopUKBstvZ2Z05fnOh1NLdzuxut/ySLztn5syZ7/zuZ4WUErOJPXYKxrFtgBrhSCCENBMvEu8TWYQUmZlA9MkPoa1+Ne88Ld8C9tUBEg/13Y3Et0QdsZbYSYyHIm4SqbE55ylzPg2OFqKLqPPHrxB9xIaQ6wQysILSyLu+phMz7jcSvcRWlFhKQfxj4tM8eqokDhCfEfr9QDxOdBDvBZy/i+giHlxI4jXEEaI15HubiJPE8wtB3MkWPT6JQmQF8ROxu5zEnXR3nGgqUmFOGv6E+IZYNN/EX/Z9dHkJk8MbxC+FKCIo8XeIzlnSXSnkceKEr5iSEXdSXDvxedi6H1KqiIN+atWC+lqO2uuUffqhjbc5uua0L5hfcZqLXSz51f43k3k1mqvJkpP/KNalI3EINYVyim0mlOXNhlLVaBXWZKVG12TO79sDRc86+ysb8Uwyocdq9pH4scKIG+O11sXetpDdYdEi0yTVMNzPy8KIu6GoAeUm7kaSKCY4Z1vQzhFS4m5Au3Okf2/mpi3/GXI8D1nBAtiPeXNJA0TlSp5pDJLL8M24+3X739Ns/ic8wooOpaYRIraUMTIC+9oFTrGnkq5azToTrXLnyeQo7OtDvJYFJdpgxBme2qpW6I9scwmLRC3sG4Mka8H4+TXYowNQlz2K2OYOKIvqYSeH+bsK1shxGN1vMkPxRKMJRF84DBFfRtJXoFStQ3ZoP4yeNiomPPlglZNdtHl6L27vXwPz1AcMoAlMHnoaqc7HqNUBKBWViG35gQRspA6uR6qjCZPfPQul+gnEnvvacw+SE3olMmfakTywHumeHdAat0Ot3eS50Lx3h/Jev1VXboGyuB7G0Taa/2931ezl32H27YH68EtQHmiYig9pSWYsvnb1T8/V9Yp71yw5cTEtEP1rx8qO2aVxA/bNQe+Mw/siQnLXz3lTKx7yg9uEuuIZRDe+RQsdorsNwRrtLShItZLkXivlak6oCchs0tuUDdc17vxj4G6SQa0uaXJCGtbF72Ge+YgbvrUwxAVtZo84WtOhrW2F2f/lFBF93XYve4yfc20rtAqYZ79Cum+vaxFRRJ3QCmIqpv2HwBWskd+Q+aMd0eYvoC7dQP/9FVp9C31/M4yuFsCYBCLefKGqHulI8SeRcNq9+RfNfJi+nflfEUqf2E3CJ6E3vM6S3Qp5e5iZ5yn6cL/n94yF7KUfqf0Bb98oI3FXu8PdJN49FYTTq2D2fCeyg53eWPpuoN9NR+mjO710oM03cTlL+rvTw8iAq8kZ7QGQP/3JYokLtrJu8OiZsra1thmBosx5aMl5kIBlxGTqSl1ZSbsatxURrxmDvvhWYcTvc/lPgAEAvepzsUQSAwQAAAAASUVORK5CYII=');
		background-size: 100% 100%;
	}
	
	.shengjIcon{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAReElEQVR4Xu2dbagdRxnHZ2bP+57aFuwHRWkDvYEitulL2lv7ktQPIgo2/aBVP9gbWz8p9lYoRbA0kYIUhUZFEKwkBaEo1VSEglDITa20pmnTKljIDaQtaPpqEnLP++6O7J57bs8995yzs3Oe3bM7+z8fk5ln5vk987/zPssZfiAAAhMJcLABARCYTAACQesAgSkEIBA0DxCAQNAGQECPAHoQPW7IlRMCEEhOAg039QhAIHrckCsnBCCQnAQabuoRgED0uCFXTghAIDkJNNzUIwCB6HFDrpwQgEByEmi4qUcAAtHjhlw5IQCB5CTQcFOPAASixw25ckIAAslJoOGmHgEIRI8bcuWEAASSk0DDTT0CEIgeN+TKCQEIJCeBhpt6BCAQPW7IlRMCEEhOAg039QhAIHrckCsnBCCQnAQabuoRgED0uCFXTghAIDkJNNzUIwCB6HFDrpwQgEByEmi4qUcAAtHjhlw5IQCB5CTQcFOPAASixw25ckIAAslJoOGmHgEIRI8bcuWEAASSk0DDTT0CEIgeN+TKCQEIJCeBhpt6BCAQPW7IlRMCEEhOAg039QhAIHrckCsnBCCQnAQabuoRgED0uCFXTghAIDkJNNzUIwCB6HFDrpwQgEByEmi4qUcAAtHjhlw5IQCB5CTQcFOPAASixw25ckIg9QKRp9klfBs7l5N4wM2UEUilQFqrbLfHrPsZY3sGvCST57hkz4iit7+6jb2ZMo6ojqEEUiUQv7do9sTjjPOl6bzlPnvB229oTOBWigikSiCNVevwcK8xjRNn8oHagncgRSxRFQMJpEYgzVWxLBl/PApjKd1r69vZa1HyIC0IRCGQGoE0TorTjPMrolSeMfZne8HdmKdEzIvkIBBKIBUCWZ+UHwmt7ZgE9oKbCh906o486SeQisalM7waoBXMvaO6wFbSjxo1zCKBVAiksSr2McYf0QEIgehQQx5VAukQyCm2h8lgBSvyTxTcbdgXiYwNGRQJpEIgrdPsCs+xTivWeSiZfMte8KJO7KMXgxy5JZAKgfj0GyfFIcb5PVEigb2QKLSQVodAagTi9yKuI17jjF+s5IiUr9vbvR1KaRUTBT1ZTzwief+IC2d8hXH3SftK9oyiCdJkfn1kT9wpOd8tGbukXyd2jku5Ui16T+KMGinuscZSIxC/dmsn2Q7GxUqoSKR8vVb0dlM2kLWT1hLn7OBYSlIesrd7e+MPR78ElSM3wdm0ZuFv9jXdryRVrzyWkyqB+AHo9yTWIc7YrvEBkftrBe8ArTjYDs6tE9MaQFLDOf+PBGficNimKe8KJj8oM2a5rVqtdRW/jr2VxwYct8+pE8jA4UkT9zg2BpXmP1K+aW/3tsUZkPWe40SYOII6vFdmzBH96kAksYUltQIJhlyr1spoTxLH+au1VXGWMx6M8af94l5SXlu1jnDGdofVg7Usxs6WNier9k7YN3auC82LBJEIpFsgp8QBLrl/L2TjF8dQp7Eq3mSMXx5GLg5xbvSY/TswocdtuMeY926Fcbk1dOLi9m3VHc4LYX7g/9UJpFsg4yfO5AcUG6uWv0p15zRsksnz9QUvtJdRR785pdIwz89yocDYheLYYnjNfaa2s3WXbh2QbyuBlAtk/OS5VnAvpZykqx2WlPvtBW9fXI1I6TSzfy7z3crEKsiid67+uealcdUxj3ZTLRA/II1VS44GJpZh1rSNyhiWlUd9GufnaBp/1cpfvZr0g0DoJZwBgYyZH8S0orQ2Mufxh1WcsQPUy8rjwhgmkI1l3SltAALJoUDGrWT5GKRke+vb3UOUSIZXkeJesdrag4QsFLxTZsyb3HsETDDEomwOga0M9CATJtDEvcjoPCSO/ZZp0Zu2UMAbBSbPj5+YD9uUZecf9cX2InkrybHBDAhk8l0RyrnIcO8R94rVuPY26ajLtGXdLXZqvS/bOzvP5rg9k7ueaYH455GsgnftrPdBRm80SsaO1hfc8A074nCM24+R5wuMNxR6DwyviKPRN5dpgQTjbsZW6gvuHbp01k8RnxjeSZ+XQIJzWMNnwnqcsfcnL+sOfJZcSrve2IbzWLqtYHK+1Askzj2K9bNPRxjnm47Nz0sgfn0ajjg9EGvYsm7wB4JLKSu9b1x0Y/f39M0DFg0RSPRVrUni6PdK8lx9wUt8w23TbnpHMPZheWoL5QW3ZVnuYnmx+0805XgIGCOQYLwo5XJtu/fzMFTrF6P8I+UTL1wlvYq1paectKxreV1e8N4WRfmryvUdvCwZFuwZ/98ogQzmJBZz9497CijoNRxxv2RsOez0bpKvpYwOrYbPW2FvY8YWPmN24wSywUNK/wX4Fcb7L8FLxncrHSVfN0C5hBwWo8ZJ4d8BCXqz0WVdq957AD1FGMH4/t9cgczIbNbVMdXiGyfFwU2v2Z8tMtYq9LMXvA/sW5qXqdpCOnoCEMgUpnEPs0bFMXreStjOd6o3tJ+gDzssqhJIvUAaMzwqpwphUro4e5EtPYc/DBw+rSs8x76tGb5DOKuTyD+VQPoFMsOzpBSxp56LTFxeHrlGi3NVFNGb3QYEosCQ6uSwv5TrMnF4dAXNn5hL/xGGodO6uD6rEJgEkmRAIOHXYRPgNNPx+vUXWvyPA43/lsnoNVoMr5IIqVIZqRfIpPsgSt4RJ/LnJEy6D6h+1Wr4pcaJ+y4uD3qPTY8wlL0z9mLzk8TVhzkNAqkXyPAegYZ/sWQJhMLZIctyj46eJPYPHAomdnmc71Had/mwxFjH2lzPivNX+6b2F2OpPIxGIpB+gYy5kx7JwwQSB8+AKryrNVqVSddosTmYQNAUi0i1QLYc/1Z0KjPJhl9HHKo0BJKeCKZcIFMelE4PQ72ajHsdcd1Sody9Bid09bBS50q3QMa8rEgNYB72wq7R2rvWUh2XeTCbV5mpDkSaVrAoAxR2jRYCoaQ9m61UCyTsrajZXJ9T7pDXEYNa4fGFOQVna7GpFcg8z2DFGR2Va7RxT9Llq+zyplv5NeuILzBXBI9tyYI8V6g4+3G0fnP0UyuQ0VcO42y0SdlWeR1xvQf5pb2z8/046hWcBftP9b/Mtapj7dec39o72/fFUXYWbaZWIGncIJw5wAqvIwZllJ1/24vtz8xc3hgDjWPlV1mreO002zgH9hGdVApE/7PQcTQpGpuqryMGpVluy761VaMp+SMrwdDqQj24YTntx8vOqdpieyEsXR7+P5UCacz5iDt14MOWdceVF8df8fYr5WV3regfmpz6wz34lPcgSt/KCItymv5/+BqtYr3i+CsOgSjCH0qWuh5E7aG46I7OLYfi64hJ9SJrz9sel3x63PG9w41wpE4go+/kzq1hExWssqw7sagYvl7beKHanLiCtV6ROIZ3RDgTN5M6gfgEgneietYextnS5O+lJ84qeoEKryOGGi05p+ybZ58wXzhWult0rYNh4mBY5t0UklQKZLiG/RUtscQYW1L5Em1og0sygeqyblidit6ZWqV5s+7j1M1j1T95bXHX4FKW/54vq7jP8464hXmi/8ZQ0XtHlLyH8YrK5mCkXiCbxOJ/KlmKJcb5PWFtau7/P+VrtFp1E55j1dwHo+x0Xzhe+Y1oiaUNEQyGUHb34eoN3Ue16pGzTJkSyCA2/hCs5Ygl/wnRVPYq467REjUs/0iILLtP10X70XE9SuvV4r1uT3yXd63PjgrDr0Icq2NErqXSTCYFkvpeRWNZV6d1BEMli50PGj7zasyxStPs+OmLpd4O3DVRp515gQz3Kk1HLM97rqJ83ko9RmQp8dZWdJTGCGTYdf97f/NaAZtpWTd6/CLlwPJtJFxBYiMFMsAQ3GlnYjmxSf2Ua7TRQ0OcA08JaQE1WiADIoOl4vXvglysRSok07jXEeMoR9cmr7hP1W5qfVM3f17z5UIgiax+US/rUrdI3FLUIporgYzOUziX+0iWiVWu0WqFhy5TUvfc/SX4ztnytxxH3BWM4YX7oih4z1Z3OC/QeZOcpdwKZIDYv9orpbU805GWca8jJhdDpZKSEMjaseoR1ha7xh6GLDmnRNXZmzWh5F4gG/OU4OV1a19UoaR5WXdYOXEKJLiI1ay+EXbOK4ufrIZARv7+9j9REEEoE15HVPqznmAir9r9elzfUl97sfY+74qPq7jji8T6WOf2rPQkEMiEqKoIJdI1WpXWE2eamB7EbrxceYI1C/dGqXqWjrtAICGR7T8/JA6MTuZ1rtFGaUTkaYXn1JzmZfwOdo7S9trf7bPc4ZdEtZmVTUsIRDGy/d15eYAzHuyjhL2OqGg22WQx3BRsHK1LLSdqvdieNtKqz4RMEEgEmsGbUo5Ylg7/AX+velGErOlJSnghqvMvdrXzv/rrOs7JqnO0fmN7t07eJPNAIBq0W68VbvXapT+wjviERvb5Zyl6Z0St+7VZJ8r+RSzZsoL9jqg/CCQqsQymD14JaVo/HXfvIhPulJxTXpGtMM97TmWFy7+2azHrbumy62VPfDr08YcpEOJ+XpWKP3oQApJrxyorrG3dPkuDIajG7CYK3ppk3Bk1xKX82OAN39kLYcxf6rXrjW26V4gp6qBqAwJRJRWSzh92uc3SX3hPRF7RIapCZsxkZXjlA4VAiJuVvy8gW9a3M9+bEHMZmMvaq40QSAwNITh60a29mNlJvCoTy+vKgvcSt+RjTLJHwx7FZmXvTK2k/zqLarUo00EglDRHbDWPl37iNYsPGdWbCM+RRe8Vbskf2zs7zw673DpeuU867CHZKVw5/O9+r8GL3h+z+FkFCCRGgfimTelNojbyzkulqx2Lf2pURDHjJjcPgZAjHW8wq3MT/9yUK7wfqSwDJ4Qy0WIgkARxZ2qly39psdb96qybiQnijaUoCCQWrNON+vsmvFXYNYeiQ4v0h1JWyXsQT5D2UUEgoU0mngTBY9Kdwu9SswsvPIdXnZ/Vbuj+MB6Ps2kVAplj3PwJfKtbeW501SfpKvkPytml9t1Z2NlOmg0EkjTxMeXNawLPC27LLbp78zoBVwk9BKJCKYE0jRPWl3iz9LR0JnyemboO1d6JWqPzeeoLVNTVnLc9CGTeERgpX+UzzbNU2T8oKGq9xzDXUKMIgahxSjRV43j5F7JZ+B71Drw/pLIsdxGvu6uHEwJRZ5VoyuDuRc86SDXk4kX37WqldTsm4tHCCIFE45VoarJVrhjuoicKYo6FQSBzhK9adPPl6mHZtPaopt+UjvAOulb5Gc8EgWQkgP6Qi7eLT0Wal0AcM0cXApkZYXIGgiFXq/qG0rwE4iAJDARCgjFZI82XKqtTd98hDrKAQCBkKJM1NGlegu8Q0sYBAqHlmai1LTcWC94H9i3NyxKthOGFQSAZD/Bg8i4sr12ttq7CPgdtQCEQWp5zseZP3tec0iIOHdLjh0DomcKiQQQgEIOCCVfoCUAg9Exh0SACEIhBwYQr9AQgEHqmsGgQAQjEoGDCFXoCEAg9U1g0iAAEYlAw4Qo9AQiEniksGkQAAjEomHCFngAEQs8UFg0iAIEYFEy4Qk8AAqFnCosGEYBADAomXKEnAIHQM4VFgwhAIAYFE67QE4BA6JnCokEEIBCDgglX6AlAIPRMYdEgAhCIQcGEK/QEIBB6prBoEAEIxKBgwhV6AhAIPVNYNIgABGJQMOEKPQEIhJ4pLBpEAAIxKJhwhZ4ABELPFBYNIgCBGBRMuEJPAAKhZwqLBhGAQAwKJlyhJwCB0DOFRYMIQCAGBROu0BOAQOiZwqJBBCAQg4IJV+gJQCD0TGHRIAIQiEHBhCv0BCAQeqawaBABCMSgYMIVegIQCD1TWDSIAARiUDDhCj0BCISeKSwaRAACMSiYcIWeAARCzxQWDSIAgRgUTLhCTwACoWcKiwYRgEAMCiZcoScAgdAzhUWDCEAgBgUTrtATgEDomcKiQQQgEIOCCVfoCUAg9Exh0SACEIhBwYQr9AQgEHqmsGgQgf8DAz8QIzwYyQwAAAAASUVORK5CYII=');
		background-size: 100% 100%;
	}
</style>