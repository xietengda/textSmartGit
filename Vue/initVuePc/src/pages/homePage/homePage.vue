<template>
	<div class="container home" v-wechat-title="$route.meta.title">
		<div class="contentBox">

			<p class="contentBox__title">今日数据</p>

			<!-- 数据头部 -->
			<div class="dataTop flex-sad">
				<div class="dataTop__item" :class="bgColorList[index % 5]" v-for="(item, index) in toDay" :key="`dataTop__item-${index}`">
					<p class="dataTop__item__title">{{item.name}}</p>
					<p class="dataTop__item__value">{{item.count}}</p>
				</div>
			</div>

		</div>
		<div class="contentBox">

			<!-- 搜索 -->
			<div class="dataTopBxo  div_float">
				<div class="d_list ">
					<div class="d_other">
						<span>当月用户分析：</span>
						<el-date-picker
							v-model="searchTime"
							type="month"
							value-format="yyyy-MM"
							format="yyyy-MM"
							:picker-options="endDate"
                    		@change="dateChange"
							placeholder="选择月">
						</el-date-picker>
					</div>
				</div>	
			</div> 


			<!-- 图表 -->
			<div class="chartBox" id="chartDom" v-if="showChart">
				<Chart id="test" :option="chartOptions"/>
			</div>
			

		</div>
    </div>
</template>

<script>
import Chart from "@/components/home/Chart.vue";
import Cookies from "js-cookie";

export default {
	components:{
		Chart,//图表
	},
	data() {
		return {
			chartOptions:{
				tooltip: {
					show: true,
					formatter: (params) => {
						var res='<div><p>' + params.seriesName + '</p></div>' 
						res += `<p>${this.searchTime.split('-')[0]}年${this.searchTime.split('-')[1]}月${params.name < 10 ? '0' + params.name : params.name}日: ${params.data}</p>`
						return res;
					},
				},
				legend: {
					data: ['挂号', '预约', '就诊']
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: [],
					splitLine :{    //网格线
						lineStyle:{
							type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
						},
						show: true //隐藏或显示
					}
				},
				yAxis: {
					type: 'value',
					splitNumber: 5,
					splitLine :{    //网格线
						lineStyle:{
							type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
						},
						show: true //隐藏或显示
					}
				},
				series: [{
					name: '挂号',
					data: [],
					type: 'line',
					// smooth: true,
					itemStyle : {
						normal : {
							color:'#d9001b', //改变折线点的颜色
							lineStyle:{
								color:'#d9001b' //改变折线颜色
							}
						}
					},
				}, {
					name: '预约',
					data: [],
					type: 'line',
					// smooth: true,
					itemStyle : {
						normal : {
							color:'#33cc33', //改变折线点的颜色
							lineStyle:{
								color:'#33cc33' //改变折线颜色
							}
						}
					},
				}, {
					name: '就诊',
					data: [],
					type: 'line',
					// smooth: true,
					itemStyle : {
						normal : {
							color:'#420080', //改变折线点的颜色
							lineStyle:{
								color:'#420080' //改变折线颜色
							}
						}
					},
				}]
			}, // 折线图数据
			searchTime: '',//选择时间周期
			showChart: false, // 是否显示折线图
			endDate: {
				disabledDate(time) {
					return time.getTime() > Date.now();
				},
			}, // 禁止选择时间
			toDay: [
				{name: '今天预约', count: 0},
				{name: '今天挂号', count: 0},
				{name: '今天就诊', count: 0},
				{name: '今天流水', count: 0},
				{name: '今天利润', count: 0},
			], // 今日数据
			bgColorList: [], // 数据背景色
		}
	},
	created() {
		let that = this,
		 	thisMonth = new Date(),
			bgColor = ['res__red', 'res__green', 'res__blue', 'res__orange', 'res__purple'];

		this.searchTime = `${thisMonth.getFullYear()}-${(thisMonth.getMonth()+1) < 10 ? '0' + (thisMonth.getMonth() + 1) : (thisMonth.getMonth() + 1)}`;
		this.getIndexMsg();
		this.bgColorList = bgColor.sort(this.randomsort);

	},
	mounted() { 
		
	},
	methods:{
		// 随机随机处理
		randomsort(a, b) {
			return Math.random() > .5 ? -1 : 1;
		},
		//获取首页统计信息
		getIndexMsg(){
			let that = this;
			let thisMonth = new Date(that.searchTime);
			// 获取当前月份日期
			let xAxisData = this.getDateCount(thisMonth.getFullYear(), (thisMonth.getMonth() + 1));
			let seriesData0 = this.randomNum(xAxisData.length, 0, 100);
			let seriesData1 = this.randomNum(xAxisData.length, 0, 100);
			let seriesData2 = this.randomNum(xAxisData.length, 0, 100);
			this.chartOptions.xAxis.data = xAxisData;
			this.chartOptions.series[0].data = seriesData0;
			this.chartOptions.series[1].data = seriesData1;
			this.chartOptions.series[2].data = seriesData2;
			that.showChart = true;
		},
		// 更改日期
		dateChange(date) {
			this.searchTime = date;
			this.getIndexMsg();
		},
		// 获取指定月份日期
		getDateCount(y, m) {
			if (!y || !m) return false;
			let d = new Date(y, m, 0);
			let num = d.getDate();

			let toDay = this.$util.getToday();
			if (y == toDay.split('-')[0] && m == toDay.split('-')[1]) {
				num = Number(toDay.split('-')[2])
			}

			let newArray = new Array(num).fill('').map((item, index) => index + 1);
			return newArray;
		},
		// 生成随机数
		randomNum(size = 0, min = 0, max = 100){
			if (min > max) [max, min] = [min, max];
			if (size > (max - min + 1)) throw 'Parameter error!';
			var randomArr = [];
			while(randomArr.length < size){
				// Math.floor(Math.random()*(max-min+1)+min);
				var number = Math.floor(Math.random() * (max - min + 1) + min);
				if (!randomArr.includes(number)) randomArr.push(number);
			}
			return randomArr;
		},
	},
	watch:{ },
}
</script>

