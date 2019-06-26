<template>
	<div class="container CnTop">

		<!--公共头部-->
		<allHeand :headTil='headTil' :hiddenBack='hiddenBack' />

		<!--未登陆-->
		<div v-if="!login" class='my_head div_float'>
			<img src='../../../static/img/list2.png' />
			<div class='my_head_msg'>
				<navigator url='../login/login' hover-class="none">
					<div>立即登录</div>
				</navigator>
				<div>登录获取更多权益</div>
			</div>
			<text class='my_head_right'>></text>
		</div>

		<!--已登录-->
		<div v-else="login" class='my_head my_head2 div_float'>
			<img src='../../../static/img/list2.png' />

			<div class='head_login'>
				<navigator url='../editPerson/editPerson' hover-class='none'>
					<div class='head_name'>奶牛先生<text class='editIcon'></text></div>
					<div class='head_phone'><text class='phoneIcon'></text>
						<div>13333333333</div>
					</div>
				</navigator>
			</div>

		</div>


		<div class='my_order'>
			<navigator url='../order/order' hover-class='none'>
				<div class='my_order_list'>
					<div class='all_order'></div>
					<div>全部订单</div>
				</div>
			</navigator>
			<navigator url='../order/order' hover-class='none'>
				<div class='my_order_list'>
					<div class='non_pay_order'></div>
					<div>待付款</div>
				</div>
			</navigator>
			<navigator url='../order/order' hover-class='none'>
				<div class='my_order_list'>
					<div class='non_delivery_order'></div>
					<div>待发货</div>
				</div>
			</navigator>
			<navigator url='../order/order' hover-class='none'>
				<div class='my_order_list'>
					<div class='non_get_order'></div>
					<div>待收货</div>
				</div>
			</navigator>
			<navigator url='../order/order' hover-class='none'>
				<div class='my_order_list'>
					<div class='non_comment_order'></div>
					<div>待评价</div>
				</div>
			</navigator>
		</div>

		<div class='my_other_use div_float'>
			<div class='my_other_use_list'>
				<navigator url='../addManagement/addManagement' hover-class='none'>
					<div class='add_icon'></div>
					<div>收货地址</div>
				</navigator>
			</div>
			<div class='my_other_use_list' hover-class='none'>
				<navigator url='../collect/collect' hover-class='none'>
					<div class='col_sel'></div>
					<div>我的收藏</div>
				</navigator>
			</div>
			<div class='my_other_use_list'>
				<navigator url='../leaveWrods/leaveWrods' hover-class='none'>
					<div class='ser_icon'></div>
					<div>客户服务</div>
				</navigator>
			</div>
			<div class='my_other_use_list'>
				<navigator url='../information/information' hover-class='none'>
					<div class='meg_sel'></div>
					<div>站内信</div>
				</navigator>
			</div>
			<div class='my_other_use_list'>
				<navigator url='../information/information' hover-class='none'>
					<div class='meg_sel'></div>
					<div>足迹</div>
				</navigator>
			</div> 
			<div class='my_other_use_list'>
				<navigator url='../recommend/recommend' hover-class='none'>
					<div class=''></div>
					<div>扫码核销</div>
				</navigator>
			</div>
			<div class='my_other_use_list'>
				<navigator url='../help/help' hover-class='none'>
					<div class='hel_sel'></div>
					<div>帮助</div>
				</navigator>
			</div>
			<div class='my_other_use_list'>
				<navigator url='../about/about' hover-class='none'>
					<div class='abo_sel'></div>
					<div>关于平台</div>
				</navigator>
			</div>
			<div class='my_other_use_list'>
				<navigator>
					<div class='exit_sel'></div>
					<div>退出登录</div>
				</navigator>
			</div>
		</div>
 
	</div>
</template>

<script>
	import allHeand from '../../components/allHead'

	export default {
		data() {
				return {
					headTil: '个人中心', //头部标题
					hiddenBack: true, //隐藏返回按钮
					login:true,
				}
			},

			components: {
				allHeand,
			},

			methods: {

			},

	}
