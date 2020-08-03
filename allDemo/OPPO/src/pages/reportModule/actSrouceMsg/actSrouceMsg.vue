audit<template>
	<div class="container home" v-wechat-title="$route.meta.title">
      	<div class="headBox white_bg">
			<div class="describe_dir">当前位置：<span>{{this.$route.meta.title}}</span>
			</div>
		</div>



		<div class="contentBox">

			<!-- 活动信息 -->
			<!-- 表格 -->
			<div class="dataTable">
				<el-table
					:data="actMsgData"
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
						align="center"
						width="180">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="活动名称">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="所属代理商">
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
						label="计划门店数">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="时间周期">
					</el-table-column>
					<el-table-column align="center" label="活动状态">
						<div class="blueText">进行中</div>
					</el-table-column>
				</el-table>
			</div>



			<!-- 搜索 -->
			<div class="searchBox div_float">
				<div class="s_left">
					<el-select class="selBox" size="small" v-model="selActStatus" filterable placeholder="活动状态">
						<el-option
						v-for="item in statusList"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>


					<el-date-picker
						class="selTimeBox"
						size="small"
						v-model="searchTime"
						type="datetimerange"
						range-separator="~"
						start-placeholder="开始日期"
						end-placeholder="结束日期">
					</el-date-picker>


					<div class="sub_left inlineDom">
						<input class="saerchInput"  placeholder="请输入门店名称"/>
						<div class="seaBtn">搜索</div>
					</div>

				</div>
				<div class="s_right">
					<button class="headBtn"><span class="iSpan el-icon-download"></span>导出excel</button>
				</div>
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
						align="center"
						width="180">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="活动名称">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="所属代理商">
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
						label="计划门店数">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="时间周期">
					</el-table-column>
					<el-table-column align="center" label="活动状态">
						<div class="blueText">进行中</div>
					</el-table-column>
					<el-table-column align="center" label="操作">
						<div class="blueText">查看门店详细数据</div>
						<!-- <template slot-scope="scope">
							<el-button
							size="mini"
							@click="handleLook(scope.$index, scope.row)">查看</el-button>
						</template> -->
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
				actMsgData:[{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
					}],//活动信息
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
				StoreWindow:false,//是否显示查看窗口
				agentList: [{
					value: '选项1',
					label: '黄金糕'
					}, {
					value: '选项2',
					label: '双皮奶'
					}, {
					value: '选项3',
					label: '蚵仔煎'
					}, {
					value: '选项4',
					label: '龙须面'
					}, {
					value: '选项5',
					label: '北京烤鸭'
				}],//代理商列表
				selAgent:'',//选中代理商
				statusList: [{
					value: '选项1',
					label: '黄金糕'
					}, {
					value: '选项2',
					label: '双皮奶'
					}, {
					value: '选项3',
					label: '蚵仔煎'
					}, {
					value: '选项4',
					label: '龙须面'
					}, {
					value: '选项5',
					label: '北京烤鸭'
				}],//审核状态列表
				selActStatus:'',//选中活动状态
				searchTime:'',//搜索时间
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
	
	
</style>