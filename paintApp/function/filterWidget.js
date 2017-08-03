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
            value:$('<div class="P_filterPanel">' +
                '<ul class="P_panel_item">' +
                    '<li data-type="reset">重置</li>' +
                    '<li data-type="invert">反色</li>' +
                '</ul>' +
                '<span class="P_filterPanel_reset">重置</span>' +
                '</div>')
        },
        filter:{
            value:''
        }
    }
    F.extend(FilterWidgetPanel,fnPanel,{
        initialize:function () {
        },
        renderUI:function () {
            this._getDom();
        },
        bindUI:function () {
            this._bind_domEvent();
            this._bind_attrEvent();
            this._bind_gloableEvent();
        },
        syncUI:function () {
        },
        _getDom:function () {
            this._$filterUl = this.boundingBox.find('ul');
        },
        _bind_domEvent:function () {
            var that = this;
            that._$filterUl.on(tap.tap,'li',function (e) {
                that.setFilter(this.dataset.type);
            });
        },
        _bind_attrEvent:function () {
            var that = this;
            this.on('filterChange',function (data) {
                switch(data.value){
                    case 'reset':
                        F.app.trigger('layer_removeClass',{
                            value:that._flterClassName
                        });
                        that._flterClassName = null;
                        break;
                    default:
                        that._flterClassName  ='P_filter_'+data.value;
                        F.app.trigger('layer_addClass',{
                            value:that._flterClassName
                        })
                        break;
                }

            })
        },
        _bind_gloableEvent:function () {
            var that =this;
            F.app.on('setImgDataFilter',function (data) {
                // data
                if(that.filter=='reset'){
                    return data;
                }else{
                    //todo:开始计算滤镜数据
                }
            })
        },

    })


    return {
        FilterWidgetPanel:FilterWidgetPanel,
    }
})