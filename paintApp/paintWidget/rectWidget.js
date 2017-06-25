define(['FFF'],function (FFF) {
    var F = FFF.FFF,
        Base = F.Base;

    function rectWidgetPanel(){
        Base.apply(this,arguments)
    }
    F.extend(rectWidgetPanel,Base,{
        initialize:function () {
            console.log('hello demo')
        }
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
        utilPanel:rectWidgetPanel,
        utilDetail:rectWidget
    }
})