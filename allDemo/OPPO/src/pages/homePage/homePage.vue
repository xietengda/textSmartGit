<template>
	<div class="container home" v-wechat-title="$route.meta.title">
      	<div class="headBox white_bg">
			<div class="describe_dir">当前位置：我的工单/<span>{{this.$route.meta.title}}</span>
			</div>
		</div>

		<div class="contentBox">
			<!-- 数据头部 -->
			<div class="dataTopBxo div_float">
				<div class="d_list">
					<div class="d_sub">
						<div class="d_sub_s">
							<div class="til">活动数量</div>
							<div class="inline">上线中：300</div>
							<div class="inline">以下线：200</div>
						</div>
					</div>
				</div>	
				<div class="d_list">
					<div class="d_sub">
						<div class="d_sub_s">
							<div class="til">今日流量</div>
							<div class="inline inline2">今日浏览量（PV）：9600</div>
							<div class="inline inline2">今日访客数（UV）：3500</div>
						</div>
					</div>
				</div>
				<div class="d_list">
					<div class="d_sub">
						<div class="d_sub_s">
							<div class="til">审核数据</div>
							<div class="inline">已审核：300</div>
							<div class="inline">待审核：200</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 图表 -->
			<div class="chartBox" id="chartDom">
				<div id="myChart" :style="{width: '300px', height: '300px'}"></div>
			</div>

		</div>
    </div>
</template>

<script>

	export default {
		data() {
			return {
				Request: this.$api, //请求头
				util: this.$util.util.prototype, //工具类
				chartOptions:[
					{ year: '1951 年', sales: 38 },
					{ year: '1952 年', sales: 52 },
					{ year: '1956 年', sales: 61 },
					{ year: '1957 年', sales: 145 },
					{ year: '1958 年', sales: 48 },
				],
				creenWidth: document.documentElement.clientWidth,//屏幕宽度
                screenHeight: document.documentElement.clientHeight,//屏幕高度
			}
		},
		mounted() {
			this.drawLine();
			var _this = this;
            window.onresize = function(){ // 定义窗口大小变更通知事件
                _this.screenWidth = document.documentElement.clientWidth; //窗口宽度
                _this.screenHeight = document.documentElement.clientHeight; //窗口高度
            };
		},
		watch:{
			'screenWidth':function(val){ //监听屏幕宽度变化
			console.log(val)
               this.drawLine();
            },
            'screenHeight':function(){ //监听屏幕高度变化
                this.drawLine();
            }
        },
		components:{
		},
		created() {
			var that = this;
			// this.$route.meta.title = "啦啦啦";
			
		},
		methods:{
			drawLine(){
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.$echarts.init(document.getElementById('chartDom'))
				// 绘制图表
				myChart.setOption({
					title: { 
						text: '活动参与量',
						x:'center',
						y:'top',
						textAlign:'center'
					 },
					tooltip: {},
					xAxis: {
						type: 'category',
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [820, 932, 901, 934, 1290, 1330, 1320],
						type: 'line'
					}]
				});
			}
		}
	}
</script>

<style scoped  lang="less">
	// 顶部导航
	.headBox{
		width: 100%;
		border-top: 4px solid #26B6BB;
		border-radius: 4px;
		margin-bottom: 12px;
		.describe_dir{
			padding-left: 30px;
			line-height: 55px;
			color: #666666;
			border-bottom: 1px solid#EBEBEB;
			span{
			color:#000;
			}
		}
	}
	
	//主内容框
	.contentBox{
		margin-top: 10px;
		background-color: white;
		border-radius: 4px;
		padding: 20px 30px;
		.dataTopBxo{
			.d_list{
				width: 33%;
				text-align: center;
				float: left;
				.d_sub{
					width: 300px;
					height: 130px;
					line-height: 130px;
					border-radius: 10px;
					background-color: #EEE;
					padding: 0 20px;
				}
				>div,>div>div{
					display: inline-block;
					vertical-align: middle;
				}
				.d_sub_s{
					line-height: 30px;
					width: 100%;
				}
				.til{
					font-size:22px;
					font-weight: bold;
					line-height: 25px;
					margin-bottom: 10px;;
				}
				.inline{
					font-size: 22px;
					color: #666;
					line-height: 35px;
					text-align: left;
				}
				.inline2{
					font-size:  22px;
				}
			}
		}
		.chartBox{
			width: 90%;
			height: 500px;
			margin:0 auto;
			margin-top: 20px;
		}
	}

</style>