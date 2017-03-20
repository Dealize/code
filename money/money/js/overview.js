mui.init({
	swippeBack: false //启用右滑关闭功能
})
mui.plusReady(function() {
	var preload_recordCostOut = mui.preload({
			url: '../page/recordCostOut.html',
			id: 'recordCostOut',
			show: {
				aniShow: aniShow,
				duration: 300
			}
		}),
		preload_recordDiary = mui.preload({
			url:'../page/recordDiary.html',
			id:'recordDiary',
			show:{
				aniShow:aniShow,
				duration:300
			}
		})

	var aniShow = mui.os.plus ? "slide-in-right" : "zoom-fade-out";

	mui('.overflow-header2').on('tap', '.overview_diary', function(e) {
		console.log(this.dataset.target);
		mui.fire(preload_recordDiary,'recordDiaryParam',{
			type:this.dataset.target
		})
		mui.openWindow(preload_recordDiary);
	})
	mui('.overflow-header3').on('tap', '.mui-btn', function(e) {
		switch(this.dataset.target) {}
	})
	mui('body').on('tap', '.mui-popover-action li>a', function() {
		var a = this,
			parent;
		//根据点击按钮，反推当前是哪个actionsheet
		for(parent = a.parentNode; parent != document.body; parent = parent.parentNode) {
			if(parent.classList.contains('mui-popover-action')) {
				break;
			}
		}
		//关闭actionsheet
		mui('#' + parent.id).popover('toggle');
		switch(this.dataset.target) {
			case 'goRecordCostOut':
				mui.fire(preload_recordCostOut, 'recordCostParam', {
					type: 'costOut'
				})
				mui.openWindow(preload_recordCostOut);
				break;
			case 'goRecordCostIn':
				mui.fire(preload_recordCostOut, 'recordCostParam', {
					type: 'costIn'
				})
				mui.openWindow(preload_recordCostOut);
				break;
		}

	})
})
	mui('.overflow-header2').on('tap', '.overview_diary', function(e) {
		console.log(this.dataset.target);
//		switch(this.dataset.target) {
//			case
//		}
	})
