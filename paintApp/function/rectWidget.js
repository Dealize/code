define(['FFF','fnWidget'],function (FFF,fnWidget) {
    var F = FFF.FFF,
        Base = F.Base,
        Widget = F.Widget,
        FnDetail = fnWidget.FnDetail,
        fnPanel = fnWidget.FnPanel;

    function rectWidgetPanel(){
        Widget.apply(this,arguments)
    }
    rectWidgetPanel.ATTRS = {
        boundingBox:{
            value:$('<div>233</div>')
        }
    }
    F.extend(rectWidgetPanel,Widget,{
        initialize:function () {
            console.log('hello demo')
        },
    })

    function rectWidget(){
        Base.apply(this,arguments)
    }
    F.extend(rectWidget,Base,{
        initialize:function () {
            console.log('hello demo')
        }
    })

    return {
        rectWidgetPanel:rectWidgetPanel,
        rectWidget:rectWidget
    }
})