userManagementaudit<template>
	<div class="container home" v-wechat-title="$route.meta.title">
      	<div class="headBox white_bg">
			<div class="describe_dir">当前位置：<span>{{this.$route.meta.title}}</span>
			</div>
		</div>

		<div class="contentBox">
			<div class="searchBox div_float">
				<div class="s_right">
					<button class="headBtn" @click="cutChangeEdit"><span class="iSpan el-icon-plus"></span>新增账号</button>
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
						label="账号"
						align="center"
						width="180">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="账号绑定者">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="角色">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="注册时间">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="最后登录时间">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="最后登录IP">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="账号状态">
					</el-table-column>
					<el-table-column align="center" label="账号装填">
						<div class="redText">禁用</div>
					</el-table-column>
					<el-table-column align="center" label="操作">
						<span class="blueText">启用</span>
						<span class="blueText" @click="cutChangeEdit">编辑</span>
						<span class="blueText">删除</span>
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
					:visible.sync="editUser"
					:close-on-click-modal="false"
					:close-on-press-escape="false"
					:show-close="false"
				>
					<div class="editAgentBox"> 
						<div>
							<div class="til">账号编辑</div>
							<div class="inputBox">
								<div class="i_list div_float">
									<div class="l"><span>*</span>账号名称：</div>
									<div class="r">
										<input placeholder="请输入账号名称"/>
									</div>
								</div>
								<div class="i_list div_float">
									<div class="l"><span>*</span>密码：</div>
									<div class="r">
										<input placeholder="请输入密码"/>
									</div>
								</div>
								<div class="i_list div_float">
									<div class="l"><span>*</span>确认密码：</div>
									<div class="r">
										<input placeholder="请再次输入密码"/>
									</div>
								</div>
								<div class="i_list div_float">
									<div class="l"><span>*</span>选择角色：</div>
									<div class="r">
										<el-select class="selBox" v-model="selRole" filterable placeholder="请选择角色">
											<el-option
											v-for="item in roleList"
											:key="item.value"
											:label="item.label"
											:value="item.value">
											</el-option>
										</el-select>
									</div>
								</div>
								<div class="i_list div_float">
									<div class="l"><span>*</span>账号状态：</div>
									<div class="r">
										<el-select class="selBox" v-model="selRole" filterable placeholder="请选择账号状态">
											<el-option
											v-for="item in roleList"
											:key="item.value"
											:label="item.label"
											:value="item.value">
											</el-option>
										</el-select>
									</div>
								</div>
								<div class="i_list o_list div_float">
									<div class="l"><span>*</span>备注：</div>
									<div class="r">
										<textarea class="i_remark" placeholder="请输入备注"></textarea>
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
				},//分页对象
				StoreWindow:false,//是否显示查看窗口
				roleList: [{
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
				}],//角色列表
				selRole:'',//选中角色
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
				}],//账号状态列表
				selActStatus:'',//选中审核状态
				searchTime:'',//搜索时间
				editUser:false,//是否显示修改弹窗
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
			//点击改变页码
			changeSizeFun(ele){
				console.log("点击改变"+ele)
			},
			//切换显示修改弹窗
			cutChangeEdit(){
				let sign = true;
				if(this.editUser){
					sign = false;
				}
				this.editUser = sign;
			},
			//提交代理商信息
			saveAgentMsg(ele){
				this.editUser = false;
			}
			
		}
	}
</script>

<style scoped  lang="less">
	
	.blueText{
		color: #2396EB;
		cursor: pointer;
	}
	.redText{
		color: red;
		cursor: pointer;
	}
	.i_remark{
		width: 520px;
		height: 100px;
		resize: none;
		margin-top: 5px;
		padding:10px;
		border:1px solid #dcdfe6;
	}
	
	
</style>
<style>
	.editAgentBox .inputBox .o_list{
		height: 120px;
	}
	.editAgentBox .inputBox .i_list .r .selBox input{
		width: 522px;
	}
</style>