<template>
  <div class="container" :class="[showDis ? 'fixedView':'']">
			
			<!--轮播图-->
			<div class="bannerView">
				<swiper class='banner' @change='bannerChange'>
				    <swiper-item v-for='(item,key) in bannerList' :key='key'>
				      <img src="../../../static/images/list1.png" class="slide-image"/>
				    </swiper-item>
				</swiper>
				<div class="pageTion">
		    	<span v-for='(item,key) in bannerList' :key='key' :class="[bSel == key ? 'sel':'']"></span>
		    </div>
			</div>
			
			<!--标题-->
			<div class="proTil">
				<div class="til">超级无敌蛇皮棒棒鸡</div>
				<div class="subTil">
					<div class="price">¥48<span>¥85</span></div>
					<div>赠送积分：45</div>
					<div>已售500</div>
				</div>
			</div>
				
			<!--优惠-->
			<div class="disView div_float" @click="showDisFun">
				<div class="L">
					<label>优惠</label>
					<span>满100减20</span>
					<span>满100减20</span>
				</div>
				<div class="R">共10个 ></div>
			</div>
			
			<!--已选-->
			<div class="selView">
				<div class="head">
					<label>已选</label>
					<span>50ml</span>
					<span>5件</span>
				</div>
				<div class="selCn">
					<div class="selList">
						<label>规格</label>
						<span>50ml</span>
						<span>50ml</span>
					</div>
				</div>
				<div class="selNum">
						<label>数量</label>
						<div class="num">
							<span @click='changeToatl' data-c-type="cut" :data-c-index="key">-</span>
							<input type="number" value="1" disabled="disabled" />
							<span @click='changeToatl' data-c-type="add" :data-c-index="key">+</span>
						</div>
				</div>
			</div>
			
			<!--产品参数-->
			<div class="ptView">
				<div class="list">
					<div class="top div_float" @click="showProFun">
						<div>全部商品</div>
						<div><span class="arr_g down" :class="[shouPro ?'up':'']"></span></div>
					</div>
					<div class="btm" v-show="shouPro">
						<div>
							<div>品名：</div>
							<div>超级无敌蛇皮棒棒鸡</div>
						</div>
						<div>
							<div>品名：</div>
							<div>超级无敌蛇皮棒棒鸡</div>
						</div>
					</div>
				</div>
			</div>
			
			<!--商品详情-->
			<div class="detailView">
				<div class="til">商品介绍</div>
				<div class="deCn">这是一个棒棒鸡这是一个棒棒鸡这是一个棒棒鸡这是一个棒棒鸡这是一个棒棒鸡这是一个棒棒鸡</div>
			</div>
			
			<!--底部-->
			<div class="proBtm div_float">
				<div class="L">
					<div>
						<div class="seIcon"></div>
						<div>客服</div>
					</div>
					<div>
						<div class="cartIcon"></div>
						<div>购物车</div>
					</div>
					<div>
						<div class="homeIcon"></div>
						<div>首页</div>
					</div>
				</div>
				<div class="R">
					<div>加入购物车</div>
					<div @click="nowBuyPro">立即购买</div>
				</div>
			</div>
			
			<!--优惠券-->
			<div class="discount" v-show="showDis">
				<div class="sub">
					<div class="disCnView">
						<div class="close"><span class="closeIcon" @click="showDisFun"></span></div>
						<div class="til">优惠券</div>
						 <div class="disCn div_float">
						 	<div v-for="(item,key) in disList" :key='key'>
						 		<div class="cnSub div_float">
						 			<div class="L">
							 			<div class="lSub">
							 				<div class="til">赠品</div>
							 				<div>满198可用</div>
							 			</div>
							 		</div>
							 		<div class="R"><span>领取</span></div>
						 		</div>
						 	</div>
						 </div>
					</div>
				</div>
			</div>
    
  </div>
</template>

<script>

