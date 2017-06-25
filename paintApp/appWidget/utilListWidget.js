define(['FFF'],function (FFF) {
    var F = FFF.FFF,
        Base = F.Base;

    function UtilListItemWidget(){
        Base.apply(this,arguments)
    }
    F.extend(UtilListItemWidget,Base,{
        initialize:function () {
            console.log('hello demo')
        }
    })



    function UtilListWidget(){
        Base.apply(this,arguments)
    }
    F.extend(UtilListWidget,Base,{
        initialize:function () {
            console.log('hello demo')
        }
    })


    return {
        UtilListWidget:UtilListWidget,
    }
})