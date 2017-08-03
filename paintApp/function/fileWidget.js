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
                '<span data-type="save">保存</span>' +
                '<span data-type="reset" class="P_filePanel_reset">重置</span>' +
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
            that._bind_originEvent();
            setTimeout(function () {
                that._save();
            },10000);
            that.boundingBox.on(tap.tap,'span',function (e) {
                var _type = this.dataset.type;
                switch(_type){
                    case 'save':
                        that._save();
                        break;
                    case 'reset':
                        that._reset();
                        break;
                }

            })
        },
        syncUI:function () {
        },
        _reset:function () {
            var result = confirm('是否重置？');
            if(result){
                window.location.reload();
            }
        },
        _save:function () {
            var that = this;
            F.app.trigger('need_get_finalImgData');
        },
        _bind_originEvent:function () {
            F.app.on('get_finalImgData',function (data) {
                F.app.trigger('setImgDataFilter',{
                    data:data.value
                })
            })
        }
    })


    return {
        FileWidgetPanel:FileWidgetPanel,
    }
})