</script>

<style scoped>
.container{
	background: #fafafa;
}
	.my_head{
  width: 100%;
  height: 175rpx;
  background-color: #e50012;
  font-size: 0;

}
.my_head>image{
  width: 135rpx;
  height: 135rpx;
  border-radius: 100%;
  float: left;
  margin-left: 35rpx;
  margin-top: 25rpx;
}
.my_head_msg{
  float: left;
  height: 100%;
  margin-left: 20rpx;
  color: white;
}
.my_head_msg>navigator{
  font-size: 24rpx;
  margin-top: 55rpx;
}
.my_head_msg>view{
  font-size: 20rpx;
  margin-top: 10rpx;
}
.my_head_right{
  float: right;
  font-size: 40rpx;
  color: white;
  height: 100%;
  margin-right: 30rpx;
  line-height: 175rpx;
}

.head_login{
  float: left;
  color: #ffffff;
  font-size:0;
  margin-left: 33rpx;
}
.head_name{
  margin-top: 44rpx;
  font-size: 24rpx;
}
.head_name>text{
  display: inline-block;
  width: 22rpx;
  height: 22rpx;
  margin-left: 10rpx;
}
.head_phone{
  margin-top: 20rpx;
  font-size: 0;
}
.head_phone>text{
  display: inline-block;
  width: 15rpx;
  height: 24rpx;
  margin-right: 10rpx;
  vertical-align: sub;
}
.head_phone>view{
  display: inline-block;
  font-size: 24rpx;
}




.my_head_sub_list{
  float: left;
  width: 24.8%;
  height: 100%;
  border-right: 1rpx solid #e5e5e5;
  text-align: center;
}
.my_head_sub_list>view:nth-child(1){
  font-size: 28rpx;
  margin-top: 30rpx;
}
.my_head_sub_list>view:nth-child(1)>text{
  font-size: 18rpx;
  margin-left: 5rpx;
}
.my_head_sub_list>view:nth-child(2){
  font-size: 24rpx;
  color: #575757;
  margin-top: 10rpx;
}
.blue_text{
  color: #346FEC;
}
.red_text{
  color: #e50012;
}
.yellow_text{
  color: #E79E12;
}
.pay_ment{
  width: 35rpx;
  height: 35rpx;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAADe0lEQVRYhb3Ya4hVVRQH8N+dro2OMwk90IoCDWrMqQ9WVkSFVkNkYSbNFMQwCGbRy6IPRfaiAil6GBUVPYmIEepDIFhSmlhM06deVhQRmPYOysZMp6YP61znzG2uZ59b9IfDhn32Wvt/9uO/1jqVPT1tmsBsnI3jcQRasA2fYh3eT3VUHRiOtsTkJ+MWXFAwblXWbsLdWJ/ivCVhzEn4EIMZiXdwJWZiEirZU8Vh6McGnIHX8S3O/LdE7sMQurASHTgNj+MrjOTG/olv8DwWZCSvRhs24oVmiFTwLm7EI5iCe/BbAfE8RvAoDsCduAzbMT2VyH5iK+ahD9dgVwkCE+EOdONQfIGDU4gMYU5muM/lLIn16EQ7Pioicj/mipVIOu0l8Rnmi+15pRGRWbgBT/lvV6IeG3E7FmNhrbOSE7QtONq+tWUWTsSagskuws/ZpI2wHQdWB4YnM7Yixwq1XFkwwWwMiOvbCH14GcsKfC1F60jv1J48kQezdtWEJmNYi9VY3mDsJUJH3sTlBb7W5eeubUO39PiwAr/iVhxk7MuXi5XahLMSfT2H/pHeqa1VHJV1PpRoDLdhNGu34OOMxAahqqm4V4SEJVUsyjrXlnBAnPzdeCBnf35JH59k7TktQjfghwTD+WIlas9NuXcL697dVYLQjCoOKWHwNZ4QsahFxJNFQrofFgFuNBs7mOhzF9qrmdNUfI4r6vqOwQxcV8JPHn8RX/VTkw5qKPMhE2EKdlbxgbj/0/BLglG38ep7eNYuqRu7Gd8lEKngx8qenrYuEfZ7FUt3N15LcE6cmaLtmokvsawWa0ZFInRKgWGbCOX5YPmsSBvm1Y3dqnhFVuNatNeIDInctJn9fgunS8t/6/EHdlcHhjtqxtdn7dImnLU2YQMnYH+ZFtWIvC1uz9MiQf4/8GLWPpYnAhdKP4h5tCu/pVcJ/emrDgyPMv4absa5TRApuvL16BSVwZBcJlim0muExWJVUtAhojVRsu5FMye9Ht8LLSjCnGxsRdTMO8oQuVhx+piCFaKEmIzjhICOQxGRuSKcb81IlcUCvCfSwUFRRvyjpkkhcrMI89OF/I/gSaEBkxr46xL10Q68IbL+fpwqtmZCVEr8H7lUpIaddf2/ixBR72ibSLCfwc5GTpv5P/JS9kzDeULWjzSmI8PZ5IN4VVrGtxd/A89Zu0F7QEGnAAAAAElFTkSuQmCC') center center no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;
}

