define(['FFF','tap','fnWidget','util'],function (FFF,tap,fnWidget,util) {
    var F = FFF.FFF,
        Base = F.Base,
        Widget = F.Widget,
        FnDetail = fnWidget.FnDetail,
        fnPanel = fnWidget.FnPanel;

    function BrushWidgetPanel(){
        fnPanel.apply(this,arguments)
    }
    BrushWidgetPanel.ATTRS = {
        boundingBox:{
            value:$('<div class="P_brushPanel">' +
                '<span>选择粗细</span>' +
                '<ul class="P_brushPanel_degree"></ul>' +
                '</div>')
        },
        lineWidth:{
            value:0
        }
    }
    F.extend(BrushWidgetPanel,fnPanel,{
        initialize:function () {
        },
        renderUI:function () {
            this._getDom();

            this._renderBind_Degree();

        },
        bindUI:function () {
            var that = this;
            this.on('lineWidthChange',function (data) {
                //todo: app.trigger updageContextConfig
                F.app.setContextConfig({
                    lineWidth:parseInt(data.value)
                });
                that._$$degreeLi.each(function (index,item) {
                    if(item.dataset.index == data.value){
                        $(item).addClass('active');
                    }else{
                        $(item).removeClass('active');
                    }
                })
            })
        },
        syncUI:function () {
            this.setLineWidth(1);
        },
        _getDom:function () {
            this._$$degreeUl = this.boundingBox.find('.P_brushPanel_degree');
        },
        _renderBind_Degree:function () {
            var domStr = '',
                that = this;
            for(var i=0;i<10;i++){
                _i = i+1;
                domStr+= '<li data-index="'+_i+'">'+_i+'</li>'
            }
            this._$$degreeUl.append(domStr);
            this._$$degreeLi = this._$$degreeUl.find('li');
            this._$$degreeUl.on(tap.tap,'li',function (e) {
                console.log(this.dataset.index);
                that.setLineWidth(parseInt(this.dataset.index));
            })
        }
    })


    return {
        BrushWidgetPanel:BrushWidgetPanel,
    }
})