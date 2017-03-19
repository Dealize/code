mui.init({
    swippeBack: true//启用右滑关闭功能
})
mui.plusReady(function () {

    var preload_recordCost = mui.preload({
        url:'../page/recordCost.html',
        id:'recordCost'
    })
    var aniShow = mui.os.plus ? "slide-in-right" : "zoom-fade-out";
    mui('.overflow-header3').on('tap','.mui-btn',function(e){
        switch(this.dataset.target){
            case 'goRecordCost':
                //mui.openWindowWithTitle({
                //mui.openWindow({
                //    url:'../page/recordCost.html',
                //    id:'recordCost'
                //},{
                //    title:'记账页',
                //    back: {//左上角返回箭头
                //        image: {
                //            base64Data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAb1BMVEUAAAAAev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8AAACubimgAAAAI3RSTlMAGfUTGfQTGPMSGPIYGhgaGBsXGxcbFxwXHBccFhwWHRYdHWufDPQAAAABYktHRACIBR1IAAAAB3RJTUUH4QETEBwooeTlkQAAAJVJREFUSMft1EkSgkAQRNFGUXFWHBDBibr/HTUwD5B/48Ig1y+io7u6MqUhf5hsNEY+j5hMgZ/FJ8Xc9ovos3T96utjbfqN/Nb0O/m96Uv5g+mP8ifTn+Ur01/ka9Nf5RvTt/I309/lH6Z/yr9Mn+Q71/MT8B34K/E58Enzv8R/K98HvnF8p3lr8F7izce7lbf3kJ/lDQp9HdBhgg3PAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTAxLTE5VDE2OjI4OjQwKzA4OjAwpTDFwQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wMS0xOVQxNjoyODo0MCswODowMNRtfX0AAAAASUVORK5CYII='
                //        }
                //    }
                //})
                //mui.openWindow(preload_recordCost);
                mui.openWindow({
                        url:'../page/recordCost.html',
                        id:'recordCost',
                    styles: {
                        popGesture: "close"
                    },
                    show: {
                        aniShow: aniShow,
                        duration: 300
                    }
                });
                break
        }
    })
})