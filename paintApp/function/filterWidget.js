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
                    '<li data-type="reset" class="active">无</li>' +
                    '<li data-type="invert">反色</li>' +
                '</ul>' +
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
            this._$filterLis = this._$filterUl.find('li');
        },
        _bind_domEvent:function () {
            var that = this;
            that._$filterUl.on(tap.tap,'li',function (e) {
                that._$filterLis.each(function (index, item) {
                    $(item).removeClass('active');
                })
                $(this).addClass('active');
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
                switch(that.filter){
                    case 'reset':
                        break;
                    default:
                        data = that['_'+that.filter+'_filter'] && that['_'+that.filter+'_filter'](data);
                        break;
                }
                console.log(data.data);
                return data;
                // data
                // if(that.filter=='reset'){
                //     return data;
                // }else{
                    //todo:开始计算滤镜数据

                // }
            })
        },
        _invert_filter:function (imageData) {
            var data = imageData.data.data.data;
            for (var i = 0; i < data.length - 4; i += 4) {
                var average = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = 255 - data[i];
                data[i + 1] = 255 - data[i+1];
                data[i + 2] = 255 - data[i+2];
            }
            return imageData;
        }
    })


    return {
        FilterWidgetPanel:FilterWidgetPanel,
    }
})