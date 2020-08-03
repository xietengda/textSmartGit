userManagementaudit<template>
	<div class="container home" v-wechat-title="$route.meta.title">
      	<div class="headBox white_bg">
			<div class="describe_dir">当前位置：<span>{{this.$route.meta.title}}</span>
			</div>
		</div>

		<div class="contentBox">
			<div class="searchBox div_float">
				<div class="s_right">
					<button class="headBtn" @click="cutChangeEdit"><span class="iSpan el-icon-plus"></span>新增角色</button>
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
						label="角色"
						align="center"
						width="180">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="账号状态">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="创建时间">
					</el-table-column>
					
					<el-table-column align="center" label="操作">
						<span class="blueText" @click="cutChangeEdit">编辑角色</span>
						<span class="blueText" @click="cutChangeRole">编辑权限</span>
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

			<!--角色编辑 弹窗 -->
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
							<div class="til">角色编辑</div>
							<div class="inputBox">
								<div class="i_list div_float">
									<div class="l"><span>*</span>角色名称：</div>
									<div class="r">
										<input placeholder="请输入角色名称"/>
									</div>
								</div>
								<div class="i_list div_float">
									<div class="l"><span>*</span>角色状态：</div>
									<div class="r">
										<el-select class="selBox" v-model="roleStatus" filterable placeholder="请选择角色状态">
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

			<!--角色权限配置 弹窗 -->
			<div class="dialogBox">
				<el-dialog 
					center
					:visible.sync="editPower"
					:close-on-click-modal="false"
					:close-on-press-escape="false"
					:show-close="false"
				>
					<div class="editAgentBox"> 
						<div>
							<div class="til">角色权限编辑</div>
							<div class="inputBox">
								<div class="i_list div_float">
									<div class="l"><span>*</span>角色名称：</div>
									<div class="r">
										<input placeholder="请输入角色名称"/>
									</div>
								</div>
							</div>
						</div>
						<div class="powerBox">
							<div class="p_list">
								<el-checkbox v-model="power.index">首页</el-checkbox>
							</div>
							<div class="p_list">
								<el-checkbox v-model="power.case.allCase" @change="changePowerFun($event,'allCase')" >档案管理</el-checkbox>
								<div class="sub_list">
									<el-checkbox v-model="power.case.agentCase" @change="changePowerFun($event,'agentCase')">代理商档案</el-checkbox>
									<el-checkbox v-model="power.case.storeCase" @change="changePowerFun($event,'storeCase')">门店档案</el-checkbox>
								</div>
							</div>
							<div class="p_list">
								<el-checkbox v-model="power.activity">活动审核</el-checkbox>
							</div>
							<div class="p_list">
								<el-checkbox v-model="power.dataTable.allData" @change="changePowerFun($event,'allData')">报表中心</el-checkbox>
								<div class="sub_list">	
									<el-checkbox v-model="power.dataTable.actData" @change="changePowerFun($event,'actData')">活动数据</el-checkbox>
									<el-checkbox v-model="power.dataTable.orderData" @change="changePowerFun($event,'orderData')">订单&券核销数据</el-checkbox>
									<el-checkbox v-model="power.dataTable.awardData" @change="changePowerFun($event,'awardData')">奖励数据</el-checkbox>
								</div>
							</div>
							<!-- 代理商才有的对账管理 -->
							<div class="p_list">
								<el-checkbox v-model="power.bill">对账管理</el-checkbox>
							</div>
							<div class="p_list">
								<el-checkbox v-model="power.system.sAll" @change="changePowerFun($event,'sAll')">系统管理</el-checkbox>
								<div class="sub_list">
									<el-checkbox v-model="power.system.user" @change="changePowerFun($event,'user')">后台用户管理</el-checkbox>
									<el-checkbox v-model="power.system.role" @change="changePowerFun($event,'role')">后台角色管理</el-checkbox>
								</div>
							</div>
						</div>
					</div>


					<div slot="footer" class="dialog-footer">
						<el-button @click="cutChangeRole">取 消</el-button>
						<el-button type="primary" @click="savePowerMsg">提 交</el-button>
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
				}],//角色状态列表
				roleStatus:'',//选中角色状态
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
				editUser:false,//是否显示角色弹窗
				editPower:false,//是否显示权限弹窗
				power:{
					index:false,//首页
					case:{ 
						allCase:false,//全部档案
						agentCase:false,//代理商档案
						storeCase:false,//门店档案
					},
					activity:false,//活动
					dataTable:{
						allData:false,//全部数据
						actData:false,//活动报表
						orderData:false,//订单&券核销数据
						awardData:false,//奖励数据
					},
					bill:false,//对账管理
					system:{ 
						sAll:false,//全部管理
						user:false,//后台用户管理
						role:false,//后台角色管理
					},
				},//权限列表
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
			//切换显示权限弹窗
			cutChangeRole(){
				let sign = true;
				if(this.editPower){
					sign = false;
				}
				this.editPower = sign;
			},
			//提交角色编辑
			saveAgentMsg(ele){
				this.editUser = false;
			},
			//修改权限
			changePowerFun(ele,type){
				console.log(ele);
				console.log(type)
				//这里的默认值需要取与data默认值相反
				//判断是不是档案管理
				if(type == 'allCase'){
					let cSign = false;
					if(ele){
						cSign = true;
					}
					this.power.case.allCase = cSign;
					this.power.case.agentCase = cSign;
					this.power.case.storeCase = cSign;
				}
				//代理商
				else if(type == 'agentCase'){
					if(ele){
						//当代理商选中时，判断门店是否选中、
						if(this.power.case.storeCase){
							this.power.case.allCase = true;
						}
					}else{
						this.power.case.allCase = false;
					}
				}
				//门店
				else if(type == 'storeCase'){
					if(ele){
						//当门店选中时，判断门店是否选中、
						if(this.power.case.agentCase){
							this.power.case.allCase = true;
						}
					}else{
						this.power.case.allCase = false;
					}
				}
				//报表中心
				else if(type == 'allData'){
					let aSign = false;
					if(ele){
						aSign = true;
					}
					this.power.dataTable.allData = aSign;
					this.power.dataTable.actData = aSign;
					this.power.dataTable.orderData = aSign;
					this.power.dataTable.awardData = aSign;
				}
				//活动数据
				else if(type == 'actData'){
					if(ele){
						//判断订单，奖励是否选中
						if(this.power.dataTable.orderData && this.power.dataTable.awardData){
							this.power.dataTable.allData = true;
						}
					}else{
						this.power.dataTable.allData = false;
					}
				}
				//订单&券核销数据
				else if(type == 'orderData'){
					if(ele){
						//判断订单，奖励是否选中
						if(this.power.dataTable.actData && this.power.dataTable.awardData){
							this.power.dataTable.allData = true;
						}
					}else{
						this.power.dataTable.allData = false;
					}
				}
				//奖励
				else if(type == 'awardData'){
					if(ele){
						//判断活动，订单是否选中
						if(this.power.dataTable.actData && this.power.dataTable.orderData){
							this.power.dataTable.allData = true;
						}
					}else{
						this.power.dataTable.allData = false;
					}
				}
				//系统
				else if(type == 'sAll'){
					let aSign = false;
					if(ele){
						aSign = true;
					}
					this.power.system.sAll = aSign;
					this.power.system.user = aSign;
					this.power.system.role = aSign;
				}
				//后台用户
				else if(type == 'user'){
					if(ele){
						//判断后台角色是否选中
						if(this.power.system.role){
							this.power.system.sAll = true;
						}
					}else{
						this.power.system.sAll = false;
					}
				}
				//后台角色
				else if(type == 'role'){
					if(ele){
						//判断后台用户是否选中
						if(this.power.system.user){
							this.power.system.sAll = true;
						}
					}else{
						this.power.system.sAll = false;
					}
				}
			},
			//提交角色权限
			savePowerMsg(){
				this.editPower = true;
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
	.powerBox{
		padding:10px 48px;
		.p_list{
			margin-bottom: 10px;
			.sub_list{
				margin-left: 20px;
				margin-top: 5px;
			}
		}
	}
	
	
</style>
<style>
	
</style>