define(['FFF','tap','fnWidget','util'],function (FFF,tap,fnWidget,util) {
    var F = FFF.FFF,
        Base = F.Base,
        Widget = F.Widget,
        FnDetail = fnWidget.FnDetail,
        fnPanel = fnWidget.FnPanel;

    function FileWidgetPanel(){
        fnPanel.apply(this,arguments)
    }
    FileWidgetPanel.ATTRS = {
        boundingBox:{
            value:$('<div class="P_filePanel">' +
                '<span>保存  、 </span>' +
                '<span class="P_filePanel_reset">重置</span>' +
                '</div>')
        },
        currentColor:{
            value:''
        }
    }
    F.extend(FileWidgetPanel,fnPanel,{
        initialize:function () {
        },
        renderUI:function () {

        },
        bindUI:function () {
            var that = this;
            that.boundingBox.on(tap.tap,'.P_filePanel_reset',function (e) {
                var result = confirm('是否重置？');
                if(result){
                    window.location.reload();
                }
            })
        },
        syncUI:function () {
        },
    })


    return {
        FileWidgetPanel:FileWidgetPanel,
    }
})