define(['FFF','tap','fnWidget','util'],function (FFF,tap,fnWidget,util) {
    var F = FFF.FFF,
        Base = F.Base,
        Widget = F.Widget,
        FnDetail = fnWidget.FnDetail,
        fnPanel = fnWidget.FnPanel;

    function LayerWidgetPanel(){
        fnPanel.apply(this,arguments)
    }
    LayerWidgetPanel.ATTRS = {
        boundingBox:{
            value:$('<div class="P_LayerPanel">' +
                '<div class="P_layer_add P_btn P_layerPanel_item">添加图层</div>' +
                '</div>')
        }
    }
    F.extend(LayerWidgetPanel,fnPanel,{
        initialize:function () {
        },
        renderUI:function () {
            this._getDom();
        },
        bindUI:function () {
            this._bind_addLayer();
        },
        syncUI:function () {
            this._run_layerManager();

        },
        _getDom:function () {
            this._$$addLayer = this.boundingBox.find('.P_layer_add');
            this._$$LayerList = this.boundingBox.find('.P_layer_list');
        },
        _bind_addLayer:function () {
            var that = this;
            this._$$addLayer.on(tap.tap,function (e) {
                that.layerManager.addLayer();
            })
        },
        _run_layerManager:function () {
            var that = this;
            this.layerManager = new LayerManager().render({
                container:this.boundingBox
            });
        }
    })
    function LayerManager(){
        Widget.apply(this,arguments);
    }
    LayerManager.ATTRS = {
        boundingBox:{
            value:$('<ul class="P_layer_list "></ul>')
        },
        layerList:{
            value:[]
        },
        currentLayer:{
            value:0
        },
        layerItemList:{
            value:[]
        }

    }
    F.extend(LayerManager,Widget,{
        initialize:function () {
            this._init_layerContainer();
            this.size = {
                width:0,
                height:0
            }
        },
        renderUI:function () {
        },
        bindUI:function () {
            var that = this;
            this._bind_gloableEvent();
            this._bind_dragEvent();
            this._bind_attrEvent();
        },
        syncUI:function () {
            this.addLayer();
        },
        _init_layerContainer:function () {
            this.layerContaienr = $('<ul class="P_layerContainer"></ul>');
            F.app.boundingBox.append(this.layerContaienr);
        },
        addLayer:function () {
            var newLayer = new Layer({
                    index:this.layerList.length
                }).render({
                container:this.layerContaienr
            }),
                newLayerItem = new LayerItem({
                    index:this.layerList.length,
                    parent:this
                }).render({
                container:this.boundingBox
            });
            this.layerList.push(newLayer);
            this.layerItemList.push(newLayerItem);
            var _width = this.size.width > newLayer.size.width ? this.size.width : newLayer.size.width ;
            var _heigth = this.size.heigth > newLayer.size.heigth ? this.size.heigth : newLayer.size.height ;
            this.size = {
                width:_width,
                height:_heigth
            }
        },
        getLayerContext:function (index) {
            return this.layerList[index]['context']|| null;
        },
        _bind_attrEvent:function () {
            var that = this;
            that.on('displayChange',function (data) {
                if(data.data){
                    that.layerList[data.index].show();
                }else{
                    that.layerList[data.index].hide();
                }
            });
        },
        _bind_dragEvent:function () {
            var that = this,
                disY ,
                itemsPosition,
                lastPosition,
                $currentItem,
                currentIndex,
                targetIndex,
                $movingItem;
            that.boundingBox.on(tap.tapStart,'li',function (e) {
                if(e.target!=this){
                    return;
                }
                itemsPosition = that._getItemPosition();
                $currentItem = $(this);
                $movingItem = $(this.cloneNode(true));
                currentIndex = this.dataset.i;
                disY =that._getTouchOffsetX(util.getTouchPosition(e).y) - itemsPosition[currentIndex];
                $movingItem.addClass('isMoving').css('top',this.offsetTop-10);
                that.boundingBox.append($movingItem);
            })
            // isMoving
            that.boundingBox.on(tap.tapMove,'li',function (e) {
                if(e.target!=this){
                    return;
                }
                lastPosition = that._getTouchOffsetX(util.getTouchPosition(e).y);
                $movingItem.css({'top':lastPosition - disY})
            })
            that.boundingBox.on(tap.tapEnd,'li',function (e) {
                if(e.target!=this){
                    return;
                }
                var items = that.boundingBox.find('li');
                itemsPosition.forEach(function (item,index) {
                    if(item < lastPosition){
                        if(itemsPosition.length == (index +1)){
                            targetIndex = index;
                        }else if(itemsPosition[index+1] > lastPosition){
                            targetIndex = index;
                        }
                    }
                })
                var targetDom = $(items[targetIndex]);
                targetDom.after($currentItem);
                var _tempLayer = that.layerList.splice(currentIndex,1)[0];
                that.layerList.splice(targetIndex,0,_tempLayer);
                var canvaslist = that.layerContaienr.find('canvas');
                var $currentCanvas = $(canvaslist[currentIndex]);
                var $targetCanvas = $(canvaslist[targetIndex]);
                $targetCanvas.after($currentCanvas);
                canvaslist = that.layerContaienr.find('canvas');
                canvaslist.each(function (index, item) {
                    $(item).attr('data-i',index);
                })
                that.boundingBox.find('.isMoving').remove();
                items = that.boundingBox.find('li');
                items.each(function (index, item) {
                    $(item).attr('data-i',index);
                })

            })
        },
        _getItemPosition:function () {
            var that = this,
                items = that.boundingBox.find('li'),
                itemsPosition = [];
            items.each(function (index, item) {
                itemsPosition.push(item.offsetTop);
            })
            return itemsPosition;
        },
        _getTouchOffsetX:function (y) {
            return y - this.boundingBox.offset().top;
        },
        _bind_gloableEvent:function () {
            var that = this;
            F.app.on('drawImg',function (data) {
                var _img = new Image();
                if(data.data.originEvent){
                    var fr = new FileReader();
                    fr.onload = function () {
                        _img.src = fr.result;
                    }
                    _img.onload=function () {
                        var _layer = that.layerList[0],
                            _imgW = _img.naturalWidth,
                            _imgH = _img.naturalHeight;
                        _imgRatio = Math.abs(_imgH/(_imgW/300));
                        _layer.context.clearRect(0,0,_layer.size.width,_layer.size.height);
                        _layer.context.drawImage(_img,0,0,_layer.size.width,_layer.size.height);
                    }
                    fr.readAsDataURL(data.data.originEvent.target.files[0]);
                }else{
                    _img.src = data.data.src;
                    console.log(_img.src);
                    var _layer = that.layerList[0],
                        _imgW = _img.naturalWidth,
                        _imgH = _img.naturalHeight,
                        _imgRatio;//缩放比例

                    _imgRatio = Math.abs(_imgH/(_imgW/300));
                    _layer.context.clearRect(0,0,_layer.size.width,_layer.size.height);
                    // _layer.context.drawImage(_img,40,100,300,_imgRatio);
                    _layer.context.drawImage(_img,0,0,_layer.size.width,_layer.size.height);
                }

            });
            F.app.on('putImgData',function (data) {
                var _currentLayer = that._get_layer_byFirst(),
                    _tempImg  = new Image(),
                    _context = _currentLayer.context,
                    _scaleX = data.transform.scaleX,
                    _scaleY = data.transform.scaleY,
                    _translateX,_translateY;
                _tempImg.src = data.imageDataURL;
                // _context.save();
                /**
                 * 只有scale时候的translateX Y的计算公式
                 * 已知fillRect(x,y,w,h)
                 * 已知scale(scaleX,scaleY)
                 * 可得translateX = (scaleX - 1) * w
                 * translateY = (scaleY - 1) * h
                 */
                _translateX = (_scaleX - 1) * data.w *(-1);
                // _translateX = (_scaleX - 1) * data.w;
                _translateY = (_scaleY - 1) * data.h *(-1);
                // _translateY = (_scaleY - 1) * data.h;
                //translate 改变画笔的基准点
                _context.translate(_translateX,_translateY);
                _context.scale(_scaleX,_scaleY);
                //scale rotate 对imgdata无效，但是对imgdataurl有效
                // _context.putImageData(data.imgData,data.x,data.y);
                _tempImg.onload=function () {
                    _context.drawImage(_tempImg,data.x,data.y,data.w,data.h);
                }
                //reset
                // _context.scale(1,1);
                // _context.translate(0,0);
                // _context.restore();
            })
            F.app.on('addLayer',function (data) {
                that.addLayer();
            });
            F.app.on('needCutImg',function (data) {
                var _currentLayer =that._get_layer_byFirst(),
                    _imgData = _currentLayer.getImgData(data);
                F.app.trigger('getCutImgData',{
                    data:_imgData
                })
            });
            F.app.on('layer_addClass',function (data) {
                that.layerContaienr.addClass(data.value);
            });
            F.app.on('layer_removeClass',function (data) {
                that.layerContaienr.removeClass(data.value);
            })
            F.app.on('need_get_finalImgData',function () {
                var $tempCanvas=  $('.P_tempCanvas'),
                    tempCanvasContext = $tempCanvas[0].getContext('2d');
                $tempCanvas.attr({
                    width:that.size.width,
                    height:that.size.height
                })
                that.layerList.forEach(function (item,index) {
                    if(item.disable){
                        tempCanvasContext.putImageData(item.getImgData(),0,0);
                    }
                })
                F.app.trigger('get_finalImgData',{
                    data: tempCanvasContext.getImageData(0,0,that.size.width,that.size.height),
                    canvas:$tempCanvas
                })
            })

        },
        _get_layer_byFirst:function () {
            var _layer,that = this;
            that.layerList.forEach(function (item,index) {
                if(item.disable){
                    _layer = item;
                    return;
                }
            })
            return _layer;
        }
    })





    function Layer(){
        Widget.apply(this,arguments)
    }
    Layer.ATTRS = {
        boundingBox:{
            value:$('<canvas>123</canvas>')
        },
        context:{
            value:null
        },
        index:{
            value:0
        },
        disable:{
            value:true
        }
    }
    F.extend(Layer,Widget,{
        initialize:function () {
        },
        renderUI:function () {
            this._getDom();
            this._getContext();
            this._set_canvasSize();
        },
        bindUI:function () {
            this._bindCanvasEvent();
            this._bind_attrEvent();
            this._bind_contextChange();
        },
        syncUI:function () {

        },
        _getDom:function () {
            this.boundingBox.attr({
                'data-origin-index':this.index,
                'data-i':this.index
            });
            this._$$canvas = this.boundingBox;

        },
        _getContext:function () {
            var context = this._$$canvas[0].getContext('2d');
            this.setContext(context);
        },
        _bind_attrEvent:function () {
            var that = this;
            that.on('disableChange',function (data) {
                if(data.value){
                    this.boundingBox.show();
                }else{
                    this.boundingBox.hide();
                }
            })
        },
        drawImg:function () {

        },
        show:function () {
            this.setDisable(true);
        },
        hide:function () {
            this.setDisable(false);
        },
        getImgData:function (data) {
            if(!data){
                data = {};
            }
            var _w = data.w || this.size.width,
                _h = data.h || this.size.height,
                _x = data.x || 0,
                _y = data.y || 0,
                imgData = this.context.getImageData(_x,_y,_w,_h);
            if(Object.keys(data).length!=0){
                this.context.clearRect(_x,_y,_w,_h);
            }
            return imgData;
        },
        _set_canvasSize:function () {
            var width = F.app.boundingBox.width(),
                height = F.app.boundingBox.height();
            this.size = {
                width:width,
                height:height
            };
            F.app.size = this.size;
            this.boundingBox.attr({
                width:width,
                height:height
            })
        },
        _bindCanvasEvent:function(){
            var that = this,
                startPosition = {},
                movingPosition = {},
                drawing = false;

            this._$$canvas.on(tap.tapStart,function(e){
                drawing = true;
                startPosition = util.getTouchPosition(e,'client');
                F.app.trigger('drawstart',{
                    touchPosition:startPosition,
                    originEvent:e,
                    context:that.context,
                    that:that
                })
            })
            this._$$canvas.on(tap.tapMove,function(e){
                if(!drawing){
                    return;
                }
                movingPosition = util.getTouchPosition(e,'client');
                F.app.trigger('drawing',{
                    touchPosition:movingPosition,
                    originEvent:e,
                    context:that.context,
                    that:that
                })
            })
            this._$$canvas.on(tap.tapEnd,function(e){
                drawing = false;
                F.app.trigger('drawend',{
                    originEvent:e,
                    context:that.context,
                    that:that
                })
                that.context.closePath();
            })
        },
        _bind_contextChange:function () {
            var that = this;
            F.app.on('updateContextConfig',function (data) {
                that.contextConfig = this.contextConfig|| {};
                for(var i in data){
                    that.contextConfig[i] = data[i];
                }
                for(var i in that.contextConfig){
                    switch (i){
                        case 'setLineDash':
                            that.context[i](that.contextConfig[i]);
                            break;
                        default:
                            that.context[i] = that.contextConfig[i];
                        break;
                    }
                }
            })
        }


    })
    function LayerItem() {
        Widget.apply(this,arguments)
    }
    LayerItem.ATTRS = {
        index:{
            value:''
        },
        boundingBox:{
            value:$('<li>' +
                '<span class="P_layerItem_title"></span>' +
                '<span class="P_layerItem_show" >隐藏</span>' +
            '</li>')
        },
        isDisplay:{
            value:true
        },
        title:{
            value:''
        },
        parent:{
            value:null
        }
    }
    F.extend(LayerItem,Widget,{
        initialize:function () {
        },
        renderUI:function () {
            this._$title = this.boundingBox.find('.P_layerItem_title');
            this._$title.html(this.title|| ('图层'+(this.index+1)));
            this._$display = this.boundingBox.find('.P_layerItem_show');
            this.boundingBox.attr({'data-i':this.index});
        },
        bindUI:function () {
            this._bind_domEvent();
            this._bind_attrEvent();
        },
        syncUI:function () {
            var that = this;
            that.boundingBox.on(tap.tap,'.P_layerItem_show',function (e) {

            })
            that.boundingBox.on(tap.tap,'.P_layerItem_title',function (e) {

            })
        },
        _bind_domEvent:function () {
            var that = this;
            that.boundingBox.on(tap.tap,'.P_layerItem_show',function(e){
                that.setIsDisplay(!that.isDisplay);
            })
        },
        _bind_attrEvent:function () {
            var that = this;
            that.on('isDisplayChange',function (data) {
                if(data.value){
                    that.boundingBox.removeClass('displayNone');
                    this._$display.html('隐藏')
                }else{
                    that.boundingBox.addClass('displayNone');
                    this._$display.html('显示')
                }
                that.parent.trigger('displayChange',{
                    index:that.index,
                    data:data.value
                });
            });
            that.on('titleChange',function (data) {
                that._$title.html(data.value);
            })
        }

    })

    return {
        LayerWidgetPanel:LayerWidgetPanel,
    }
})