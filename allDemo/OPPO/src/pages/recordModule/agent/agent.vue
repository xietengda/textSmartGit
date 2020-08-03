<template>
	<div class="container home" v-wechat-title="$route.meta.title">
      	<div class="headBox white_bg">
			<div class="describe_dir">当前位置：档案管理/<span>{{this.$route.meta.title}}</span>
			</div>
		</div>

		<div class="contentBox">
			<div class="agentAll">代理商总数：45</div>
			<!-- 搜索 -->
			<div class="searchBox div_float">
				<div class="s_left">
					<div class="sub_left inlineDom">
						<input  placeholder="请输入代理商名字"/>
						<div class="seaBtn">搜索</div>
					</div>
				</div>
				<div class="s_right">
					<button class="headBtn" @click="cutChangeEdit"><span class="iSpan el-icon-plus"></span>新增代理</button>
					<button class="headBtn"><span class="iSpan el-icon-upload"></span>下载模板</button>
					<button class="headBtn"><span class="iSpan el-icon-upload2"></span>导入excel</button>
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
						width="180">
					</el-table-column>
					<el-table-column
						prop="name"
						label="代理商ID"
						align="center"
						width="180">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="代理商名称">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="代理商联系人">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="联系电话">
					</el-table-column>
					<el-table-column align="center" label="操作">
						<template slot-scope="scope">
							<el-button
							size="mini"
							@click="handleEdit(scope.$index, scope.row)">编辑</el-button>
							<el-button
							size="mini"
							type="danger"
							@click="handleDelete(scope.$index, scope.row)">删除</el-button>
						</template>
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

			<!-- 弹窗 -->
			<div class="dialogBox">
				<el-dialog 
					center
					:visible.sync="AgentWindow"
					:close-on-click-modal="false"
					:close-on-press-escape="false"
					:show-close="false"
				>
					<div class="editAgentBox"> 
						<div>
							<div class="til">基础信息</div>
							<div class="inputBox">
								<div class="i_list div_float">
									<div class="l"><span>*</span>代理商ID：</div>
									<div class="r">
										<input placeholder="请输入代理商ID"/>
									</div>
								</div>
								<div class="i_list div_float">
									<div class="l"><span>*</span>代理商名称：</div>
									<div class="r">
										<input placeholder="请输入代理商名称"/>
									</div>
								</div>
								<div class="i_list div_float">
									<div class="l"><span>*</span>代理商联系人：</div>
									<div class="r">
										<input placeholder="请输入代理商联系人"/>
									</div>
								</div>
								<div class="i_list div_float">
									<div class="l"><span>*</span>联系人电话：</div>
									<div class="r">
										<input placeholder="请输入联系人电话："/>
									</div>
								</div>
							</div>
						</div>
						<div class="accountMsg">
							<div class="til">账号信息</div>
							<div class="inputBox">
								<div class="i_list div_float">
									<div class="l"><span>*</span>代理商后台账号：</div>
									<div class="r">
										<input placeholder="请输入代理商后台账号"/>
									</div>
								</div>
								<div class="i_list div_float">
									<div class="l"><span>*</span>后台密码：</div>
									<div class="r">
										<input placeholder="请输入后台密码"/>
									</div>
								</div>
							</div>
						</div>
					</div>


					<div slot="footer" class="dialog-footer">
						<el-button @click="cutChangeEdit">取 消</el-button>
						<el-button type="primary" @click="saveAgentMsg">提 交</el-button>
					</div>
				</el-dialog>
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
				},
				AgentWindow:false,//是否显示增加弹窗
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
			//修改
			handleEdit(index, row) {
				console.log(index, row);
			},
			//删除
			handleDelete(index, row) {
				console.log(index, row);
			},
			//点击改变页码
			changeSizeFun(ele){
				console.log("点击改变"+ele)
			},
			//切换显示修改弹窗
			cutChangeEdit(){
				let sign = true;
				if(this.AgentWindow){
					sign = false;
				}
				this.AgentWindow = sign;
			},
			//提交代理商信息
			saveAgentMsg(ele){
				this.AgentWindow = false;
			}
		}
	}
</script>

<style scoped  lang="less">
	

	.inlineDom{
		display: inline-block;
		vertical-align: middle;
	}
	
	//主内容框
	.contentBox{
		margin-top: 10px;
		background-color: white;
		border-radius: 4px;
		padding: 20px 30px;
		
		.searchBox{
			margin-top: 30px;
			.s_left{
				float: left;
				height: 50px;
				line-height: 50px;
				.sub_left{
					line-height: 30px;
					font-size: 0;
					input,>div{
						.inlineDom;
					}
					input{
						width: 250px;
						height: 30px;
						border: none;
						padding-left: 20px;
						border:1px solid #f2f2f2;
					}
					.seaBtn{
						width: 100px;
						height: 30px;
						text-align: center;
						line-height: 30px;
						color: white;
						background-color: #26B6BB;
						font-size: 14px;
						border: 1px solid #26B6BB;
					}
				}
			}
			.s_right{
				float: right;
				height: 50px;
				line-height: 50px;
				font-size: 0;
				.headBtn{
					.inlineDom;
					width: 100px;
					height: 30px;
					background-color: #26B6BB;
					border: none;
					color: white;
					text-align: center;
					font-size: 14px;
					border-radius: 5px;
					margin-left: 10px;
					cursor: pointer;
					.iSpan{
						.inlineDom;
						margin-right: 5px;
						margin-top: -2px;
					}
				}
			}
		}
		.dataTable{
			margin-top: 20px;
		}
		.pageBox{
			margin-top: 20px;
			text-align: right;
		}
	}

	

</style>