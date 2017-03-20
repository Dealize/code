mui.init({
	swippeBack: false //启用右滑关闭功能

})
var recordCost_type,
	pageDom = {
		$title: $('.mui-title'),
		$costOutSaveBtn: $('.recordCostOut-btn'),
		$costInSaveBtn: $('.recordCostIn-btn'),
		$startTime: $('.recordCost-startTime'),
		$endTime: $('.recordCost-endTime'),
	},
	typePicker,
	typePickerData = [];

autosize(document.querySelectorAll('textarea'));

window.addEventListener('recordCostParam', function(event) {
	recordCost_type = event.detail.type;
	checkPageByType(recordCost_type);
});

function checkPageByType(type) {
	if(type == 'costIn') {
		pageDom.$title.html('收入');
		pageDom.$costOutSaveBtn.hide();
		pageDom.$costInSaveBtn.show();
		typePickerData = [{
			value: 'eat',
			text: '吃',
			children: [{
				value: 'banana',
				text: '香蕉'
			}, {
				value: 'banana',
				text: '苹果'
			}]
		}, {
			value: 'live',
			text: '住',
			children: [{
				value: 'banana',
				text: '房租'
			}, {
				value: 'banana',
				text: '酒店'
			}]
		}]
	} else if(type == 'costOut') {
		pageDom.$title.html('支出');
		pageDom.$costOutSaveBtn.show();
		pageDom.$costInSaveBtn.hide();
		typePickerData = [{
			value: 'eat',
			text: '工资',
			children: [{
				value: 'banana',
				text: '工资1'
			}, {
				value: 'banana',
				text: '苹果'
			}]
		}, {
			value: '',
			text: '私活',
			children: [{
				value: 'banana',
				text: '写代码'
			}, {
				value: 'banana',
				text: '当丫'
			}]
		}]
	}
	typePicker.setData(typePickerData);

}

mui.plusReady(function() {
	//把ios下的右划关闭改为右划隐藏
	var ws = plus.webview.currentWebview();
	ws.setStyle({
		'popGesture': 'hide'
	});

	typePicker = new mui.PopPicker({
		layer: 2
	});

	var showCityPickerButton = document.getElementById('projectPicker');
	//var cityResult = doc.getElementById('cityResult');
	showCityPickerButton.addEventListener('tap', function(event) {
		typePicker.show(function(items) {
			showCityPickerButton.value = "你选择的城市是:" + items[0].text + " " + items[1].text;
			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	}, false);

})
pageDom.$startTime.bind('input', function(e) {
	console.log(e.target.value);
	var str = e.target.value.replace(/-/g, '/');
	var str = e.target.value;
	pageDom.$endTime.attr('min', str);
})