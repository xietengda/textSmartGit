<script>
export default {
  
}
</script>

<style>
input {
		border-radius: 0rem;
	}
	
	.divHide {
		display: none !important;
	}
	
	.div_float:after {
		clear: both;
		content: '';
		width: 0;
		height: 0;
		visibility: hidden;
		display: block;
	}
	/*文字限制超出一行后变省略号*/
	
	.eli_one {
		overflow: hidden;
		text-overflow: ellipsis;
		display: box;
		display: -webkit-box !important;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		white-space: pre-line;
	}
	/*文字限制超出两行行后变省略号*/
	
	.eli_two {
		overflow: hidden;
		text-overflow: ellipsis;
		display: box;
		display: -webkit-box !important;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		white-space: pre-line;
	}
	/*文字限制超出两行行后变省略号*/
	
	.eli_four {
		overflow: hidden;
		text-overflow: ellipsis;
		display: box;
		display: -webkit-box !important;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		white-space: pre-line;
	}
	/*内容头部间距*/
	.CnTop{
		padding-top: 128rpx;
	}
	
	/*内容底部*/
	.CnBtm{
		padding-bottom: 120rpx;
	}
</style>