<style scoped  lang="less">
	// 顶部导航
	.headBox{
		width: 100%;
		border-top: 4px solid @themecolor;
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
	.s_left{
		>span{
			color: #333;
			font-size: 14px;
			font-weight: bold;
		}
		// padding-left: 4%;
	}
	
	//主内容框
	.contentBox{
		// margin-top: 0;
		margin: 0 auto 20px;
		background-color: white;
		border-radius: 4px;
		padding: 20px 30px;
		.dataTopBxo{
			.d_list{
				width: 50%;
				// text-align: center;
				font-size: 18px;
				color: #666666;
				float: left;
				.d_other{
					width: 100%;
					text-align: left;
					margin-top: 20px;
				}
				.d_sub{
					width: 300px;
					height: 130px;
					line-height: 130px;
					border-radius: 6px;
					background-color: #EEE;
					padding: 0 20px;
				}
				.theOne{
					background-color: #E7505A;
				}
				.theTwo{
					background-color: #32c5D2;
				}
				.theThird{
					background-color: #3598Dc;
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
					margin-bottom: 10px;
					color: white;
				}
				.inline{
					font-size: 22px;
					color: white;
					line-height: 35px;
					text-align: left;
				}
				.inline2{
					font-size:  22px;
				}
			}
		}
		.chartBox{
			width: 100%;
			margin:0 auto;
			margin-top: 50px;
		}


		.contentBox__title {
			font-size: 18px;
			color: #666666;
			line-height: 36px;
		}
		.dataTop {
			margin: 20px 0;
			&__item{
				padding: 20px 60px;
				color: white;
				font-size: 28px;
				border-radius: 6px;
				min-width: 100px;
				&__title {
					font-weight: bold;
					font-size: 20px;
					margin-left: -40px;
				}
				&__value{
					text-align: center;
					margin: 20px 0;
				}
			}
		}
	}

	.res__red {
		background-color: #E7505A;
	}
	.res__blue {
		background-color: #3598Dc;
	}
	.res__green {
		background-color: @themecolor;
	}
	.res__orange {
		background-color: #E6A23C;
	}
	.res__purple {
		background-color: #a14fc5;
	}

</style>