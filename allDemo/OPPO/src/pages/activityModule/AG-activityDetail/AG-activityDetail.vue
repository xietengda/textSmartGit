audit<template>
	<div class="container home" v-wechat-title="$route.meta.title">
      	<div class="headBox white_bg">
			<div class="describe_dir">当前位置：活动审核管理/<span>{{this.$route.meta.title}}</span>
			</div>
		</div>

		<div class="contentBox">

			<!-- 活动信息  模块 -->
			<div class="infoModule">
				<div class="agentAll">活动信息</div>
				<div class="inputView div_float">
					<div class="i_l">
						<div class="i_list">
							<div class="l"><span>*</span>代理商ID：</div>
							<div class="r">
								<input placeholder="请输入代理商ID"/>
							</div>
						</div>
						<div class="i_list">
							<div class="l"><span>*</span>所属代理商：</div>
							<div class="r">
								<input placeholder="请输入所属代理商"/>
							</div>
						</div>
						<div class="i_list">
							<div class="l"><span>*</span>支付金额：</div>
							<div class="r">
								<input placeholder="请输入支付金额"/>
							</div>
						</div>
						<div class="i_list">
							<div class="l"><span>*</span>返现红包金额：</div>
							<div class="r r_other">
								<input  placeholder="请输入红包金额"/>
								<span>~</span>
								<input placeholder="请输入红包金额"/>
							</div>
						</div>
						<div class="i_list">
							<div class="l"><span>*</span>代理商ID：</div>
							<div class="r">
								<input placeholder="请输入代理商ID"/>
							</div>
						</div>
						<div class="i_list l_banner div_float">
							<div class="l"><span>*</span>活动banner：</div>
							<div class="r"> <!--r_operate-->
								<!-- <el-carousel class="bannerBox">
									<el-carousel-item  v-for="item in 4" :key="item">
										<div class="b_item">{{item}}</div>
									</el-carousel-item>
								</el-carousel> -->
								<div class="bannerBox">
									<img src="../../../assets/images/pic_bg.png"/>
								</div>
								<button class="headBtn"><span class="iSpan el-icon-plus"></span>图片上传</button>
								<div class="hintText">建议尺寸：750*360</div>
							</div>
							
						</div>
					</div>
					<div class="i_r">
						<div class="i_list">
							<div class="l"><span>*</span>活动名称：</div>
							<div class="r">
								<input placeholder="请输入活动名称"/>
							</div>
						</div>
						<div class="i_list">
							<div class="l"><span>*</span>计划券总数：</div>
							<div class="r">
								<input placeholder="请输入计划券总数"/>
							</div>
						</div>
						<div class="i_list">
							<div class="l"><span>*</span>时间周期：</div>
							<div class="r">
								<el-date-picker
									class="selTimeBox"
									size="small"
									v-model="time"
									type="datetimerange"
									range-separator="~"
									start-placeholder="开始日期"
									end-placeholder="结束日期">
								</el-date-picker>
							</div>
						</div>
						<div class="i_list">
							<div class="l"><span>*</span>客服名称：</div>
							<div class="r">
								<input placeholder="请输入客服名称"/>
							</div>
						</div>
						<div class="i_list">
							<div class="l"><span>*</span>客服电话：</div>
							<div class="r">
								<input placeholder="请输入客服电话"/>
							</div>
						</div>
						<div class="i_list quillBox">
							<div class="l"><span>*</span>活动图文：</div>
							<div class="r">
								<quill-editor 
									class="r_Editor"
									v-model="infoForm.content" 
									ref="myQuillEditor" 
									:options="infoForm.editorOption" 
									@blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
									@change="onEditorChange($event)">
								</quill-editor>
							</div>
							
						</div>
					</div>
				</div>
			</div>

			<!--分享海报 模块 -->
			<div class="shareModule infoModule">
				<div class="agentAll">分享海报设置</div>
				<div class="inputView div_float">
					<div class="i_l">
						<div class="i_list o_list">
							<div class="l"><span>*</span>分享海报：</div>
							<div class="r">
								<img src="../../../assets/images/pic_bg.png"/>
								<button class="headBtn"><span class="iSpan el-icon-plus"></span>图片上传</button>
								<div  class="hintText">建议尺寸：400*300</div>
							</div>
						</div>
					</div>
					<div class="i_r">
						<div class="i_list o_list">
							<div class="l"><span>*</span>活动预览：</div>
							<div class="r">
								<img class="reviewCode" src="../../../assets/images/pic_bg.png"/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 参与门店列表 模块 -->
			<div>
				<div class="agentAll">参与门店列表</div>
				<!-- 搜索 -->
				<div class="searchBox div_float">
					<div class="s_left">
						<el-select class="selBox" size="small" v-model="selProvinces" filterable placeholder="区域">
							<el-option
							v-for="item in provincesList"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>


						<div class="sub_left inlineDom">
							<input class="saerchInput"  placeholder="请输入门店名称"/>
							<div class="seaBtn">搜索</div>
						</div>
					</div>
					<div class="s_right">
						<button class="headBtn" @click="cutChangeEdit"><span class="iSpan el-icon-plus"></span>新增门店</button>
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
							width="50">
						</el-table-column>
						<el-table-column
							prop="name"
							label="门店ID"
							align="center"
							width="180">
						</el-table-column>
						<el-table-column
							prop="address"
							align="center"
							label="门店名称">
						</el-table-column>
						<el-table-column
							prop="address"
							align="center"
							label="代理商区域">
						</el-table-column>
						<el-table-column
							prop="address"
							align="center"
							label="详细位置">
						</el-table-column>
						<el-table-column
							prop="address"
							align="center"
							label="核销密码（自动生成）">
						</el-table-column>
						<el-table-column
							prop="address"
							align="center"
							label="计划分配券量">
						</el-table-column>
						<el-table-column align="center" label="操作">
							<div class="blueText">编辑</div>
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

			<div class="btmBox">
				<button class="headBtn cancelBtn">取消</button>
				<button class="headBtn">提交</button>
			</div>


			<!--编辑添加门店 弹窗 -->
			<div class="dialogBox">
				<el-dialog 
					center
					:visible.sync="editStore"
					:close-on-click-modal="false"
					:close-on-press-escape="false"
					:show-close="false"
				>
					<div class="editAgentBox"> 
						<div>
							<div class="til">新增/编辑活动参与门店</div>
							<div class="inputBox">
								<div class="i_list div_float">
									<div class="l"><span>*</span>选择门店：</div>
									<div class="r">
										<el-select class="selBox" v-model="eidtSelSotre" filterable placeholder="请选择门店">
											<el-option
											v-for="item in editStoreList"
											:key="item.value"
											:label="item.label"
											:value="item.value">
											</el-option>
										</el-select>
									</div>
								</div>
								<div class="i_list div_float">
									<div class="l"><span>*</span>可分配券存量：</div>
									<div class="r">
										<input placeholder="" :disabled="true"/>
									</div>
								</div>
								<div class="i_list div_float">
									<div class="l"><span>*</span>计划分配券量：</div>
									<div class="r">
										<input placeholder="请选择输入计划分配券量"/>
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
// import { quillEditor } from 'vue-quill-editor' //调用编辑器

	export default {
		data() {
			return {
				Request: this.$api, //请求头
				util: this.$util.util.prototype, //工具类
				time:'',//时间
				infoForm: {
					a_title: '',
					a_source: '',
					a_content:'',
					editorOption: {
						theme:'snow',
						modules:{
					　　　toolbar:[
										['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
										[{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
										['clean'],    //清除字体样式
										['image']    //上传图片、上传视频
									]
							},
						}
				},
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
				provincesList: [{
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
				}],//区域列表
				selProvinces:'',//选区域
				editStore:false,//显示修改门店
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
				//选择门店
				editStoreList: [{
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
				}],//门店列表
				eidtSelSotre:'',//选中门店
			}
		},
		mounted() {
			
		},
		computed: {
			editor() {
				return this.$refs.myQuillEditor.quill
			}
		},
		components:{
			//使用编辑器
			// quillEditor
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
			//切换显示修改弹窗
			cutChangeEdit(){
				let sign = true;
				if(this.editStore){
					sign = false;
				}
				this.editStore = sign;
			},
			onEditorReady(editor) { // 准备编辑器
			},
			onEditorBlur(){}, // 失去焦点事件
			onEditorFocus(){}, // 获得焦点事件
			onEditorChange(){}, // 内容改变事件
			//提交门店信息
			saveAgentMsg(){

			}
		}
	}
</script>

<style scoped  lang="less">

	// 基础信息
	.infoModule{
		.inputView{
			>div{
				padding: 20px 0;
			}
			.i_l{
				float: left;
				width: 50%;
			}
			.i_r{
				float: right;
				width: 50%;
				//选择时间器
				.selTimeBox{
					width: 320px;
				}
			}
			// 输入框
			.i_list{
				height: 40px;
				line-height: 40px;
				margin-bottom: 20px;
				>div{
					height: 40px;
					line-height: 40px;
				}
				.l{
					float: left;
					width: 140px;
					font-size:16px;
					color: #333;
					text-align: right;
					span{
						color: red;
					}
				}
				.r{
					float: left;
					margin-left: 10px;
					input{
						padding-left: 20px;
						width: 300px;
						height: 40px;
						border:1px solid #dcdfe6;
						border-radius: 3px;
					}
				}
				.r_operate{
					height: 330px;
				}
				.r_other{
					input{
						width: 32%;
					}
				}
			}
			.o_list{
				height: 230px;
				.r{
					img{
						width: 300px;
						height: 180px;
					}
					.reviewCode{
						width: 220px;
						height: 220px;
					}
					.headBtn{
						display: block;
						// margin-left: 10px;
					}
					
				}
			}
			//轮播图
			.l_banner{
				height: initial !important;
				.r{
					min-height: 250px;
				}
				.bannerBox{
					width: 320px;
					height: 250px;
					border:1px solid #dcdfe6;
					.b_item{
						width: 320px;
						height: 250px;
					}
					img{
						width: 100%;
						height: 100%;
					}
					
				}
			}
			//富文本
			.quillBox{
				height: initial !important;
				.l,.r{
					float: initial;
				}
				.r{
					height: 500px;
					.r_Editor{
						width: 478px;
						height: 400px;
						margin: 0 auto;
					}
				}
			}
		}
	}

	.hintText{
		color: red;
		font-size: 16px;
		line-height: 40px;
		height: 40px;
	}


	.btmBox{
		margin-top: 50px;
		text-align: center;
	}
	.headBtn{
		margin-left: 0;
		.iSpan{
			color: white !important;
		}
	}
	.cancelBtn{
		background-color: white;
		color: #333;
		border:1px solid  #dcdfe6;
		margin-right: 50px;
	}	
	
	.agentAll{
		height: 60px;
		line-height: 60px;
		border-bottom: 1px solid #f2f2f2;
		padding-left: 20px;
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
<style>
	.el-carousel__container {
		height: 100% !important;
	}
	/* 富文本样式 */
	.ql-snow .ql-picker {
		line-height: 16px;
	}

	
</style>