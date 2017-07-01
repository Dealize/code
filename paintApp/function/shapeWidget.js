define(['FFF','fnWidget'],function (FFF,fnWidget) {
    var F = FFF.FFF,
        Base = F.Base,
        Widget = F.Widget,
        FnDetail = fnWidget.FnDetail,
        fnPanel = fnWidget.FnPanel;

    function shapeWidgetPanel(){
        Widget.apply(this,arguments)
    }
    shapeWidgetPanel.ATTRS = {
        boundingBox:{
            value:$('<div class="P_rectPanel">' +
                '<div>实心矩形</div>' +
                '<div>空心矩形</div>' +
                '</div>')
        }
    }
    F.extend(shapeWidget,Widget,{
        initialize:function () {
            console.log('hello demo')
        },
    })

    function shapeWidget(){
        Base.apply(this,arguments)
    }
    F.extend(shapeWidget,Base,{
        initialize:function () {
            console.log('hello demo')
        }
    })

    return {
        shapeWidgetPanel:shapeWidgetPanel
    }
})