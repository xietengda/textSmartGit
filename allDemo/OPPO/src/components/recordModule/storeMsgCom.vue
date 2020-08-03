<template>
    <!-- 弹窗 -->
			<div class="dialogBox">
				<el-dialog 
					center
					title='查看门店档案'
					:visible.sync="showLayer"
					:close-on-click-modal="false"
					:close-on-press-escape="false"
					:show-close="false"
				>
					<div class="editAgentBox"> 
						<div>
							<div class="inputBox">
								<div class="i_list div_float">
									<div class="l"><span>*</span>门店ID：</div>
									<div class="r">
										<input v-model="storeInfo.storeId" :disabled="disablesInput" placeholder="请输入门店ID"/>
									</div>
								</div>
								<div class="i_list div_float">
									<div class="l"><span>*</span>门店名称：</div>
									<div class="r">
										<input  v-model="storeInfo.storeName" :disabled="disablesInput" placeholder="请输入门店名称"/>
									</div>
								</div>
								<div class="i_list div_float">
									<div class="l"><span>*</span>所属代理商：</div>
									<div class="r">
										<input  v-model="storeInfo.storeAgent" :disabled="disablesInput" placeholder="请输入所属代理商"/>
									</div>
								</div>
								<div class="i_list div_float">
									<div class="l"><span>*</span>门店位置：</div>
									<div class="r">
										<el-cascader
										class="proSel"
										:disabled="disablesInput"
										v-model="storeInfo.provincesValue"
										:options="storeInfo.Provinces"
										@change="handleChange"></el-cascader>
										<input class="shortInput"   v-model="storeInfo.storeAddress" :disabled="disablesInput" placeholder="请输入门店详细位置"/>
									</div>
								</div>
								<div class="i_list div_float">
									<div class="l"><span>*</span>店长姓名：</div>
									<div class="r">
										<input  v-model="storeInfo.storeUser" :disabled="disablesInput" placeholder="请输入店长姓名"/>
									</div>
								</div>
								<div class="i_list div_float">
									<div class="l"><span>*</span>店长电话：</div>
									<div class="r">
										<input v-model="storeInfo.storeUserPhone" :disabled="disablesInput" placeholder="请输入店长电话"/>
									</div>
								</div>
							</div>
						</div>
					</div>


					<div slot="footer" class="dialog-footer">
						<el-button @click="cutChangeEdit">返 回</el-button>
					</div>
				</el-dialog>
		</div>

</template>
<script>
export default {
  data () {
    return {
      storeInfo:{
        storeId:"",
					storeName:"",
					storeAgent:"",
					storeAddress:"",
					storeUser:"",
					storeUserPhone:"",
					Provinces:[	
					],//省市区
					provincesValue:[]
      }
    }
  },
  props:{
    showLayer: {
      default: 'false',
      type: Boolean
    },
    storeMsg: {
      type: Object
    },
    disablesInput:{
      default: 'false',
      type:Boolean
    }
  },
  watch: {
      //以下监听所有的店铺信息输入
      'storeInfo.storeId'(newvalue) {
        this.changeInput('storeId',newvalue);
      },
      'storeInfo.storeName'(newvalue) {
        this.changeInput('storeName',newvalue);
      },
      'storeInfo.storeAgent'(newvalue) {
        this.changeInput('storeAgent',newvalue);
      },
      'storeInfo.storeAddress'(newvalue) {
        this.changeInput('storeAddress',newvalue);
      },
      'storeInfo.storeUser'(newvalue) {
        this.changeInput('storeUser',newvalue);
      },
      'storeInfo.storeUserPhone'(newvalue) {
        this.changeInput('storeUserPhone',newvalue);
      }
    },
  methods: {
    //返回
    cutChangeEdit(){
      this.$emit('changeStoreLayer');
    },
    //更改省市区
    handleChange(ele){
      this.$emit('changeProvinces',ele);
    },
    //更改输入值
    changeInput(keyx,valuex){
      let sign  = {
        key:keyx,
        value:valuex
      };
      this.$emit('changeMsg',sign);
    }
  },
  computed: {
    
  },
  created () {
  },
  mounted () {
    this.storeInfo = this.storeMsg;
  }
}
</script>
<style lang="less" scoped>
    .editAgentBox{
		.inputBox{
			margin-top: 10px;
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
						width: 500px;
						height: 40px;
						border:1px solid #dcdfe6;
						border-radius: 3px;
					}
					.proSel{
						width: 248px;
					}
					.shortInput{
						width: 248px;
					}
				}
			}
		}
	}

</style>
