<template>
	<div class="videoCn">
		<div class="viList div_float" v-for="item in videoData" :key="item.id">
			<div class="img">
				<img src="../../static/img/list2.png" />
				<!--这里到时候根据类型来显示图标-->
				<div><div class="play"></div></div>
			</div>
			<div class="viMsg">
				<!--这里数据返回判断是否显示有几话，收藏视频不显示，图文收藏不显示-->
				<div class="eli_one">第一话</div>
				<div class="eli_two">申请国外大学时，需要什麼需求</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:[
			'videoData'
		],
		components: {
		},

		methods: {
			
		},
	}
</script>

<style>
	.videoCn{
		padding: 0 4%;
		padding-top: 50rpx;
	}
	.videoCn .viList{
		height: 194rpx;
		margin-bottom: 46rpx;
	}
	.videoCn .viList .img{
		position: relative;
		width: 290rpx;
		height: 194rpx;
		float: left;
		border-radius: 5rpx;
		overflow: hidden;
	}
	.videoCn .viList .img img{
		width: 100%;
		height: 100%;
	}
	.videoCn .viList .img div{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: rgba(0,0,0,.3);
	}
	.videoCn .viList .img div div{
		position: inherit;
		margin: auto;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 48rpx;
		height: 48rpx;
		background-size: 100% 100% !important;
	}
	.videoCn .viList .viMsg{
		float: right;
		width: 380rpx;
		border: 1px soid red;
		color: #121213;
		font-size: 28rpx;
	}
	.play{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAAAXNSR0IArs4c6QAAAgBJREFUSA3Fl7FOAkEQhjlia4IJMTQ+A42JhIJY2FvZ2ltYGnkBEhNKCnpbX8GKgmBiwzPYEEMiib34f8eyWeDI3e4dx5/87rrMzj8zd3s3F1UyYrlcnsu0I7bEhlgXa+JCnIszcSKOoij61piKKM1CopeyeRCbabbO71PNhwri01nbme4Vl+iFrJ/E9s6u7AtjmfYVxFfSlkRxCV/J+EU8TdrkufYr+64C+NjeV91ekPCt1gZiEcK4x8/A+OV/i43MTcYI7wRld4RP/rT10a2AFZcw1/hVLCrjpDC5BPfre8DNkJvrkMIEg390YsTiyprjlOeuNu4yDW2jZ68t59gHXRnzcAlFrFdVFDy5fB4gFV2zd+25ExlD0ESXsvPI9IYC+BGpQGgVOoi3vJWdDTmq0EK84fgKmgZWoYE4b6dC4FmFOuK8Fo+BGuJ5jsxG0LqDb7TwJjKmYXEiCxqBXKWX6Jl8PItZRGUWY07mdCDB8MzW1ZmROa3PtbuaZR6Yret6QuYjdyXLPEe2rvtRVceDZo+eywd0OXlOyRRdMgfD1VDa31gvFlcUdJk0e2VgbPTsKxXRvkincUjgH50Y67LzmqS95Q1Fr3UI4Jcu1rbRVhw1/UB72xOLDgB/PeNf0xVsA7leYNRRKqVvTxQ3ARzni2WrCuV/q7kBmEoU/pX6D/y+mPeKtaVXAAAAAElFTkSuQmCC');
	}
	.read{
		background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAkCAYAAADsHujfAAAAAXNSR0IArs4c6QAAAddJREFUWAntmDsvBFEUx3e8X4mCChESQYLQaZQKiUqjUEgkCo3vsR9p49EpFAqvAqGi8SYiEbHG77/m7uPY7Fg2G4l7kt+ee+7MnPPfM7c5k0hU2cIw7IPuKpfNlaN4LyRhBzZzVz5XdXaj0jFFO8m5DHNQG+Vvj3zW1XGjxMxAIxzAaRAE7/hfGXnbSLAIC9Bkk3F9kL0ReIX1gI0ki2lw9sxiH/ZgFw4R9oL/lpGvgRvnYQncPw9YN0NL5LU+AWdrErJNVOoVvXH9GCRK4vYQdosvMPLUsDELK9AFrqj8l46wdwTO0hKy46Iy/Dn3uo5J4CSsQj+ocD3EWb6QxE+F2CLDduMbcYEQtfNPmBdiX4PviO+I7YCN/RnxHbEdsLE/I74jtgM29mfEd8R2wMb//oyEtiOl5hl7b6ViTXaXNpmEaICqhiDVuYZHsPamM5KyuxWO0+S7gjMoJkLlUppJE0x707gpmIAeKNeKDVg6B3eg8bTYUH/BvqbELUbYjYwQgqwhqoNgPELChiDu1VkhDzxzA3odMvmS8/MXIZnH8n4QpgF6FCRKjEEr5JsT8sSmzsE96BPHbkTsF4VYISQqMITpXA2AuubEjbDWWdOXIA3nZX9j+QA0YYj3OTThHgAAAABJRU5ErkJggg==');
	}
</style>