export default {
  data () {
    return {
    	bannerList:[1,1,1],
    	bSel:0,
    	disList:[1,1,1,1,1,1],
    	showDis:false,//是否显示优惠券
    	shouPro:false,//是否显示商品参数
    }
  },

  components: {
    
  },

  methods: {
  	//轮播图切换
    bannerChange(e){
    	this.bSel = parseInt(e.mp.detail.current);
    },
    //点击查看参数
    showProFun(){
    	var sign = true;
    	if(this.shouPro){
    		sign = false;
    	}
    	this.shouPro = sign;
    },
    //点击查看优惠券
    showDisFun(){
    	var sign = true;
    	if(this.showDis){
    		sign = false;
    	}
    	this.showDis = sign;
	},
	//点击立即购买
	nowBuyPro(){
		wx.navigateTo({
			url: "/pages/submitOrder/main"
		})
	}
  },

  created () {
   
  }
}
</script>

<style scoped>
	.discount .disCn{
		overflow-y: auto;
	}
	.discount .disCn>div{
		float: left;
		width: 50%;
		margin: 12rpx 0;
	}
	.discount .disCn .cnSub{
		width: 90%;
		height: 116rpx;
		line-height: 116rpx;
		margin: 0 auto;
		border-radius: 28rpx;
		border: solid 2rpx #293462;
	}
	.cnSub .L{
		float: left;
		width: 40%;
		line-height: 116rpx;
		text-align: center;
		color: #666666;
		font-size: 24rpx;
		line-height: 50rpx;
		margin-left: 21rpx;
	}
	.cnSub .L .lSub{
		line-height: 40rpx;
		display: inline-block;
		vertical-align: middle;
	}
	.cnSub .L .til{
		color: #333333;
		font-size: 32rpx;
	}
	.cnSub .R{
		float: right;
		margin-right: 21rpx;
	}
	.cnSub .R span{
		display: inline-block;
		vertical-align: middle;
		width: 120rpx;
		height: 64rpx;
		background-color: #293462;
		border-radius: 8rpx;
		line-height: 64rpx;
		color: white;
		font-size: 24rpx;
		text-align: center;
	}
	.discount .til{
		height: 60rpx;
		line-height: 60rpx;
		padding: 0 2%;
		color: #333333;
		font-size: 28rpx;
	}
	.discount{
		position: fixed;
		width: 100%;
		top: 0;
		bottom: 0;
		z-index: 4;
		background-color: rgba(0,0,0,.4);
	}
	.discount .sub{
		position: inherit;
		height: 600rpx;
		width: 100%;
		bottom: 0;
		overflow-y: auto;
		background-color: white;
	}
	.discount .disCnView{
		position: relative;
	}
	.discount .close{
		height: 80rpx;
		line-height: 80rpx;
		text-align: right;
		padding: 0 2%;
	}
	.discount .close span{
		display: inline-block;
		vertical-align: middle;
		width: 60rpx;
		height: 60rpx;
	}
	.proBtm{
		height: 110rpx;
		line-height: 110rpx;
		background-color: white;
		position: fixed;
		width: 96%;
		bottom: 0;
		padding:  0 2%;
		z-index: 3;
	}
	.proBtm .L{
		float: left;
		width: 40%;
		font-size: 0;
	}
	.proBtm .L>div{
		display: inline-block;
		vertical-align: middle;
		color: #666666;
		text-align: center;
		font-size: 20rpx;
		width: 33.33%;
		line-height: 40rpx;
	}
	.proBtm .L>div>div:nth-child(1){
		display: inline-block;
		vertical-align: middle;
		width: 54rpx;
		height: 54rpx;
		margin-top:10rpx;
	}
	.proBtm .L>div>div:nth-child(2){
		font-size: 20rpx;
		color: #666666;
	}
	.proBtm .R{
		float: right;
		width: 60%;
		font-size: 0;
	}
	.proBtm .R>div{
		display: inline-block;
		vertical-align: middle;
		width: 180rpx;
		height: 80rpx;
		border-radius: 8rpx;
		border: solid 2rpx #293462;
		text-align: center;
		line-height: 80rpx;
		font-size: 28rpx;
	}
	.proBtm .R>div:nth-child(1){
		color: #293462;
		margin-right: 24rpx;
		margin-left: 30rpx;
	}
	.proBtm .R>div:nth-child(2){
		color: white;
		background-color: #293462;
	}
	.detailView{
		margin-top: 20rpx;
		background-color: white;
	}
	.detailView .til{
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		color: #333333;
		font-size: 32rpx;
	}
	.ptView .btm{
		padding-bottom: 20rpx;
	}
	.ptView .btm>div{
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 2%;
		border-bottom: 2rpx solid #E5E5E5;
		color: #666666;
		font-size: 24rpx;
	}
	.ptView .btm>div>div:nth-child(1){
		float: left;
		width: 20%;
	}
	.ptView .btm>div>div:nth-child(2){
		float: left;
	}
	.ptView .list .top{
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 2%;
		background-color: white;
		margin-top: 20rpx;
		color: #666666;
		font-size: 26rpx;
		border-bottom: 2rpx solid #E5E5E5;
	}
	.ptView .list .top>div:nth-child(1){
		float: left;
	}
	.ptView .list .top>div:nth-child(2){
		float: right;
	}
	.ptView .list .top>div:nth-child(2) span{
		display: inline-block;
		vertical-align: middle;
		width: 16rpx;
		height: 28rpx;
		margin-top: -5rpx;
	}
	.ptView .list .top .down{
		transform: rotate(90deg);
		margin-right: 9rpx;
	}
	.ptView .list .top .up{
		transform: rotate(270deg);
		margin-right: 9rpx;
	}
	.ptView{
		background-color: white;
		margin-top: 20rpx;
	}
	.selNum{
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 2%;
	}
	.selNum .num {
		right: 2%;
		bottom: 24rpx;
		line-height: 40rpx;
		color: #333333;
		font-size: 24rpx;
		font-size: 0;
		display: inline-block;
		vertical-align: middle;
		margin-left: 20rpx;
	}
	
	.selNum .num span,
	.selNum .num input {
		display: inline-block;
		vertical-align: middle;
		text-align: center;
	}
	
	.selNum .num span {
		width: 48rpx !important;
		height: 48rpx !important;
		font-size: 24rpx;
		color: #666666;
		border: 2rpx solid #E5E5E5;
	}
	
	.selNum .num input {
		width: 80rpx;
		height: 48rpx;
		font-size: 26rpx;
		color: #666666;
		border-top: 2rpx solid #E5E5E5;
		border-bottom: 2rpx solid #E5E5E5;
		min-height: 48rpx;
		line-height: 48rpx !important;
	}
	.selList{
		height: 60rpx;
		line-height: 60rpx;
		padding: 0 2%;
	}
	.selList span{
		display: inline-block;
		vertical-align: middle;
		padding: 0 33rpx;
		border: 2rpx solid #E5E5E5;
		color: #666666;
		text-align: center;
		height: 44rpx;
		line-height: 44rpx;
		margin:10rpx;
		border-radius: 8rpx;
		font-size: 20rpx;
	}
	.selView{
		background-color: white;
		margin-top: 20rpx;
	}
	.selView .head{
		height: 83rpx;
		line-height: 83rpx;
		padding: 0 2%;
		border-bottom: 2rpx solid #E5E5E5;
	}
	.selView .head span{
		display: inline-block;
		vertical-align: middle;
		color: #666666;
		font-size: 20rpx;
		margin: 0 20rpx;
	}
	.disView{
		height: 72rpx;
		line-height: 72rpx;
		padding: 0 2%;
		background-color: white;
		margin-top: 20rpx;
	}
	.disView .R{
		float: right;
		color: #333333;
		font-size: 24rpx;
	}
	.disView .L{
		float: left;
	}
	.disView .L label,.selView .head label,.selList label,.selNum label{
		color: #333333;
		font-size: 24rpx;
	}
	.disView .L span{
		border-radius: 8rpx;
		border: solid 2rpx #293462;
		height: 32rpx;
		line-height: 32rpx;
		color: #293462;
		padding: 0 22rpx;
		display: inline-block;
		vertical-align: middle;
		margin: 0 10rpx;
		font-size: 20rpx;
	}
	.proTil .subTil>div{
		display: inline-block;
		vertical-align: middle;
		width: 33.33%;
		color: #999999;
		font-size: 20rpx;
	}
	.proTil .subTil>div:nth-child(2){
		text-align: center;
	}
	.proTil .subTil>div:nth-child(3){
		text-align: right;
	}
	.proTil .subTil .price{
		color: #293462;
		font-size: 24rpx;
	}
	.proTil .subTil span{
		color: #999999;
		font-size: 20rpx;
		text-decoration: line-through;
		margin-left: 20rpx;
	}
	.proTil .subTil{
		height: 80rpx;
		line-height: 80rpx;
	}
	.proTil .til{
		line-height: 50rpx;
		color: #333333;
		font-size: 28rpx;
		margin-top: 20rpx;
	}
	.proTil{
		background-color: white;
		padding: 0 2%;
	}
	.bannerView{
		position: relative;
	}
	.banner{
		height: 750rpx;
	}
	.banner swiper-item img{
		width: 100%;
		height: 100%;
	}
	.pageTion{
		position: absolute;
		bottom: 20rpx;
		width: 100%;
		text-align: center;
	}
	.pageTion span{
		display: inline-block;
		vertical-align: middle;
		width: 24rpx;
		height: 24rpx;
		border-radius: 100%;
		border: solid 2rpx #666666;
		margin: 0 10rpx;
	}
	.pageTion  .sel{
		background-color: #666666;
	}
	.container{
		background-color: #F7F7F7;
		padding-bottom: 150rpx;
	}
	

	
	.seIcon{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAzQjI2MjQ2RDlDQjExRThBM0QwRTVGMjA5MTNDQjMzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAzQjI2MjQ3RDlDQjExRThBM0QwRTVGMjA5MTNDQjMzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDNCMjYyNDREOUNCMTFFOEEzRDBFNUYyMDkxM0NCMzMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDNCMjYyNDVEOUNCMTFFOEEzRDBFNUYyMDkxM0NCMzMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5SBboFAAAFZElEQVR42tRaC2wUVRR9u9IahaoIWgIJYokVRcEoKmoCfviJGhKMBktNRbAV/ESiBBW0/uoPQTAoFFG0RRs/MX7iF0TFKPgB1Fb8gEiMaFNJjCioKNZzM+elN5PJbHc7b3bnJCfz3szs7py57913732bqq6uNo5wMFgGHgX2AvuAxeBvYCvYAm5hP2fU19cHnu8WsZh+4ATyVIoLg4j6CHwJfBn8MaoHiUrYIPB6sAos8l37lxb6nRbrCR6qrDqGXAg+Cc4Hvy4EYXeBc3znVpNijW/Bn9S17uCRYH9wGDgOPI0vZBpZB87Nl7BSDp9T2N8DLgZXZHjjuzm/hK+Bd1DYFPAK3iMvaix4Mfh9Lg+XzlGUOITPlaiVPDc7x2G0DhQvdhzFGlrzC/DEuISJg9hAiwmmgpf6hluu+BI8D7yB/R7gerA8DmFrwRK2zwUfd7BUiAOpYLuIv1nkUlgD1yZBJfiGcYcmOhI7nxtcCRvOISdYCj5l3OMx8Am2J3FtjFzYIh53gtNNfLgc/JXtxVELO0Z5wNtNvGhXvymecmiUwiartepREz+Wg/+oIRmZsJE8rgL/zoOw3YxkBGdEJayYQ1HwockfVvF4bGcips4IK2XaIdieR2E28u/FwLrLsaKOKOIWdivjRXEgB6nzstQ8w1g1EKkMieYQTtab2H8X3Moo4IWwL44AB3JuheErsBbJ5nOdFXY6XeyoDBO6hG/TVQb+Ay31AQNiw1xuJDNyi6UQNz3THJvNL9KimsG36Zm+U8LSDi32H7hPLcwzSBlBA8CLmPoIrqypqWkME7YAvJftP5nslXFIitDR4EO8Hqfb7+Pry28/z+ey8WolxF0XJEySvJlstzA3qgtI9HqYwkE7hqBkGJ+x/yDElWphh4HL2N7C5G5bxMmpS5yv5vpc/ZC16qbxKnxJBGC1HSwECabAasUibH9G0HZ92GqSiRWqWDRchI0AD+DJJSa5kHn2l11/RdjJ7OwCP06qKgxHef6f2T08rVzptqTNrUxBsI0XEy0KDqNEGaktrdLufgk30lDlK5pF2GZ2+pqOClQSUaVCvXVpRuwmm7S7AIeh5GhTrduHI9krwnYw6BXMSqi1ZBsqxXadjjxu5vEQsDFJzg/WelHVQWbCWq1amJSQm2yUDN5TYAJaA85JjV82RibYqAmiFgaVBioY0R8P3gieYLztnI2+L2yLSUxKvXgJ+Y5mZiEbh1KVHhyWaPprHmLSt/jBcaQ4lzWci1JXHKN+2CX2mY6t3tFkp0sDfmGynSqbcHfSanL9TNKPvg7LAtZt3w2ezZFk88B3wG/A16Xmku3m+i3G2xCYRKsNBHvz/nZmsI1M311iDrMPO8eWm45dz1CEld+2s0wg3M949bw0h6CEXztjmmvz6K0NLWi6Ksw/3tvy4A3PAq9hu8lksR/dLaYHFKdUziG8iZM+EyS8e5XtvcbbozaFIkze+P3G2/7RkHXzNjqCIAyhN7ZB7QXgH9mmLa5QyWViWMC1Ebx2ScC1GcyGe7I/jUuQKQRh5So0k3T9KuP9YaU/2zaFf5reVnCh8XZzHlZrZAW9c9ZwNRRr1dyQ0kOLuvYI+D74CV35enrZQeqejZxTG7qSQUcN2bAYy/YynyiLZlVVGqhEyd+TpJp7UldEuRLW23Tsp70Xct9a1W6gg5B4cFEUD+FiKO5iOCT1vSNC7rP1iT0q+420mOMixvuU7atD7ruWx02uqlQuYPO5AXTrZb6Fdw2vCe5z8QCuvOKbxqulV3GRlrL5arrxc5Q7l3/NvZIkYYLLwF+M90+2VEA+9YDLGovrkGoWXf5EFYGIS3+Wab0z/C/AAFQ+Lpr0Jmq/AAAAAElFTkSuQmCC');
		background-size: 100% 100%;
	}
	.cartIcon{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA2CAYAAACSjFpuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkIzODUwMDYwRDY2NTExRThBNDA3OUVDMkM0NzRBQzdDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkIzODUwMDYxRDY2NTExRThBNDA3OUVDMkM0NzRBQzdDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjM4NTAwNUVENjY1MTFFOEE0MDc5RUMyQzQ3NEFDN0MiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjM4NTAwNUZENjY1MTFFOEE0MDc5RUMyQzQ3NEFDN0MiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz52h1iGAAAD0klEQVR42txaSWgUURD9mUSIwSSgoKLGgIrRg2LigkhcEaOBHLyI60mcKCgigl705IZ68CJKQCIuiJ4EQfEkmk3FrBo14oZRUTHuMWSMyfiKqWaKZjLpZdr53QWPrs7v+Zk3v6p+Vf3OCIfDF5VSG1RiGQCOAPuUplJVVZV0PASsGWJ8B5ChfCpZwFZgPetSpgOjgTxgMvDCrwSrGWY5CuxhvdivBENJxtqEXuxXE01G8KHQS4JIsAP4E+QV/As8YZ2CzfigETT74aygE5zt121CWQw0y033WkhlZeVgQxQ/6rJsrOBChp+kbSgT7QI+Kv/KhCwLDzUD5axfAp7rTgrYzPoDKwSbBMFG4ITO1QR8cosgWBOyMEerz1K2xUKvtUKw0WcES/kaIRO1QrAT+CpKqGxdmcE8C3Ep5Nv7MN9IyOJnm/maCczQePXkNlZrJZMxE9TdTBc5Jdjik9LJINgP1Nsh2KT7CsL/xuBSZER++F+3HYLUruhmfaaFHDbd/ldjtZowJCrMlKLoNM39zzZBs5mWaE6w3gnBFl39EP6Xz65D0gH/+xy0FST/M5rTd+xU9FKoCdUr2hc6dbtLhV7nlGC/KICNbrcusiRRgLFLUMv9EP6Xo+L9ojfwv043BFs19MMFYl+uMw/6fgVN/ldjHrSbkTxSsYYwfa6ME4BUSw/QZ+P5nFQS7GOSXq5ejsPPdcH/OtwSNEong+BbUQwb9WKujbloq8m3+f8TPU890AOJHnZCUGY01PE5lE4HtHKErVwEGu3b+U4IUvt+gPU5QSTYw2kbSQEwKmgEzWbaxdtFWoBM5hYwzEuC6ZalwMTBBp22Hs6y/xVoQLAekfRlqgn+BDbpsHxebBO+klR1x+aq2KEHNaToxYUbojh2K1OAlRytXwPXgS//iyClTXRmWG76O9Vk64AGF3NT2ncc2GmytF/AduC8l9uEkUdeTUBOcVS7yb++UzkM7ErwHSnXPQdUeE1wFYdokm/8q64G7okv4vQ1zHHAbtEqOciErohnjnltomVCJzO6wPpt4D2XPStc9FgyWT8F7Ged/I/a89T0ouYzHVe/82oFZd32SujfeUVJRjicO0/oco+Lmv5Xrpcm+lToe1X8YJTOx43Xvh47nLtd6NuAsazPFz7fw1HVM4JkksaBTAWbJf3aZ8Qzpx3O3aDiLx0V8ao9U7GWfLbIpnq9JEjtcXrXO8L3I4FJYrxa+KVdoXJsLfCJ74cDU8X3vctW42kUJbkGzAMuAx+4fUGtu41sqlGXLkDB5CSv4A8VazwTsWXAbyuT/BNgAAFM7kLYA4RrAAAAAElFTkSuQmCC');
		background-size: 100% 100%;
	}
	.homeIcon{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA4CAYAAAC2TwutAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjEwOThEQkE4RDlDQjExRThBNEQ3RjVCQUExRUFEMkREIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjEwOThEQkE5RDlDQjExRThBNEQ3RjVCQUExRUFEMkREIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTA5OERCQTZEOUNCMTFFOEE0RDdGNUJBQTFFQUQyREQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTA5OERCQTdEOUNCMTFFOEE0RDdGNUJBQTFFQUQyREQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6WAzWxAAAEF0lEQVR42uxaSWgUQRSt6QQjriiiqAT1oJ4URYgYjPGgmMlkXEBN4gYiZhBE8aSgByEgejAHQbBdYoKYRS9qJi6gxg1BlBhERETcwI24XEQlmuj/9B/9FD29TFd3uiEf3kxVTy/z5r3+VfV7YjU1NSKAmA84BcgDbAZcUXViXddNt2sBkboNmAwoBFwGxP2+qBYQKTkuAsqiSkwmdRhQz/qX/FTOL2IlEqkzgK2ATWRFrlwiKsRQqVsSqUrWj0vJI+2HcloASlWa7Ffmt3Kaj0qdzUIqEOU0nxJFK2C1g+PKKIkoV07zyX5VLo4vl2yZpm39SqxEsl+rjf2sbMmVa/dKzguxUhNSVR7OV25CLhE0MVTqBuu3eCRlZct4UMQWSEohqWqF2TVOScRTQtFyUOqmZD+VpDKRkGzpWjnNg1LNiuxnZcv2XJXTXJCSlVoTwJKnwkS5hCpisv1afFbKLlumibAnYqUm9qsWwUe5lFDaAMlcickpvTkg+1klFH7PXbCypeYwUTT1Myl+z6W5LVOpVIVTYvI9hUqtFeGJpKRcG5BL2BGTlTodEqVcK6dJiYIrdQ6wToQ3krSS4MpVyMRKpUQhpIPCGrul/j9ySGyhCSmMsREgNsFkG5JLIrEOtvER4I+ITsToHb/zQz4UILEv1NkgjPJYTEQvYlSK2Ej9H/nwMoNmzlhbX+nDRUcDigBTAAW0DX/MJ4AHCq8zSdf1BrAhtu8gsXeAE/ThCIUXwnt0H2XWgiz7oPXrAI0KrjccX5Cc2TjWq4gUDvIvyNoFFvvNBDTQxNpr9PFOvg/WmyUN8m+FUWPsZIlpImAFYC71sQA0zMms3WmoJoYOuM76R4RRszdzwgFhPCs7yia52wCHVH0RlbEdMIpNx7bY2PuYNA/F+21wGIml6P0bYL3DY5rYVA6feK4KG7ExgOnUPu9yoD8uTcRDRWw8az91eexL1VM5lcTyTKY6uXwPLWzE+jycV8s2HoUleYQmBogNEBsgFiwx5dnJ5+jLNsRYLVuioCYfO39bEeu2KZSELQpZ+70VsU7WXhwBYpmHgT8Bj62IfaTlOsZswLQQkxrCVgLXdF3vscuKdax9MsTE6tlC+aCTdN9IymEUA2pDSGqH+P9/krugVofTcYw/VNsD2O/ywr9c7t/jYmVQy1yFa77lbgbo+wD+Z+GdwqgBLpNSLI/nrD3UJTE+zHw1+Rxrk1jQ7aIfOhPFoFa32QnzbeoR38maSGaOMJ7AoE2fAT6QMhp9MU4Gax2LXK6+M7EEcI/1Rwqj2DqIbXsljCpXV7YT2lWpsCBzh+TP1DDGEawCCzpFOd4/VufHQRirWLvs7O6k/PaabLAXsBQwDzCVFOr1MUHEaMr0GfAGcFUYD/s+OTn4rwADADH04py36JnGAAAAAElFTkSuQmCC');
		background-size: 100% 100%;
	}
	
	.closeIcon{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE0MDc2QUJCRDlDRTExRThBNzNEQjVDMjUxRThGNjAwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE0MDc2QUJDRDlDRTExRThBNzNEQjVDMjUxRThGNjAwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTQwNzZBQjlEOUNFMTFFOEE3M0RCNUMyNTFFOEY2MDAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTQwNzZBQkFEOUNFMTFFOEE3M0RCNUMyNTFFOEY2MDAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz54b4guAAAFeElEQVR42tyba4gVZRjHH4/LQu5uZ4uStDAMSkq0U20flPJCRZkQabnJSnWkICg3VsgKK7AMDClW2m4bkVqxbNqF/KAV6rZLaYHZKbPyQ0pmtyXzbKuFotH/cf6jwzBnzsyZd+ZcHviBHuby/HZm3vs7oru7W2KKNJgCWsBEMB6cD5pBI485DPLgV7AX7AY7wHYwFEdSdYavdwG4A8wFV4AvwTawGewBP1FwmMc38Q9wIZgALgFL+Uf6CrwH1oP9lSY8DSwB14IPwNNgABwpct4w+Rl86vi9gde6neL6R3sW9EdNNBXx/BkUe5mi+oTvBpsCyPqFnvshuJfX1Gu/xHvNKIfwGPAWWAteAZPAa/wmTce/vPYkSq/lvcckJTwPfA0OgMtAD/hP4g+9Ry/veYA5zIvzG64Hz4HZ4GaWpuUIfd0fBe+AdSw/HgJHTT5hLU03sjS9soyyztjBXDSnj8HZpoTPBX3gRzCH1UqlRJ45/QC2MtdIwmmWllvAfeCEVF6cYG6a50fMuSThelb8X4BHpPJDv+vPmXN9KcKdLCDapXqinTl3hhXW4n4WuKtCX2O/1/tO5t4aVFgb+C/yhLxUXwwx9xfYSisq3AVer5CqJ0qVpQ7PFxOeCa4Cy6X6YzldrvMTfordsyM1IKwOj4FlhYS1iXYeeFtqJ3rpNM1LWPuzK8HxGhI+TqclbuHR4Br2fGoteug22incBjYY/HYzIBvh/CyvYepb3kDHU8K38X03JaudjdUlSmd5bp9B6V46nhROs/geMHDhZibazP+HlbZlva4VJfrpmFbhqayoTbzO2jJb7PotqLRT1o7Fhlp7/9Bxaoqd6G0GC4k1YGFIaS/ZhbyWqVDHFhXWwbFvDJeMtnQ+gHQSskLHiSqsMwJ7Y6gO1rCp6iftls3HJCt0HK+DeGPFmuqII3KUdhdk4vHvPI/NxZTL79oTrGMih2Ks+ItJJyGroTMcZ+or3Sin53rils4XKNnjlrWFm1KSXKjQKo/fVyUga8cxFdbpkaYEbpZ1d9UYyyI2Q4OGOh5O8ZU6KwFZdwEVpMoyLTycYgk9NmHZmQGqLNOh/eI/VHgfuChh2VyBgkyP7YwpF3Xcp8Lfgskx3KAzQD3rJd3hUW2ZCHXcrcK6LGGK4YuvZuJBqh4v6WwM0ic7SSk2qq8GowzKZkPWs3FLq5uuG9muwkN8ytMN9YczJTYqvKQzhvrD0+mYtxse74L5hvrDtmApLSintF/rLGzMp+OpIR4d6LpFrNUzpqRLbS7mClRbpUYD3XqcwoPgM3ugy5B0lOZiTszNa7XRbdAprKHjtw+L+cVq5Yw6Oq20f3AKD7DP2FpDwq10GvASthvyKwx9y+WOBro86fzRLbyFxfcTNSD8OF02u99xdzwIdoq1Dqpa54i1kXGPWCOy4veENXSV2yKxFn01V6FsmrkvoktRYeEJugzoDTCyimQ11zeZ+zqvA/yGeDrYae6qIuEuPuGOQgf4CR8Ta72yTjU+UwWyK5jrXOYeWljjILge3Ai6K/T1HsncZjPXg34HBxm1HGRv42LwfoUVZJqLrry7VKyF44PFTgg6TPu3WIu99rPKaqmQqmcnS+IbwF9BTgozLn2URb2uu9xYxhbZKN57E3N5QAKulQ4rbIfuMrkcjAPfibWLJYkB/RTv9b1Ya6QnM5fQFyklfgMLxNrQoU99l1gbMhpjED2DrSa9RzuHftqYgyQlbMcnYm23uR/cCn4Ra6pzVsTXXc+9CbzKa87hPbTa6YvaXzQR/WQcu2Ta+cjI6Y1ae4g+FZ2ptHe/6Buhsx66Q2UCsXez5VgCZ8TgRq0RCW3F01UGOvF+jnhvxftTrAmBXRLzVrz/BRgAhw5hG5yFkr8AAAAASUVORK5CYII=');
		background-size: 100% 100%;
	}
</style>
