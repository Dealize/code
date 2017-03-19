mui.init({
	swippeBack: true //启用右滑关闭功能

})
var recordCost_type,
	pageDom = {
		$title: $('.mui-title'),
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
			break;
		case 'achievement':
			pageDom.$title.html('成就');
			break;
		case 'complaint':
			pageDom.$title.html('吐槽');
			break;
		case 'think':
			pageDom.$title.html('感想');
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
