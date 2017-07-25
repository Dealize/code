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
        },
        renderUI:function () {
        },
        bindUI:function () {
            var that = this;
            F.app.on('drawImg',function (data) {
                var _img = new Image();
                if(data.data.originEvent){
                    var fr = new FileReader();
                    fr.onload = function () {
                        _img.src = fr.result;
                        console.log(fr);
                    }
                    _img.onload=function () {
                        var _layer = that.layerList[0],
                            _imgW = _img.naturalWidth,
                            _imgH = _img.naturalHeight;
                        _imgRatio = Math.abs(_imgH/(_imgW/300));
                        console.log(_imgRatio,_imgH);

                        _layer.context.clearRect(0,0,_layer.size.width,_layer.size.height);
                        _layer.context.drawImage(_img,40,100,300,600);
                    }
                    fr.readAsDataURL(data.data.originEvent.target.files[0]);
                }else{
                    _img.src = data.data.src;
                    var _layer = that.layerList[0],
                        _imgW = _img.naturalWidth,
                        _imgH = _img.naturalHeight,
                        _imgRatio;//缩放比例

                    _imgRatio = Math.abs(_imgH/(_imgW/300));

                    console.log(_imgRatio,_imgH);
                    _layer.context.clearRect(0,0,_layer.size.width,_layer.size.height);
                    _layer.context.drawImage(_img,40,100,300,_imgRatio);
                }

            });
            F.app.on('addLayer',function (data) {
                that.addLayer();
            })
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
            })
            this.layerList.push(newLayer);
            this.layerItemList.push(newLayerItem)
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
            })
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
                itemsPosition = that._getItemPosition();
                $currentItem = $(this);
                $movingItem = $(this.cloneNode(true));
                currentIndex = this.dataset.i;
                disY =that._getTouchOffsetX(util.getTouchPosition(e).y) - itemsPosition[currentIndex];
                console.log(disY);
                $movingItem.addClass('isMoving').css('top',this.offsetTop-10);
                that.boundingBox.append($movingItem);
            })
            // isMoving
            that.boundingBox.on(tap.tapMove,'li',function (e) {
                lastPosition = that._getTouchOffsetX(util.getTouchPosition(e).y);
                $movingItem.css({'top':lastPosition - disY})
            })
            that.boundingBox.on(tap.tapEnd,'li',function () {
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
                var canvaslist = that.layerContaienr.find('canvas');
                var $currentCanvas = $(canvaslist[currentIndex]);
                var $targetCanvas = $(canvaslist[targetIndex]);
                $targetCanvas.after($currentCanvas);

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
        }

    }
    F.extend(Layer,Widget,{
        initialize:function () {
            console.log(F.app.boundingBox.width(),F.app.boundingBox.height());
        },
        renderUI:function () {
            this._getDom();
            this._getContext();
            this._set_canvasSize();
        },
        bindUI:function () {
            this._bindCanvasEvent();
            this._bind_contextChange();
        },
        syncUI:function () {

        },
        _getDom:function () {
            this.boundingBox.attr('data-origin-index',this.index);
            this._$$canvas = this.boundingBox;

        },
        _getContext:function () {
            var context = this._$$canvas[0].getContext('2d');
            this.setContext(context);
        },
        drawImg:function () {

        },
        show:function () {
            this.boundingBox.show();
        },
        hide:function () {
            this.boundingBox.hide();
        },
        _set_canvasSize:function () {
            var width = F.app.boundingBox.width(),
                height = F.app.boundingBox.height();
            this.size = {
                width:width,
                height:height
            }
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
            that.boundingBox.on(tap.tap,'.P_layerItem_up',function (e) {
                $parent = $(this).parent();
                $target = $parent.prev();
                $target.before($parent);
            })
            that.boundingBox.on(tap.tap,'.P_layerItem_down',function (e) {

            })
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