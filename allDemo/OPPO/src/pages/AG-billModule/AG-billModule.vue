<template>
	<div class="container home" v-wechat-title="$route.meta.title">
      	<div class="headBox white_bg">
			<div class="describe_dir">当前位置：<span>{{this.$route.meta.title}}</span>
			</div>
		</div>

		<div class="contentBox">

			<!-- 搜索 -->
			<div class="searchBox div_float">
				<div class="s_left">

					<el-select class="selBox" size="small" v-model="selBillStatus" filterable placeholder="请选择收款状态">
						<el-option
						v-for="item in billStatusList"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>


					<div class="seaTimeBox">
						<span>奖励时间：</span>
						<el-date-picker
							class="selTimeBox"
							size="small"
							v-model="awardTime"
							type="datetimerange"
							range-separator="~"
							start-placeholder="开始日期"
							end-placeholder="结束日期">
						</el-date-picker>
					</div>



					<div class="sub_left inlineDom">
						<input class="saerchInput"  placeholder="请输入奖励者微信昵称"/>
						<div class="seaBtn">搜索</div>
					</div>

				</div>
			</div> 


			<!-- 搜索结果总数预览 -->
			<div class="searchResult">
				<span class="til">本地搜索统计</span>
				<span>奖励个数：500</span>
				<span>奖励金额(元)：28954</span>
			</div>

			<!-- 表格 -->
			<div class="dataTable">
				<el-table
					:data="tableData"
					border
					:header-cell-style="{background:'#26B6BB',color:'white'}"
					style="width: 100%">
					<el-table-column
						prop="date"
						label="序号"
						align="center"
						width="50">
					</el-table-column>
					<el-table-column
						prop="name"
						label="活动ID"
						align="center">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="活动名称">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="时间周期">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="活动状态">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="计划券总数">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="已售券数">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="核销量">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="售券总金额">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="奖励金额">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="手续费">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="结算余额">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="手续费">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="收款状态">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="操作">
						<span class="blueText">确认收款</span>
					</el-table-column>
				</el-table>
			</div>

			<!-- 分页 -->
			<div class="pageBox">
				<el-pagination
					background
					@current-change="changeSizeFun"
					:current-page="pageObj.current"
					:page-size="pageObj.size"
					layout="total, prev, pager, next,jumper"
					:total="pageObj.total">
				</el-pagination>
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
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
					}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
					}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
					}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}],//表格数据
				pageObj:{
					current:1,
					size:10,
					total:100
				},//分页对象
				billStatusList: [{
					value: '选项1',
					label: '黄金糕'
					}, {
					value: '选项2',
					label: '双皮奶'
					}
				],//收款状态列表
				selBillStatus:'',//选中收款状态列表
				awardTime:'',//奖励时间
			}
		},
		mounted() {
		},
		components:{
			
		},
		created() {
			var that = this;
			// this.$route.meta.title = "啦啦啦";
			
		},
		methods:{
			//查看
			handleLook(index, row) {
				console.log(index, row);
				this.cutChangeEdit();
			},
			//点击改变页码
			changeSizeFun(ele){
				console.log("点击改变"+ele)
			},
			
		}
	}
</script>

<style scoped  lang="less">

	.searchResult{
		height: 60px;
		line-height: 60px;
		padding: 0 20px;
		color: white;
		font-size: 14px;
		background-color: #26B6BB;
		border-radius: 3px;
		margin-top: 30px;
		.til{
			font-size: 18px;
			font-weight: bold;
			margin-right: 20px;
		}
		>span{
			margin-right: 10px;
		}
	}

	.headImg{
		width: 50px;
		height: 50px;
		border-radius: 100%;
	}

	
	.contentBox .searchBox .s_left .selBox{
		width: 200px !important;
		margin-right: 20px;
	}
	.contentBox .searchBox .s_left{
		height: initial;
	}
	.saerchInput{
		width: 200px !important;
	}

	.selTimeBox{
		width: 300px;
	}
	.blueText{
		color: #2396EB;
		cursor: pointer;
	}
	.redText{
		color: red;
		cursor: pointer;
	}

	.headBtn{
		margin-left: 30px;
	}

	.seaTimeBox{
		display: inline-block;
		vertical-align: middle;
		color: #636363;
		font-size: 14px;
		margin-right: 40px;
	}
	
	
</style>