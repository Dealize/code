define(['FFF','tap','fnWidget','util'],function (FFF,tap,fnWidget,util) {
    var F = FFF.FFF,
        Base = F.Base,
        Widget = F.Widget,
        FnDetail = fnWidget.FnDetail,
        fnPanel = fnWidget.FnPanel;

    function ShapeWidgetPanel(){
        fnPanel.apply(this,arguments)
    }
    ShapeWidgetPanel.ATTRS = {
        boundingBox:{
            value:$('<div class="P_shapePanel">' +
                '<span>选择形状</span>' +
                '<ul class="P_panel_item P_shapePanel_ul">' +
                    '<li class="P_shape_rect" data-type="rect">矩形</li>' +
                    '<li class="P_shape_circle" data-type="circle">圆形</li>' +
                '</ul>' +
                '<span>选择类型</span>' +
                '<ul class="P_panel_item P_shapePanel_type">' +
                '<li data-type="stroke">轮廓</li>' +
                '<li data-type="fill">填充</li>' +
                '</ul>' +
                '</div>')
        },
        currentShape:{
            value:''
        },
        currentShapeType:{
            value:''
        }
    }
    F.extend(ShapeWidgetPanel,fnPanel,{
        initialize:function () {
        },
        renderUI:function () {
            this._getDom();
            this._renderBind_baseColor();
            this._bind_domEvent();
        },
        bindUI:function () {
            var that = this;
            this.on('currentShapeChange',function (data) {
                console.log(data.value);
                var _drawFn = {},
                    tempFn = null;
                _drawFn.drawstart = function (arg) {
                    arg.that._currentImgData = arg.context.getImageData(0,0,arg.that.size.width,arg.that.size.height);
                    arg.that._startPosition = arg.touchPosition;
                };
                switch (data.value){
                    case 'rect':
                        tempFn = function (arg) {
                            var _starPosition = arg.that._startPosition,
                                _currentPosition = arg.touchPosition;
                            arg.context.beginPath()
                            arg.context.rect(_starPosition.x,_starPosition.y,
                                _currentPosition.x - _starPosition.x,_currentPosition.y - _starPosition.y);
                            that._currentType(arg);
                            arg.context.closePath();
                        }
                        break;
                    case 'circle':
                        tempFn = function (arg) {
                            var _starPosition = arg.that._startPosition,
                                _currentPosition = arg.touchPosition;
                            var _radius =Math.max(Math.abs(_currentPosition.x-_starPosition.x),
                                                    Math.abs(_currentPosition.y-_starPosition.y));
                            arg.context.beginPath()
                            arg.context.arc(_starPosition.x,_starPosition.y,_radius,0,2*Math.PI,true);
                            that._currentType(arg);
                            arg.context.closePath();
                        }
                        break;
                }
                _drawFn.drawing = function (arg) {
                    var _starPosition = arg.that._startPosition,
                        _currentPosition = arg.touchPosition;
                    arg.context.putImageData(arg.that._currentImgData,0,0);
                    tempFn(arg);
                }
                F.app.trigger('changeDrawMethod',_drawFn);
                F.app.trigger('contextMethodUpdate',{
                    type:'shape'
                })
                that._$$shapeli.each(function (index,item) {
                    _item = $(item);
                    if(item.dataset.type == data.value){
                        _item.addClass('active');
                    }else{
                        _item.removeClass('active');
                    }
                })
            })
            this.on('currentShapeTypeChange',function (data) {
                switch (data.value){
                    case 'fill':
                        that._currentType = function (arg) {
                            arg.context.fill();
                        }
                        break;
                    case 'stroke':
                        that._currentType = function (arg) {
                            arg.context.stroke();
                        }
                }
                that._$$shapeTypeli.each(function (index,item) {
                    _item = $(item);
                    if(item.dataset.type == data.value){
                        _item.addClass('active');
                    }else{
                        _item.removeClass('active');
                    }
                })
            })
            F.app.on('contextMethodUpdate',function (data) {
                if(data.type!='shape'){
                    that._$$shapeli.removeClass('active');
                }
            })
        },
        syncUI:function () {
            this.setCurrentShapeType('fill');
        },
        _getDom:function () {
            this._$$shapeUl = this.boundingBox.find('.P_shapePanel_ul');
            this._$$shapeli = this._$$shapeUl.find('li');
            this._$$shapeTypeUl = this.boundingBox.find('.P_shapePanel_type');
            this._$$shapeTypeli = this._$$shapeTypeUl.find('li');
        },
        _renderBind_baseColor:function () {
            var domStr = '',
                that = this;
        },
        _bind_domEvent:function () {
            var that = this;
            that._$$shapeUl.on(tap.tap,'li',function () {
                that.setCurrentShape(this.dataset.type);
            });
            that._$$shapeTypeUl.on(tap.tap,'li',function () {
                that.setCurrentShapeType(this.dataset.type);
            })
        }
    })


    return {
        ShapeWidgetPanel:ShapeWidgetPanel,
    }
})