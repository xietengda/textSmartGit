<template>
	<div class="container CnTop CnBtm"  :class="[isIphonex ? 'ixPaddCn':'']">

		<!--导航栏--> 
		<allHead :headTil='langua.msgTil' />
		
		<div class="msgCn">
			<navigator url="/pages/praiseMe/main" hover-class="none">
				<div class="msgList">
					<div class="L"><span class="dianz"></span>{{langua.msgPraise}}</div>
					<div class="tishi" v-if='Msg.like == 1'></div>
					<div class="R"><span class="rArraw"></span></div>
				</div>
			</navigator>
			<navigator url="/pages/getReply/main" hover-class="none">
				<div class="msgList">
					<div class="L"><span class="pinL"></span>{{langua.msgComm}}</div>
					<div class="tishi" v-if='Msg.conment == 1'></div>
					<div class="R"><span class="rArraw"></span></div>
				</div>
			</navigator>
			<navigator url="/pages/attenMe/main" hover-class="none">
				<div class="msgList">
					<div class="L"><span class="guanZ"></span>{{langua.msgAttention}}</div>
					<div class="tishi" v-if='Msg.follow == 1'></div>
					<div class="R"><span class="rArraw"></span></div>
				</div>
			</navigator>
			<navigator url="/pages/pushMsg/main" hover-class="none">
				<div class="msgList">
					<div class="L"><span class="tuiS"></span>{{langua.msgSystem}}</div>
					<div class="tishi" v-if='Msg.system == 1'></div>
					<div class="R"><span class="rArraw"></span></div>
				</div>
			</navigator>
		</div>
		
	</div>
</template>
 
<script>
	import allHead from '../../components/head'  
	
	export default {
		data() {
			return {
				Request: this.$api.api.prototype, //请求头
				util: this.$util.util.prototype, //工具类
				Msg:'',//检测是否有消息
				langua:'',//静态文字的与语种
			}
		},

		components: {
			allHead
		},
		computed: {
			isIphonex() {
				return this.$store.store.state.isIphonex
			},
		},
		methods: {
			//返回
			goBack(){
				wx.navigateBack();
			},
			//检测是否有新消息
			detectionMsg(){
				var that = this;
				that.Request.detectionMsg(wx.getStorageSync('sessionkey'),wx.getStorageSync('language'))
					.then(res =>{
						console.log(res)
						if(res.code == 200){
							that.Msg = res.data;
						}else if(res.code == 403){
							that.util.getSessionKey();
							setTimeout(function(){
								that.detectionMsg();
							},1500)
						}
					})
					.catch(res =>{
						console.log(res)
					})
			}
		},
		onShow(){
			this.langua = this.$util.util.prototype.changeLanguage();
			this.detectionMsg();
		}
	}
</script>