.my_order{
  width: 100%;
  height: 155rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  background-color: white;
  margin-top: 30rpx;
}
.my_order_list>view:nth-child(1){
  width: 55rpx;
  height: 55rpx;
  margin: 0 auto;
  background-size: 100% 100%;
}
.my_order_list>view:nth-child(2){
  font-size: 20rpx;
  color: #575757;
  margin-top: 20rpx;
}
.all_order{
  width: 44rpx !important;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAxCAYAAABQxxDJAAAB20lEQVRYhe3YPWsUQRjA8V8u5wvnC5jCykJByAdIIYJiLIJNWolCKiHkC0TRwsZKg5VgoyB2ammroBGxsRAhlWAplgmKkfgSYzF7cpw352xuzmyxfzjYY/Z59s/OPM8MO/LwyZoBOY1TeIHnZYNnplp/rpsDihzAs47/Y1jdarImGljEJPZgIzH2eyHTyZtCZmdijtFHT7+uYQmXmniM6cTgf3G4+JVlAuONjCKDMt3YboNOapkYlZKJ9Zl3uC6U6Y6Mz/shtIPLGE+VuYX7GSW6aeF2qsws3irXwFJoN8rZXoMxmeN4lVEiiUot4FomRr8jxAd8lr+09+NQGZkHuID1jCJtduMezncPxKZpeUgiirzLvQZib+YKjmBF/j4zhnNlZPZhLqNEEpWqplomRmzNrOCu4ZX2nLCQk2QWcWMIIm1WhfNSksyEsNV/k3cqf2FXkf8vYjJncQZf+tyzFX5ir7AlJMsoAnoGDYtKVVMtE6PfmnmJj0JfSGVT2AwPCl81ssjcxMWyybq4hqtlAoY5TaNlA2JvZgEn8Un5Y+eGMLUncsnAsbLJBqVS1VTLxKhlYtQyMWqZGJWTmd9uiYL5Ju4IHxMncVTY6Db/w8NHhJ39PZZmplqvfwNFNUWUPTKGUgAAAABJRU5ErkJggg==') center center no-repeat;
}
.non_pay_order{
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAvCAYAAABzJ5OsAAADQklEQVRogdWaXYgNURzAfzMre3wntUeufDwg64mlOE9SLFGSB4l4UfLgBaX2RbxImy1k44GUSJQH+Yh8JO3xVT42JUnaTXGyvvKxZ7HLw8y0t2tn772zd+bYX01n5pxz//fXndOZ/zlzvc6WGvphDjAXyAF/wiNt/PB73gAPhDKtcR2HxNQvBbYBiyvvVh5Wy4tAk1DmVmGb30f/k8AV/gPxkBXATatlc2FDoXwLsD4TpfLZYrW8nF+RL38eUNn6lM0yq+WR6CKSrwdWufEpm81Wy3nQK7/foUwSGgG8zpaaBYB2LJOEWh9Y5NoiIQt9YIJri4TkfGCEa4uE9PiA59oiIT1RHjEYGRWX26TJO+AbwR1PetergfYs5U8Ah4BH+ZVCmcQBs5JfB5wOz8cC46MGq2WSeD3AhyzkGwjExwCngOUVituYtrwB9obnj4GpFYzd1Vc+X0kuhOVGShP/Wkbs7rTl28KyWKrdAOSEMqOBKcCuUoKnPWyiH6c7pr0bqBPKPAWwWo4VyrQBe6yW1wkWR0WDp0Ux+R1CmadWyzqr5Qvgo9XymdWyViijgd2lBHdBF3DAajkEuAVMD+tnAdeslh7BOiM2A3Ap/55ALAeMKmjLAdVCma8ET+M+cSk/Lizf8u+w+gJ0WS2HAsPjAriUHwZsEsr8BJYQ3AkINpvqhTJ/gK1AVVyAtGebaLzGCRywWt4QytwEaqyWk4Qy7QBWy1p6H3B9krb877CMkx8OtFottwPHhTLtVsthwCagqZhf2vLREvNxP31GAkeBg1bLDkCW6pX2mF8ZlseAjiJ9qwlmmVJ/UD9t+YnAFuAXUAfcrWDskVmkxM3AK+AaQY4zg2Bo9Awgpge0ZbUYuQrsAw4CL8IDGNhKyutsqTlBkLJmxUvgE8knCy/87GEXC/BpFYozczDv23wezPs2ng/8cG2RkCqfYBNoMGJ84LZri4TcjuRfuzYpk4dCmdYoPdjpVKV8dkJvYnYOuOHOpSzORi+U8xOzeuC5G5+SuS+UWRNd5Mt3A7OBS5krlcYZocz8/IrClLiL4HX5BuBJVlZFuAesFsqsLWzwivzrYxEwD5hMP6v4FPhOMAPeF8rciev0F+HYx29sbd6cAAAAAElFTkSuQmCC') center center no-repeat;
}
.non_delivery_order{
  width: 65rpx !important;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAAnCAYAAACv+ADgAAADlUlEQVRoge3ZW6gVVRgH8N8+DlkOJUGRSFl0ISihJIJuVhBSVChEOEhE9dAFDCMs6N5DUEQvFRlGUVRQDj1UCkVRmnEKDFIMqpdONzhdFImSIT1ndPcwa3t2+8zee/bh7M4+4R+Gtda3vu+b7z/rOmvVxlfOW4q7MR/j+oshHMCneGI6HEZpNlkWXvBf4yrsxkv9cD7UD6cVsaxfjmeS1P5+OZ5JUgf65XgmSfUNh0nNFkQzHUDAGbgRx+i8Vs7FLryJkXZKg0BqAb7CkT3YPIyL8GVZ5SB0vwv1RgiOwMc4uqxyEEjVp2g3Hx+WVQxC92u3Xv1qYhs1hIMhvR5nBvkFeRI/FaXZvc2Gg0CqHb7HIyXyJzFqouvdkyfxcJRm7zYUBqH7tUO7cbYXy1tk7+RJvLBRGGRSnfCJosWa8UEjM1tJwX3Y2VRenCfxM8xuUnBNS3lNnsTnzHZSo7i5Rfb4IJPaV0UpSrNX8UKT6MpBntJPwLWodVLKk3gMPzeJ5gwyqdOxaSqGg9z9pozDpGYL/pekep0ofsOPit+FhTh5ugMqwYiJ2e3UKu+sSmoT1mFLlGZjDWGexEtwA9b2FmclvIL1+KJJVsMVuBMr2hlWIXVXlGbPlhqn2Y48iXfgLWzGvKoRd8EKbCyR1/FReFbjudK4ujh/oJlQnsS3YCmOUpwPvKY4CNmGy/37q3ZDu/G8LAQNx+ImnI8xfIaXFT+M6xQk17U6qI2vnNfud3pnlGbnBjLH432c16LzJ1aFOoovt7o7H7Ah2CYhDy/itpC/BG/juBa7b3A1fgrlrbi0WaHT7PdYU36LyYQozgnew2mh/GgHf634NqSjTbIHQ7pAcRvTSgjOCnVRi80hDOEOxay2F78rrlh+EQ418iS+Dmd3CfChkO7BGyHdVfLsDu/YiKeDzTBex/ZQD/frvOdbpOiWojQbxg/4Q/GB1tbq9bo8ieciRhaIitLs70BqPW7vQmpEsVdrIFb0+1bUgrzbDnw7lnTR2YBVUZrJkzjGHGRRmh2IAoH92l+tzOninMndePL1Xm+osik4pBOlWVZa0QGbK+hsq6DTC6r429quolavdz5LzJO4pphpTuqgthhfVwikKk5RjJN22IMTsa/szrdrS0VpVsdlyg/kDyqm5ekkRLEVW6587I0q1sS247JrSzUQJpM1uFixc9iuOEH9rpdoe8Qi3Gpi8f0cz+OvhkJZS/0DeirfHMiIaFgAAAAASUVORK5CYII=') center center no-repeat;
}
.non_get_order{
  width: 60rpx !important;
  background: url('data:image/png;base64,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') center center no-repeat;
}
.non_comment_order{
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAACKElEQVRoge3ZO2gUQRjA8d9trlBIpUXERydoQMRCIopVAlaCYCPYKCi+wUZIY2dlp6AoiKhgr4idpLNJsA22IVHIFRYWCZrLw2KiBr3czm72du/g/nDcg5m5Px/zfTuP2ujkPFzDJezFGlZ1Fwlq+ILnEyNDT+u4gieVasWzC0fHphortdHJ+Vnsq9ooI3MJtldtkYPtCZaqtsjBUiIkY6+xllRtkJe+eNnUI9p8xkv8wEBHbVjBNlzEcLuGMeL38WrrTq2ZGBn677exqUZDCNamxIiPY0iIeOFTa2yqsfHrqr8Rb0uM+LAQ9a6iZ5OzL142MXN8GR+FUlUGAzgpxS1G/A4eFmHUik3K4W08aNcvRvy4EPFl5ZTDOk6k9YsRP7f+6ip6Njn74mUTM8cJu6Qik7MprElyEyP+CHeFOl7UsraJQbzDsTwDxIg38D3P4CksYiFv5xjxe7ggLGtjp1YaTezE7rwDxIrsz/sHnaJnq0pfvGwSxSVcmQwkOn/k0AnqCSartsjBdIIbwkl/r7CIm3XM4iDOY88/jc7gSI7BZzAhXH/U8jv+IRE2GTPCVcrX34m5gGctOgzKLv4C1/EzpnGrrVsMaRVlR4axFnEVr3OZZKSoUvhBuLWbK2i8VIp4AI3jlBKl2VrEp4XDyU/FqGQjb8Qf45CKpMke8W+4jLcdcMlEWsSbGz6/wQFdIE26+OH191s4K0S8K2gnXsN7nBbmdFfxC29EYhp1aqokAAAAAElFTkSuQmCC') center center no-repeat;
}
.my_other_use{
  width: 100%;
  background-color: white;
  margin-top: 30rpx;
  display: flex;
  flex-flow: wrap;
  padding-bottom: 20rpx;
}
.my_other_use_list{
  width: 25%;
  height: 150rpx;
  text-align: center;
}
.my_other_use_list>navigator>view:nth-child(1){
  width: 58rpx;
  height: 58rpx;
  margin: 0 auto;
  margin-top: 30rpx;
  background-size: 100% 100%;
}
.my_other_use_list>navigator>view:nth-child(2){
  font-size: 20rpx;
  color: #575757;
  margin-top: 20rpx; 
}
.add_icon{
  width: 40rpx !important;
  background: url('data:image/png;base64,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');
}


