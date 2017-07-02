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
        }
    }
    F.extend(BrushWidgetPanel,fnPanel,{
        initialize:function () {
        },
        renderUI:function () {
            this._getDom();

            this._renderDegree();

        },
        bindUI:function () {
        },
        syncUI:function () {

        },
        _getDom:function () {
            this._$$degreeUl = this.boundingBox.find('.P_brushPanel_degree');
        },
        _renderDegree:function () {
            var domStr = '';
            for(var i=0;i<10;i++){
                _i = i+1;
                domStr+= '<li data-index="'+_i+'">'+_i+'</li>'
            }
            this._$$degreeUl.append(domStr);
        }
    })


    return {
        BrushWidgetPanel:BrushWidgetPanel,
    }
})