<style scoped>
	.msgList .tishi{
		position: absolute;
		display: inline-block;
		vertical-align: middle;
		top: 52rpx;
		width: 20rpx;
		height: 20rpx;
		border-radius: 100%;
		background-color: #F90000;
		right: 10%;
	}
	.msgList .R span{
		display: inline-block;
		width: 30rpx;
		height: 30rpx;
		vertical-align: middle;
	}
	.msgList .R{
		float: right;
	}
	.msgList .L span{
		display: inline-block;
		vertical-align: middle;
		width: 55rpx;
		height: 55rpx;
		margin-right: 16rpx;
		background-size: 100% 100% !important;
		margin-top: -5rpx;
	}
	.msgList .L{
		float: left;
		color: #2b2f37;
		font-size: 28rpx;
	}
	.msgCn .msgList{
		height: 114rpx;
		line-height: 114rpx;
		border-bottom: 2rpx solid #E5E5E5;
		position: relative;
	}
	.msgCn{
		padding: 0 5%;
	}
	.headText{
		font-size: 38rpx;
	}
	.head .back{
		width: 18rpx;
		height: 37rpx; 
		border: 1px soild red;
		padding-right: 20rpx;
		background-size: 18rpx 37rpx;
		background-repeat: no-repeat;
		position: absolute;
		margin: auto;
		top: 0;
		bottom: 0;
		left: 0;
	}
	.headSub {
		position: relative;
	}
	.head {
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 5%;
		color: #333333;
		font-size: 38rpx;
		position: fixed;
		padding-top: 47rpx;
		top: 0;
		z-index: 3;
		width: 90%;
		background-color: white;
		border-bottom: 2rpx solid #E5E5E5;
		text-align: center;
	}
	
	/*点赞*/
	.dianz{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjcxOERDQjk2QjU2NjExRTg5NUIwRTcwNUU4RDBEQzI0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjcxOERDQjk3QjU2NjExRTg5NUIwRTcwNUU4RDBEQzI0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzE4RENCOTRCNTY2MTFFODk1QjBFNzA1RThEMERDMjQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzE4RENCOTVCNTY2MTFFODk1QjBFNzA1RThEMERDMjQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6Iao3OAAAF8ElEQVR42tRa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');
	}
	/*评论*/
	.pinL{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjkyODAxMjdEQjU2NjExRTg5Rjk1QUZDRDFFRTJFMUUzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjkyODAxMjdFQjU2NjExRTg5Rjk1QUZDRDFFRTJFMUUzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTI4MDEyN0JCNTY2MTFFODlGOTVBRkNEMUVFMkUxRTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTI4MDEyN0NCNTY2MTFFODlGOTVBRkNEMUVFMkUxRTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7tqA+yAAAFxklEQVR42txaW2xUZRCePbvb7W17b20LRZtouQS1AoIkRvsg0HgJPAiNFIzRxEcTY01Mn3wQeSLCm76YqBSq8UHRBCghogaVJkqVOxqstYW20C72wrbb3T1+c3a22ZZtd/+z52y3TPL1nGz6X74z888/M//v0HWd5hPH3zdIUUqBp4F1QJ2gEigBnEAIGAYGgWvAJeAM8D0wRBaKwyJy1UAz0AQ8Bmgm5hIGzgJfAAeB6wtNbj3QCjwvWrFKWLvfAu8DnWY70Uy2WwkcE3PaajExkv62Sv9HZTzbyWXL1+wCtlB6pFHG2yvj22KWK2Q9PEwLJ+eAHcBlKzW3WUxkIYmRjN8p87GE3E7gG6CAMkO8Mp+dKZklTJLd+2f8SpknPPHdQJsyORDbJO44izJXAsALQEfS5EDsQTx+zSBTnE9GgLXAXwnXHIh58Ph8kRAjmSfP15OMQ3kXWEOLS9bIvOc2S2iN97LfM3ydzSVTwCOxe6Br1j/sVyHGLvQ1by5tz8umjZ4s8moOIyg0G2/dwYc+FwjS4TE/fQr4wmGVLtzAgdjIaVpz0Np62aiTkqUuJ/1QVUq1rkhYORAK0zj6Mhtk8kfJxteqdkZ6CKCvZ/qH6ceJgGpXG6LBdiy5ryRYTZywaRr1LKugXIeD3h4eoQ/+GzetsXjyUn4OHSovisR8vTfpylRQpfnXwLZpciC2BO89yYZjRytLqDHHQ1vwZTv8k7YsoJVuF11cWk7XQyFa0jOomhcuA/qiZJqTJbYcgzKx4yBlFzGWS9DWm0MjhpnyulbMdJpjt4ImFZNhaR0etd397R8ZN57P5XpUmxp8NJhkpZQGkpKHxIH0hEKULil0KOfU9YZrwJ8nVQLj6NLOSmMsHSLdTBLeoKlGI9GdR0tjnqCba7aBN/HlVkzgfpjr6epSY5tI1mDZwHuCIarvu0V+Xbf6m6xicnVWlascMVCxBN0ehT/A5O6zoqfeoPJ+ZLcU85orontTvJoEnPckOZekCikTrHRqdLiimIpMutEAFl6rb5ROWhf1jDK520B5qj15EEQ3ZKeWBtY4NSs1Z5AbsILcP3AoXMD1mtRcSI/kcxaKj8ldBVZb9rnCeqasuW62gyuqcY2xP6WRg8lg6CLP9TeVFtG6RIDSx85pjt4ZJndaJUi4FowEV8uczrSRG9PDqk24wSlNr63iY5yuZFu1j/uN554Sr+2kXpck9aRfuY7CFbyh6BJqT7bVhUCQvpsIGNn4phyPbcRqEIh/VFZII1jcH47eUW3eHusf2mKymYTSPOgz7LijsoTeKsyz/Fj1WWTe3TUVxntj/7BRCVM0ybbpApHxolD9MjJyt4t+qiqlMtl4/8Va5NKeSxbwGN63DfiMlCaevFfsNbTvdMx0HCvQr1t+246P+OX4hOq3ORLlYbpuycKlvVe8ObQrP8coys7I2NHt6r74Zbk9INZalB+3z/5QmD6GGX4y5qeraiW96SSVZtctheBxSvLUMp5kgWwI/bnxnJjDlN4Bqb0g1zk5RS9CM7dnVZVTDAL4KOvuirOQ47OCP+zKFN4oyKMDpQVG2W5V702ru+cE4FGKXNqZEXBEahW1VXyIsM8OYi2FEWLn4W3X9t2yY4h9scTu0pxoj/37z6RQ7ku4CDxu+qW6jLoCU/TUjSE74k++ebQRmJyXnBBcbCerfM/sz7niYJplnnwEu4MiZ86ZLDy/pnjE5iQnBNlzvmpfcSpl0WV+xxJlMHMR5J1+VwZqkD3jyzTPNY2E5EQOUeS8azRDiI1JBHIw2dwzkfDNOY5gLiwwMR7/cZkPWUWO5bJ4Jd5PgmkmFZRx11GSl9pUybFwFNsiWjyRJmInZLwWGZ/sIhe7aW6WjfOISrqkkLZwv0/IOGdN1V4svOO8W/bGejJ/x5kzaL4NxJfpFvyOczzh2+kNFLmPxcdjdfJbnkQ8HFHwebAP6AbOS4pyiiy+nf6/AAMAvYXq5aXECRkAAAAASUVORK5CYII=');
	}
	
	/*关注*/
	.guanZ{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk4RTJEMzM4QjU2NjExRThBREZEQTg1RTEzMkU4RjQwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk4RTJEMzM5QjU2NjExRThBREZEQTg1RTEzMkU4RjQwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OThFMkQzMzZCNTY2MTFFOEFERkRBODVFMTMyRThGNDAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OThFMkQzMzdCNTY2MTFFOEFERkRBODVFMTMyRThGNDAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Tao7hAAAGI0lEQVR42tRae0yVZRh/RAQNIy6maF6ADJHCFEltq+XawFYs3NyiobTVZtlss5KlVptWi8pGiX9Utmll6gxdJrjwUptutcI07GLIJUY4QArEBEThCP0e3wc5ns7l+97zfXDOb/vtXN/L77087/M83zti1sl+shix4ANgOpgkjANjwJHgVfA8+DdYB1aC5eAxsM3KjoywSNwkcCmYA84BQzTq6AMrwGJwB9g03OLmgS+DWTIrVoFn9wBYAB7XrSREs9xM8KAsp2yLhZHUly31l0l7tosbLaN5ClxEQ4OHpL23pH1bxCXLElkHhtHQgttbK+0nWy0uU5ZIKg0vUkVgplXicsFSMJICAzdLf3J9/THUx+9s3j9nq0qBhTA5LrhfO3VmLgPcFoDCrh9j0r9Ms+Kmg3uHwXDozOAe6a8hceHgFwG0x3whUvobbkTcBjCNggtp0m+v4vgMeZGCE6tdz0BXcZuCYJ95wiiwyNNRME/XpWKzlY1A58EoolkR2ATwDM90E53swIGE4Ka6+/9lJmOHLEaZ9LFEd6HMZcQEpzqJvrtItA+Bz5U+LYGZouO4a1TwlTirprAAR+r6aYh5vMz39haiwsbBz08juls5yfP/LziIXm8g+vaClsD94GJncbeBDWYd6UXRRBsT1PsTmKXiVswWRr/rqhKbid9XTFS/H/sXmxmh6ZrJRI/dqr77DKLL2onqL8PUoeW5mMWsGLUCGAVnYQb/0YoLp4KNA+JeAt8xU0M8/PP9Ker9e42qo+4wMUwNAC/Xxh6MIj7XQczqOvXqdm1hUN6VQVtWRfRbl2mBa8CNAzOVY7b0+4mDo+9JGKMZgvKq1F5iYacvES2p9CyMcRizua5evS9K1FqaOQPWMk5SA4Zx/y1EiZi51l41a0awsha+EgbhyWqsGwPB/9cwRD9gQGJhAx+JMS1uNudyWNx9Zv3Hh6PVq9n9UNRozgpukxWRZV4c61oYouONJN+kXn/tIltR0ale2dBoYD6Lm2G2VIIE+2wg7EQvlm+7Q1lSDaRwsSSzpfplz1zqI9vhRxvxLG6C2VK1YunGj7JfXCx8KM3kYzSLizJbis05Y8YYe4XxGTkaPfypQy8dESIOpykckKT30vH2ilsep173tuqL6zVb6kSnOoSTMHMZUfYIm4AhXzJOGZRD7VpVdLA4Lff0VfEgCuAmhdiQZdl0+43t6Ipr0SnJ+64EyzMMwgoTrBWWh+WegrO0vEO5bZpoZ3HVuqXX/0XU1qu8+FyL9h872PmIHBwwkS/U+VVVPYur0i3NR9AzteKGo0NzxvonbBz22XZxKVbUqtDJD/zB4n72p4aabhW+MD6FOzBd83gYg57sSlZO7msN2ubfGeUs7nvSPicVvoFJevOsONPJ5s+/iJFEe2YqC1nURPRlq9/CeFEdZXHNpB4R+YViRAhbUFMohr4YHU0zuET5oN6HoHdKONHWc4gEzlmydX8B2wZc0t1W1PhBsxp5xidYoo/G+s6/lNypZuwjlN3cRFZht3Nqb6dMpd/gkR84m96YNphDcQXnUbbcoY4SzpV82GyZsD7Rc10cx9OlVtXO6bzn/lTvn4W4gngXB2Aq0StT1HtOGmkkgbx6h6LnhtQe5/vKrWyFDcvHmJ0oePZVsKqlOPQzEMXfLXnK5TW2BLzzyU3eknGIDD61NIoYCNsMVyo1YvC7Sng3qzCzLb2WCztMToll1xh3lY4j7Q3nHSo9x0uPD2V22R4/Y4swrvF55y/c3UPhWwNrKfjwNqnLCORp5hgbSN3kCSZUkIFHWIwrbKnBi0EijPuZI/32Ke5amkQE9gS4sB4RVuPuR29JM7acT/nrd9qIfunfQU9/8JUR5JN+WQDOIFvGJ8jLNQ0j4hi7SD3v6ggQYZyH5ueIO3z90Wgut0w8mNPDLIzbv0f6Q1aJY+DovXb7tRB0DLEoh7SbLv0gq8UxONecL7N4ZIiEHZH28qV9skuc86HJPui9YIlV4ZJL2ML1LpB2tJyKUD878aNsbn58nydn42zSv+PMETTfBuLLdMN+x9kdOP5eCM4l9XgsSb7juCBSPAoOdDiPzGHt7xKiHCWLb6f/J8AAc1aZR6kOTSYAAAAASUVORK5CYII=');
	}
	
	
</style>