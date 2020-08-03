<template>
  <div id="app">
    <router-view ></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">



    // 进度条
    #nprogress .bar {
      background: #26B6BB !important;
    }

    .inlineDom{
		display: inline-block;
		vertical-align: middle;
  }
  

  //头部
  .headBox{
      width: 100%;
      border-top: 4px solid #26B6BB;
      border-radius: 4px;
      margin-bottom: 12px;
      .describe_dir{
        padding-left: 30px;
        line-height: 55px;
        color: #666666;
        border-bottom: 1px solid#DCDFE6;
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
						border:1px solid #d9d7df;
						border-top-left-radius: 3px;
						border-bottom-left-radius: 3px;
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
						cursor: pointer;
						border-top-right-radius: 3px;
						border-bottom-right-radius: 3px;
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
					border-radius: 3px;
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

	//确定按钮
	.el-button--primary{
		background-color: #26B6BB !important;
    	border-color: #26B6BB !important;
	}

	//弹窗
	.editAgentBox{
		.til{
			height: 40px;
			line-height: 40px;
			border-bottom: 1px solid #c5c3c3;
			color: #333;
			font-size:20px;
			font-weight: bold;
			padding-left: 20px;
			margin-bottom: 20px;
		}
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
				}
			}
		}
		.accountMsg{
			margin-top: 30px;
		}
	}

</style>
