<template>
	<div class="container home" v-wechat-title="$route.meta.title">
      	<div class="headBox white_bg">
			<div class="describe_dir">当前位置：档案管理/<span>{{this.$route.meta.title}}</span>
			</div>
		</div>

		<div class="contentBox">
			<div class="agentAll">门店总数：45</div>
			<!-- 搜索 -->
			<div class="searchBox div_float" >
				<div class="s_left">
					<el-select class="selBox" size="small" v-model="selAgent" filterable placeholder="代理商名称">
						<el-option
						v-for="item in agentList"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>

					<el-select class="selBox" size="small" v-model="selArea" filterable placeholder="区域">
						<el-option
						v-for="item in areaList"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>

					<div class="sub_left inlineDom">
						<input  placeholder="请输入门店名称"/>
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
						label="省市区">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="详细地址">
					</el-table-column>
					<el-table-column
						prop="address"
						align="center"
						label="所属代理商">
					</el-table-column>
					<el-table-column align="center" label="操作">
						<template slot-scope="scope">
							<el-button
							size="mini"
							@click="handleLook(scope.$index, scope.row)">查看</el-button>
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

			<storeInfoMsg  :showLayer="StoreWindow" :storeMsg="storeInfo" @changeStoreLayer="cutChangeEdit" @changeProvinces="storeProvinces" :disablesInput="true" @changeMsg="changeStoreMsg"/>

		</div>
    </div>
</template>

<script>
//修改门店弹窗
import storeInfoMsg from '../../../components/recordModule/storeMsgCom';

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
				areaList: [{
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
				selArea:'',//选中区域
				storeInfo:{
					storeId:"id",
					storeName:"名称",
					storeAgent:"代理商",
					storeAddress:"详细地址",
					storeUser:"店长",
					storeUserPhone:"15913566750",
					Provinces:[
						{
						value: 'zhinan',
						label: '指南',
							children: [{
								value: 'shejiyuanze',
								label: '设计原则',
								children: [{
								value: 'yizhi',
								label: '一致'
								}, {
								value: 'fankui',
								label: '反馈'
								}, {
								value: 'xiaolv',
								label: '效率'
								}, {
								value: 'kekong',
								label: '可控'
								}]
							}]
						}
					],//省市区
					provincesValue:["zhinan", "shejiyuanze", "xiaolv"]
				},//门店信息
			}
		},
		mounted() {
		},
		components:{
			storeInfoMsg,//门店信息弹窗
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
			//切换显示门店弹窗
			cutChangeEdit(){
				let sign = true;
				if(this.StoreWindow){
					sign = false;
				}
				this.StoreWindow = sign;
			},
			//更改门店位置
			storeProvinces(ele){
				console.log(ele)
				this.storeInfo.provincesValue = ele;
			},
			//更改店铺信息
			changeStoreMsg(newMsg){
				//子组件传了 key 和 value
				this.storeInfo[newMsg.key] = newMsg.value; 
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
		.agentAll{
			color: #333;
			font-size: 20px;
			font-weight: bold;
		}
		.searchBox{
			margin-top: 30px;
			.s_left{
				float: left;
				height: 50px;
				line-height: 50px;
				.selBox{
					width: 145px;
				}
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