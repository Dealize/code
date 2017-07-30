define(['FFF','tap','fnWidget','util','colorPickerWidget'],function (FFF,tap,fnWidget,util,colorPickerWidget) {
    var F = FFF.FFF,
        Base = F.Base,
        Widget = F.Widget,
        FnDetail = fnWidget.FnDetail,
        fnPanel = fnWidget.FnPanel;

    function FilterWidgetPanel(){
        fnPanel.apply(this,arguments)
    }
    FilterWidgetPanel.ATTRS = {
        boundingBox:{
            value:$('<div class="P_colorPanel">' +
                '<span>基本颜色</span>' +
                '<ul class="P_panel_item P_colorPanel_ul"></ul>' +
                '<span>更多颜色</span>' +
                '<div class="P_colorPicker"></div>' +
                '</div>')
        },
        currentColor:{
            value:''
        }
    }
    F.extend(FilterWidgetPanel,fnPanel,{
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
        FilterWidgetPanel:FilterWidgetPanel,
    }
})