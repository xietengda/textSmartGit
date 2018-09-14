<template>
	<div>
		<div class="comment">
			<div class="comTil">评论<span>（10）</span></div>
			<div class="comCn">
				<div class="comList div_float">
					<img src="../../static/img/me.png" />
					<div class="cmTop div_float">
						<div class="cmMsg">
							<p>小白MAGUNUS</p>
							<p>2018-12-12 12:11:11</p>
						</div>
						<div class="cmText">超实用的建议！超实用的建议！超实用的建议！超实用的建议！超实用的建议！（自己发的评论可以删除）</div>
						<div class="caozuo">
							<p>删除</p>
							<p>回复</p>
						</div>
					</div>
				</div>
				<div class="comList div_float">
					<img src="../../static/img/me.png" />
					<div class="cmTop div_float">
						<div class="cmMsg">
							<p>小白MAGUNUS</p>
							<p>2018-12-12 12:11:11</p>
						</div>
						<div class="cmText">超实用的建议！超实用的建议！超实用的建议！超实用的建议！超实用的建议！（自己发的评论可以删除）</div>
						<div class="reply">
							<div class="reTop">回复 <label>小黑MAGUNUS</label></div>
							<div>牛逼实用好文章，过去了可以找你玩吗？？过去了可以找你玩吗？？</div>
						</div>
					</div>
				</div>
			</div>

			<div class="noComment">
				<div class="nullCom ComIcon"></div>
				<div>暂无评论</div>
			</div>

		</div>

		<!--评论框-->
		<div class="comBtm div_float">
			<div class="ComInput">
				<form>
					<input type="text" placeholder="发表评论" placeholder-class="ComPlace" confirm-type="send" adjust-position/>
				</form>
			</div>
			<div class="ComOperate">
				<div class="guanNo"></div>
				<div class="share" @click="showShareFun"></div>
				<div class="zan" @click='dianZan'><label>1000</label></div>
			</div>
		</div>
		
		
		<!--分享选项卡-->
		<div class="shareCn" v-show="showShare">
			<div class="shareListCn">
				<div class="shareList">
					 <p>发送给朋友</p>
					 <button open-type="share"></button>
				</div>
				<div class="shareList">
					 <p>生成卡片分享</p>
				</div>
				<div class="shareList" @click="hideShare">
					 <p>取消</p>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				showShare:false
			}
		},

		components: {
		},


		methods: {
			showShareFun:function(){
				this.showShare = true;
			},
			hideShare:function(){
				this.showShare = false;
			},
			dianZan:function(){
				console.log(222)
			}
		},
	}
</script>