.col_sel{
  width: 58rpx !important;
}
.ser_icon{
  background: url('data:image/png;base64,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');
}


.meg_sel{
  background: url('data:image/png;base64,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');
}

.hel_sel{
  background: url('data:image/png;base64,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');
}
.abo_sel{
  background: url('data:image/png;base64,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');
}
.exit_sel{
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAYAAAC4h3lxAAAFhUlEQVRYhb2Y3atUVRjGf89ae8+co6aY0E1h0o0aBJFRYJRgeBdddOFFIRoVWBH0J9R1YF5ZmIZKlGB/QJBgSRdCEd4UFeFXEFr4fdIzM3uvt4u193zsmTnz4RwfWJx9Zq+91vus93uJ/Tcha0Bo1UB7Jb0Etp4IY/ZIgFsY35jcp6T+LxI/9U5i/3XIms8rZMeQNsxQ0NEwGub9u6T+MGRTLZHQWnxC2Gmk6rsm4O9VxgoMCEANAFGXNQ/Z3fodWiu/mmbBRGb76Mh+2+B94BToDlHds4QBOdhGwVFgA4Cw/ZbPH2cKQ5I++nsBWAlgzu3E7ARmQJ9GZggDtFHYr4ADw8xvxvRb3Lbkod5P+qQHR7eZBDuLDZk8e/wO3OhI0noI3wRXjgCpICmkVDkEBLAmuIwEaAFzAJitWX65y9OxebqPylzeO8eDJWABzLpmqvjfgTlcZfWOzmw51NCzZnmmA9774nm0DEs7qRkDotPksCHCSF0at3r86wfPHYKqBvq/vGdNCOQGjUXQxa5T/zOepwNsHfDoOIGkSmAwhpEYRc4COAfpPKQrIJnrjHRFMJfswOxDg+3gL8WP8icF50R+Act2jyJRNaHhs7vNqXz2HvCQZ6DQ/7kchBxsEVwKzncRF8A54IOopRYoB3gFc6sxh0LriAmP/Ocx//VjPA10kzCLgvgEXKnyEQg5ZItxhKwrHLYXhnwOWqugtfIIIbmGIklZ6zCW7xp2tpMTcB58Gj8d5pxVSHG0iTQikfb7HBqr4fZaWHjwnDXXbEH5H+3XtI6hsG0QickISJGAhfEEH0ikMKvsLoQMkwfzMH8VVixEGbP6BTM2g50qo63U+g7lb1RJjE+gdMhZhFVVU4CLWpi7DiuvQW0BzAfDtgOnio+QskORxDQEJNCsi9MSRWYNKaR3oXarEM0RSdjpQgjkskMovFkewPhh1CWF+VRNZ8ZFXyhMqr22w9A2IJIwkLPPcLwF45bLIprPQLs3wN4WbBwy4Z5h6F+wf3pEchw0oTEJCMggDCotbK/EgXKr5cAwHcvsk9EEiuqVRqC3Vi8eHVep6X6V4FXcGk8DDsgU29ZurwlATScs1Q7IH2PaxnYkdBnYKdjd/skM8/690QTiKUO9eK7qUwA6OfjlDFAsKWNfj1hiD+KL8aJQILp7wrCSZIboaidjvlgn4yIxSMQZYg9wFJsoDzD7Fr8bZXiWB2trcp2Mn4H17Wml8AUmyMTEXmOyfmP4Yqqo0nlI0phv4vobRZ/wu+kSHiY509IXUuAuk1ZRHSjErJvXY/lgWSwO0zS+DzmIFwXfYh2nMrGFSKgHkxmFFQSMeO01iT8oRNMIKYRazLZ+sbNwWZ2G8IzEyZ5txWuDhJ+OgIgRKQEajDYnFTcKIY3DfPxNRUUrxUIxC2Wj83LvdZBeB/ty2PKTG0J5OeiAFQUZK7ux6gCCgzAfGxZcR/A+opTV7mHindFNQ7sQR5YSZ/q4UvYyrujSbEgOCMX9DqGQu5zXnv808FNnUZ032CRjFbAwKrVM64od9Ag1aIcAaQa1AGkeR3yuS/a9xI+CHyiuN7uwMM72905gSYjIsBGvAimGNYHGI2AvFOSfw+yp6AOTZcrlTE0d5NBfashwPb5QqRLHK0uSyszlKRQ60Zy2VkRemVVhMx6JhBjZy89uLO+1OkRnTiC4W/hW19YkvSdfmNNSR5rnOIz/un7a0Wncl6nAVyDePNe2tqUzQP4SLo21kDyoaGG19EgwjuN4J+YUHTB4ADjDJIY4CcybfPNhfONgvCI3UDhDwvlplhMfX07VDGfJ7fH731kZmLth9fomEneFMPnmCXItS3lW8/Y1i7YV4eg493LQETEuZVj+i/m5V/Frr/S59Jj4H7aqH69zaKPZAAAAAElFTkSuQmCC');
}

