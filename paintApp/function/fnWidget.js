define(['FFF'],function (FFF) {
    var F = FFF.FFF,
        Base = F.Base,
        Widget = F.Widget;

    function FnPanel(){
        Widget.apply(this,arguments)
    }
    FnPanel.ATTRS = {
        boundingBox:{
            value:$('<div class="P_fnPanelItem"></div>')
        },
        app:{
            value:null
        }
    }
    F.extend(FnPanel,Widget,{
        initialize:function () {
        },
        renderUI:function () {
        },
        bindUI:function () {

        },
        syncUI:function () {

        },
    })

    function FnDetail(){
        Widget.apply(this,arguments)
    }
    FnDetail.ATTRS = {
        // boundingBox:{
        //     value:$('<div class="P_fnPanelItem"></div>')
        // }
    }
    F.extend(FnDetail,Widget,{
        initialize:function () {

        },
        renderUI:function () {
        },
        bindUI:function () {

        },
        syncUI:function () {

        },
    })

    return {
        FnDetail:FnDetail,
        FnPanel:FnPanel
    }
})