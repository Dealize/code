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
                '<ul class="P_panel_item P_brushPanel_degree"></ul>' +
                '<span>选择类型</span>' +
                '<ul class="P_panel_item P_brushPanel_type">' +
                    '<li data-type="1">实线</li><li data-type="2">虚线</li>' +
                '</ul>' +
                '</div>')
        },
        lineWidth:{
            value:0
        },
        lineType:{
            value:1
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
                F.app.trigger('updateContextConfig',{
                    lineWidth:parseInt(data.value)
                });
                F.app.trigger('changeDrawMethod',{
                    drawstart:function (arg) {
                        arg.context.beginPath();
                        arg.context.moveTo(arg.touchPosition.x,arg.touchPosition.y);
                    },
                    drawing:function (arg) {
                        arg.context.lineTo(arg.touchPosition.x,arg.touchPosition.y);
                        arg.context.stroke();
                    },
                    drawend:function (arg) {
                        
                    }
                });
                F.app.trigger('contextMethodUpdate',{
                    type:'line'
                })
                that._$$degreeLi.each(function (index,item) {
                    if(item.dataset.index == data.value){
                        $(item).addClass('active');
                    }else{
                        $(item).removeClass('active');
                    }
                })
            })
            this.on('lineTypeChange',function (data) {
                var _realData;
                if(data.value==1){
                    _realData = [10,0]
                }else{
                    _realData = [10,10]
                }
                F.app.trigger('updateContextConfig',{
                    setLineDash:_realData
                })
                that._$$typeLi.each(function (index,item) {
                    if(item.dataset.type==data.value){
                        $(item).addClass('active');
                    }else{
                        $(item).removeClass('active');
                    }
                })
            });
            F.app.on('contextMethodUpdate',function (data) {
                if(data.type!='line'){
                    that._$$degreeLi.removeClass('active');
                }
            })

        },
        syncUI:function () {
            this.setLineWidth(5);
            this.setLineType(1);
        },
        _getDom:function () {
            this._$$degreeUl = this.boundingBox.find('.P_brushPanel_degree');
            this._$$typeUl = this.boundingBox.find('.P_brushPanel_type');
            this._$$typeLi = this._$$typeUl.find('li');
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
                that.setLineWidth(parseInt(this.dataset.index));
            })
            this._$$typeUl.on(tap.tap,'li',function (e) {

                that.setLineType(this.dataset.type);
            })
        }
    })


    return {
        BrushWidgetPanel:BrushWidgetPanel,
    }
})