.phoneIcon{
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAYCAYAAAAlBadpAAAA20lEQVQ4je3UMUoDQRTG8d+uSwyIFhZprdTe2rPYeQLv4A2sBC/iBSzstQwIgqUSxQjxs3AX4urGbOr8YWDmzXzzvscwr0ii5gT7qPDpbzbwjGvcSrKZ5Cb9OZXkfAVhkqRIco/DDpuLeK8wrBd3eK1rXsQHDjCQ5LF2MUpiyXGVJOXcjf9l/EWJ5q2Giw62qBrxyqzFa/FS4qKeP/XQvfGz5Rxh3HKz7fsLTudiM4yQIskYez2ypnY7KfHScWiGXZy14k2ZWyUuOsRT7GDQsT9pOsNlz973kOT4Cxj8AnSlgAr3AAAAAElFTkSuQmCC') center center no-repeat;
  background-size: 100% 100%;
}
.signIcon{
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAACZElEQVRIiZ2WS4hOYRjHfzOIGoaF28bQCLlOmTIuuWUoOxvTKAuKhZUoC1ayl1LWmBKaFIlynQVDCE3jMq4LlxIhmlAz5mfxfV898/ad85n519v3nuf5P///Oc/3vuc9VSr/iRnAIqAOEPgBdAHd/1WtVhrb1UvqL8vjrrpPrc7TyTPYoD7MEC+HD+rOLL2qjNadBVqS2BPgBvAa6APqgSZgdcK7D6wHfgJVQA3QW879fHKnF9VVOU8+Vz2W1LxSF6vdaq+6KS1qD+Tf6ra8vpdpdVdGW09GYlNI9KqzhmASx+XE5J06MxJehGTrME1GqteCTo863rDqWkKyY5gmDeq3oNMd86XJrUBoGIbJOPVv0Hiqjk6N6tT+IuFZSDarR9WVFUwa1TfB5J46KuWhbg6kwyEZ0ZxhMj/hPVJHhPwcC4sM1F2BuCeQTiciaxKTevVLyF9P8hNCbls1MCbs6v4w3wIcCdcdwLrifAXwBphYvL4DNCdviAVhvqQa+BoCkxPyXuBmuL4O7C7+lvCgaJxibJh/Li3LEjoz/os2y+NKBh/1UODtKgVfhuCUjMIzicnNHBPUj4E7uxTcH4IncoovWXgHXqxg0hr0OgwbdmRRoITGHJHaCia1Dt68C6MR6o6Q7KkgljcuBJ1zpXhK6gmkx+ryIRhMU0+F+gG1JsuoRn3vYByIBRljq9qX1DVFTrmjfALQCcwLsR9AO3AVeEvhKJ8BLKNw5NcHbi+wEbg9SDXnLg86dLSpk8rpVer7dPW4+j1HfMDCcl+ap5X1FZRiKrC22K4aCl83f4BPxRY9ryTwDx89/BK0sop+AAAAAElFTkSuQmCC') center center no-repeat;
  background-size: 100% 100%;
}
</style>