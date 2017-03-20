mui.init({
	swippeBack: true //启用右滑关闭功能

})
var recordCost_type,
	pageDom = {
		$title: $('.mui-title'),
		$page_container:$('.page-container'),
		$rememberDay_container:$('.rememberDay-container'),
		$achievement_container:$('.achievement-container'),
		$complaint_container:$('.complaint-container'),
		$think_container:$('.think-container')
	},
	typePicker,
	typePickerData = [];

autosize(document.querySelectorAll('textarea'));

window.addEventListener('recordDiaryParam', function(event) {
	recordCost_type = event.detail.type;
	checkPageByType(recordCost_type);
});

function checkPageByType(type) {
	switch(type) {
		case 'rememberDay':
			pageDom.$title.html('纪念日');
			pageDom.$page_container.hide();
			pageDom.$rememberDay_container.show();
			break;
		case 'achievement':
			pageDom.$title.html('成就');
			pageDom.$page_container.hide();
			pageDom.$achievement_container.show();
			break;
		case 'complaint':
			pageDom.$title.html('吐槽');
			pageDom.$page_container.hide();
			pageDom.$complaint_container.show();
			break;
		case 'think':
			pageDom.$title.html('感想');
			pageDom.$page_container.hide();
			pageDom.$think_container.show();
		break;
		default:
		break;
	}
}

mui.plusReady(function() {
	//把ios下的右划关闭改为右划隐藏
	var ws = plus.webview.currentWebview();
	ws.setStyle({
		'popGesture': 'hide'
	});
})

var dialog = new mui.myDialog({
	title:'this is a dialog',
	content:'this is dialog content'
});
var dialog2 = new mui.myDialog({
	title:'this is a dialog2222222',
	content:'this is dialog content'
});
var dialog3 = new mui.myDialog({
	title:'this is a dialog333333',
	content:'this is dialog content'
});
console.log(dialog);