<style>
	.comment {
		margin-top: 45rpx;
		padding: 0 3%;
		padding-bottom: 216rpx
	}
	
	.comment .comTil {
		height: 80rpx;
		line-height: 80rpx;
		color: #121213;
		font-size: 40rpx;
	}
	
	.comment .comTil span {
		color: #6fa0cd;
		font-size: 32rpx;
	}
	
	.comment .comCn {
		margin-top: 20rpx;
	}
	
	.comCn .comList {
		margin-bottom: 30rpx;
	}
	
	.comCn .comList>img {
		float: left;
		width: 78rpx;
		height: 78rpx;
		margin-left: 9rpx;
		margin-top: 9rpx;
	}
	
	.comList .cmTop {
		float: left;
		width: 590rpx;
		margin-left: 20rpx;
		padding-bottom: 28rpx;
		border-bottom: 2rpx solid #e5e5e5;
		line-height: 50rpx;
	}
	
	.comList .cmMsg p:nth-child(1) {
		color: #121213;
		font-size: 32rpx;
	}
	
	.comList .cmMsg p:nth-child(2) {
		color: #929292;
		font-size: 26rpx;
	}
	
	.comList .cmText {
		color: #656565;
		font-size: 24rpx;
		margin-top: 26rpx;
	}
	
	.comList .caozuo {
		text-align: right;
		margin-top: 26rpx;
	}
	
	.comList .caozuo p {
		display: inline-block;
		color: #ff7086;
		font-size: 26rpx;
	}
	
	.comList .reply {
		padding: 24rpx 15rpx;
		background-color: #f6f6f6;
		color: #b3b0b1;
		font-size: 24rpx;
		margin-top: 24rpx;
	}
	
	.comList .reply .reTop label {
		color: #6fa0cd !important;
	}
	
	.ComPlace {
		color: #858585;
		font-size: 24rpx;
	}
	
	.comBtm {
		position: fixed;
		bottom: 0;
		width: 94%;
		padding: 0 3%;
		background-color: white;
		height: 112rpx;
		border-top: 2rpx solid #E5E5E5;
	}
	
	.ComInput {
		width: 393rpx;
		height: 68rpx;
		float: left;
		margin-top: 22rpx;
	}
	
	.ComInput input {
		padding-left: 25rpx;
		width: 368rpx;
		line-height: 68rpx;
		height: 68rpx;
		color: #858585;
		font-size: 24rpx;
		background-color: #f6f6f6;
		border-radius: 34rpx;
	}
	
	.ComOperate {
		float: left;
		height: 68rpx;
		line-height: 68rpx;
		margin-top: 22rpx;
	}
	
	.ComOperate div {
		display: inline-block;
		vertical-align: middle;
		width: 42rpx;
		height: 38rpx;
		margin: 0 26rpx;
		margin-top: -5rpx;
		position: relative;
		background-size: 100% 100% !important;
	}
	
	.ComOperate>div:nth-child(2) {
		width: 38rpx !important;
	}
	
	.ComOperate>div:nth-child(3) {
		width: 38rpx !important;
	}
	
	.ComOperate>div>label {
		display: inline-block;
		position: absolute;
		padding: 9rpx;
		top: -14rpx;
		right: -58rpx;
		color: #ffffff;
		font-size: 20rpx;
		background-color: #fa7889;
		border-radius: 30rpx;
		line-height: 20rpx;
	}
	
	.noComment {
		text-align: center;
		margin-top: 50rpx;
	}
	
	.noComment .nullCom {
		display: inline-block;
		width: 108rpx;
		height: 100rpx;
		background-size: 100% 100% !important;
	}
	
	.noComment>div:nth-child(2) {
		color: #8fcd31;
		font-size: 26rpx;
		margin-top: 40rpx;
	}
	
	.shareCn{
		position: fixed;
		width: 100%;
		top: 0;
		bottom: 0;
		z-index: 3; 
		background-color: rgba(0,0,0,.3);
	}
	.shareCn .shareListCn{
		position: inherit;
		bottom: 0;
		width: 100%;
		background-color: white;
	}
	.shareListCn .shareList{
		text-align: center;
		height: 100rpx;
		line-height: 100rpx;
		color: #121213;
		font-size: 36rpx;
		border-bottom: 2rpx solid #E5E5E5;
		position: relative;
	}
	.shareListCn .shareList button{
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	
	
	
	.ComIcon {
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAABrCAYAAABExr0QAAAFXElEQVR4nO3dSYgcVRzH8c90nLglLofEoCCIKHoQFRXUiwY0guslarypuRnJRPGmogE9KzLRk4igGNG5uIEL6kkE9aBi3IiIG2oCJkaFOMR4eDVixrGrqrumu+rN/wsPZvr9+/Wv60tV16vq6pqY2TGlApNYV7TzcSqOw+FVnhzUYj/2YCfex2tFmy174mEl/cdhMzZh9XAZg4ocjhOKdrG0/H/GNjwiiV6QXp9BN+BTbBUix81qycOnkpcFWUjmMkzjGaxZlGjBoKyRvExLng5hvsxl2C5tVoP2sknydIjQ+TIfxvpRJQqGYr3k6x/+LfN63D7SOMGw3I4b5v6Zk3mstKcUdI9HpFnHPzK3qLazsxv34hwcgYlojbcjiuV7b7G8yzgBUzAxs2NqEt9jVcmTnsNG7KvwAkEzrMTj0kdgP3bhpMOkozplImdwIw4OHS+owz5puU/ov2O6Cut6ksx+/IxbhchxcRC34IeSunU9nFdSNI1fm0gVDMxvyndQz+vhtJKiF5rJEwzJKyX9p/ekaUk/PmsoTDAcn5f0H9tTfhprf0NhguH4s6R/eb+zJkHHCJkZETIzImRmRMjMiJCZESEzI0JmRoTMjAiZGREyMyJkZkTIzIiQmREhMyNCZkaEzIwImRkRMjMiZGZEyMyIkJkRITMjQmZGtFnmNXhTuhJqX/H31UswQ2XaKvMB6RqXtVhRtLV4sehbKhlq0UaZV+PuPv13S2tM7hlq00aZd1aouWMJZKhNG2We31BN1zPUpo0yqzAx7gDakeEQ2ijz/Qo17y2BDLVpo8yHGqrpeobatFHmi3iwT/+DRU3uGWrTRplwD67DW/i9aG/h2qJvqWSoxcTMjqmyn4Rp3Qf9Eqavq7aumcEAhMyMCJkZETIzImRmRMjMiJCZESEzI0JmRoTMjAiZGREyM6LLMk+WbkW4XzoAPUjbX4xx8oizLwpdlvk4LsfyIcZYXozxZCOJxkyXZV7Y4FgXNzjW2OiyzHcbHOudBscaG12WuRFvKP/t8n7MFmPc3ESgcVN2m+I28430eRcUdHnNDOYRMjMiZGZEyMyIkJkRITMjQmZG9JTfuK3sxm/BaFhR0v9nD3tLis5oKEwwHKeU9O/t4cuSotb+usYS48qS/i96+KCkaDOOaSZPMCArJA/9+KAnnZztx2rp3GFcDTYeJvAETiype21O5q6SwvV4FiuHzxbUYKW03NeX1O1SyJzFtgoDX4+d0oWmZ2FyiJDB/3M0zpGW805puZexDbMTMzumSDcR/wxrFithQ/yBq/D2iF7vRjyNZSN6vUH4SZpx7Jk7aLAXW8aXpzJH4WVcOoLX6oJImMIeDj0C9CymxxKnHqMQ2hWR05I3/Pdw3hY8P9I4g7GYQjfohsjnzduazpd5QHozj44q0RAshtANeEr7RT4mZT3w7wcXOtB+AJtwE35c/FxD0aTQLoj8SfJym3ki6X/WZDvOxH3K56HjpAmhbRe5G/dLe63b/69obmpSxiSukL4NdwFOxfHaNdccdNrSNpGz+EWaY76H1/Fq8Xhfqn7VchYvFW3UnC29oVUldXNraB2hdUR+Ja3931Yce+R04eT0h9IWocqmvs4mNyuRdEMmgwld26cmO5F0Ryb1hb5kYaFZiqRbMhleaLYi6Z5MktDL1BeatUi6e+HQR5LQN1Tfy10uY5F0c82cY05olTX0SJmLpNsyqSe0jE6LpPsyaUZo50WSh0yGE5qFSPKRyWBCsxFJXjKpJzQrkeQnkyR0Lb7uU/MhLpGRSPKUCZ/gXGzFF8Vjf+Fj3IWL8N14oi0eVc9ndp1JSeZ/zs7nxN/tdh4Nvv48TgAAAABJRU5ErkJggg==');
	}
	
	.guanNo {
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAlCAYAAAA0lXuOAAADP0lEQVRYhc3Yy6uVVRjH8c9+zRDJICJNEwuicyAz82gXsFNURkSjLtKociIpDQwi6U+wsIE0qKBJNUkoJLLgDFJPUpEEXTQ4FAQlHivJBmangZ4arLXYa++zb+++vPWDDc963me967ufdX9r+w99rQctws1Yh5XR9xd+wBf4o0v9K3A7bsDS6DuN4/gWF7sBXNLl+Rh24XFc2SZmHp/gdbyLC9m7H8PTuAtFm/q/Yz/24ft2ILU2GV2Kl7BDyGav+g7bo/0GbixR9yJew26ht7qCXosD2NDkPyNkbhZ/Y7mQ8ds0/pk8oznEMSFjv2EJVgmZvqqpna/wMH7Knc1dv0YYcysy3xT24KjWY2kFduI5XNb0zj/xMl7Fry3qLsIkXsAD0bchMtyKkykwz+gyfCpMGELWduDNFg200hq8h02x/CUexc891n9K6PolsXwcm3GOxgG+N4Ocw5YSkCLQJN6Pv8kSkGJbW4QEiSx708OU0XX4BrXofxJvl2gkV+r6Cx2j2usJvBXteazHiZTRXeqQB/UPSQDsF1Js+2C0CzybjMXYmgXuGaCRYenFzN6KxQUmcHl0zuLzqqla6DOBhcA2UWBtFjAtjIv/WvMCS9LaQli4k8rM0lErZ1nevP/+UyVJF+U9WytwNnOs9P/Rqsw+W2Amc2ysGKaTJjJ7phC2urnouAnjlSMt1LjGXfJYIRypPsqCdldN1ULPZ/YU5tJkeiV7sA13VkXUQpsjQ9I+6oeSaXwQ7QLv4PqqyDJdF9tO59sPcSRBJT0jXAvgmhiwSXUaE868q2P5jHCNQSPoSeH8mK4Bq3FINcNgDIfVIeeEPf5UCmhe8KfxkPraukyYaKOETZBp3TyPBzVuoS1vhkeEAX06lkcJ2xMk7a+wM7jXaGHbQR5tFdwOlNHCloKkMyijgS0NSXdQhgs73g8kvYEyHNhxYbkrDUnvoAwGOxAk5UDpD3ZgSMqDUof9JZY7wQ4Fkv5ACbD3WAh7fxZzy7Ag6f59tJMS7GFcLcBORbh53I1LhwE5KCh12I+FzNVwX1PMOeH80Dck/Xd9rhnhE+EBC2+x07jDgJAMntGkWTwi3GI3Cgk4gR+H9H7/AjLN11SSTqABAAAAAElFTkSuQmCC');
	}
	
	.guanSel {
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAlCAYAAAA0lXuOAAACTklEQVRYhc3Yu2oUURwH4C+j0wQiiJJgoVZaGCMYEQVB0C5aeYG8gKJgEavBPMHgYqHYKPgCgmBhFGwk0SoiCF4gKAgiRoskgpIsGKMWk2UnIbM7e8lOftXyP3NmPs7OmTNzun5fuy5HNuEABrBjubaAj5jEjzr9t+II9qB7ufYNb/EmjKOleoDNddr3YgTD2JZxzF88x108wJ/Uuc/jEo4jyOg/uzhauo9bYRx9yIJ0ZYxoN0q4LBnNvHmPi8u/72FfA32XcAdRGEcLeaC78RAHG7hIOukRbSavcSaMo8/p4uq/Y5fknmsWSQJsFmn52pOLo6Wd6WIa2oMx9LVwkXalD48XR0s9lUIaekMyqzdKBiQmVKEDqpNgI+XC4mhpP1XoCLqK82QmwFWSWR9iBlsKJWXnJ7YHGLRxkSS2wQD9RUtypD9Ab9GKHOnNWn83WroCzBWtyJG5AFNFK3JkKsArlIuW1EgZLwPJC/CTgjG18jSMo3JlMt0ulFI7N6kuoRN4VJwlM2NhHE2w8u3pCmaL8ayZGckXBlZCv+Cc5J4tOmUMh3H0tVJY/cCfwGnFPlvncSqMo2fp4lor0ziOST5nO515DIVxNL66IWsJncJJncVWkC/Waqy11ncSWxNJbSidwdZFUh/K+mJzIckHZX2wuZHkh9Je7DyGkAtJY1Dag20YSeNQqtjvTfRtCklzUBLsCY1hm0bSPJTGsC0haQ1KFTtd45hfWkTSOpQEe1iyp/pvVdsEjmoRSWv7mOlM46xkf/+QZADe4VObzu8/8h2UzU0dqCYAAAAASUVORK5CYII=');
	}
	
	.zan {
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAoCAYAAAB99ePgAAACe0lEQVRYhe3Yz4uNURzH8de980MmMYSwIab8LBo/khRlayELZSFJZMFGxMKGxVAUFhayERtT+A9MCCXFSH6kxjSEJsmUDPk1Fue5M6fLvc3zzK9n4VO3+/me7/c+532fc57TeU6hta3dEFSPeSigE1+HcrFyFTP+rg4n8BHP8BQ9uIaVw4OWHe48DmFC1FaPzbiX5IasLHBrsCOK3wtD+juJa4W7un9oaNng9kX+FGZhLpbhSZRrwYLsaOnh6rExiq9G/gk24FUSj8PR7Gjp4ZoNzLNePCzLf8CuKN6MSdnQ0sMtj/x9/PhHTRseJb4W6zJwIT3c4sjfrVJ3K/JNKfvoV1q41ZG/U6WuO/LTUvbRrzRwM7E08b+E9WxElQZuR1R/E5+HnaZMtcn3ChzBwqitXDMjfzFFH3uwpUq+RxiFS3hQDrcWN4Q1bDDqwpUUcI3Jp5qasReXhT/TSximlhRgcBw/U9Sn0TZcRw0UWtvaezE+Sa4SdhqxOoRtUUldwgNRTY2YMgiYAmZjK3YmMeEuniu0trX3lRWXq69C+3DrAE4mvgNNWbdMI6EzBkZtnpzB/cTLKJ6RJziYHPmePMHVGXjw+tCZJ7gmARBe40ue4BZF/hnZX3BGQgsj/4L8wj0nv3C5GtYi5kdxruDmoCHx3fhEfuD+mm/8hxuUYrinJZMXuPjY4kXJ5AGuBkuiOFfDuh4TE/8W70qJsYarF95JSmqNk2MJ1yDAlE5Cvwm74X4V8T2Kp44C1HRsx2NsitoP401cWCtMwNIxw4cKF+yr0D5cOo2z5Y1FHBuFziupB7tVOKItCi+xW4XFbzQgP+I2Dgq73wuVCv8AvQpvNvAWwvgAAAAASUVORK5CYII=');
	}
	
	.share {
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAYAAACMo1E1AAABiElEQVRYhe3Yv2rbUBQH4E9GoUsgT9ClXdshmbylU5+hKc3Q0KFvEPIinUKg/5wa8gyl3QqBpNDOIWD6AIGuiTtEhmvZTi3dKymDf2DQPVwfPnQG6Sobfv0JG3iFddUzwjHGQS3DDh5W7JXhMU5xmBewMzyqAQubfg7WL/Epot8bPOhhNxLWVPq56VH+wPeKTX5hUKpN1k+X7PEcm6XaKC8VvuGgEm1+xqbHvCgZ3pmFwbiXAFI3E9jboHYebugKNw/2ESfhpi5wi2CvcRNubBt3F+y6vLlNXCUY7eEqw2gHVwtG87jaMJrFRcFoDhcNoxlcEhjpcbGwUXD9u/zgTw37gL0lYUy/3QxS4VLAKL3NpBhrKthMYnGNwSB2rC+khU0ORnAciwv/n+KOhQejLBY3wFpx/V78KMOj5JNY3DWOInssTJdniP9mhaubFa5uVri6WeHq5l7jyo+vPva7gBTZDhc5/gbrZ8XvPuRPz+0B5KJrSSmX+JLjCltuv6ZX/frdRC4wxNU/OpxdXt7CecMAAAAASUVORK5CYII=');
	}
</style>