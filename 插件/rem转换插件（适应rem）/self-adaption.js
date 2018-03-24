function Rem() {
			var docEl = document.documentElement,
				oSize = docEl.clientWidth / 7.5;

			if(oSize > 100) {
				oSize = 100; // 限制rem值 640 / 6.4 =100
			}

			docEl.style.fontSize = oSize + 'px';
		}
		window.addEventListener('resize', Rem, false);
		Rem();
		/*
		A: oSize = docEl.clientWidth/7.5; //设计稿默认750px宽度，这样7.5,如果设计稿是640px宽度，这个7.5就修改6.4

		B: if(oSize>85){
		oSize = 85; // 限制rem值 640 / 7.5 ≈ 85 
		}
		640是max-width:640px这样的屏幕宽度，7.5是设计搞是750px
		如果设计稿是 640px.则 640/6.4这样去
		一把移动端页面 在 body处 设置 max-width:640px
		
		如上加入这段代码，下面写单位的时候，直接按照PSD里面的标准大小除以100即可。
		如：标注28px.则写 0.28rem即可！
		自适应，体验性！beautiful!在各个终端完全自适应大小！伸缩自如！
		 * */