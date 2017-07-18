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

            })
            this._bind_dragEvent();
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
                    index:this.layerList.length
                }).render({
                container:this.boundingBox
            })
            this.layerList.push(newLayer);
            this.layerItemList.push(newLayerItem)
        },
        getLayerContext:function (index) {
            return this.layerList[index]['context']|| null;
        },
        _bind_dragEvent:function () {
            var that = this,
                itemsPosition,
                $movingItem;
            that.boundingBox.on(tap.tapStart,'li',function (e) {
                itemsPosition = that._getItemPosition();
                console.log(itemsPosition);
                // $movingItem = $(this.cloneNode(true));
                // var currentIndex = this.dataset.i;
             // $movingItem.addClass('isMoving').css('top',itemsPosition[currentIndex]-10);
             //    that.boundingBox.append($movingItem);
            })
            // isMoving
            that.boundingBox.on(tap.tapMove,'li',function (e) {
                console.log(util.getTouchPosition(e,'offset'));
            })
            that.boundingBox.on(tap.tapEnd,'li',function () {
                console.log(this);
            })
        },
        _getItemPosition:function () {
            var that = this,
                items = that.boundingBox.find('li'),
                itemsPosition = [];
            items.each(function (index, item) {
                itemsPosition.push(item.offsetTop);
            })
            console.log(itemsPosition);
            return itemsPosition;
        },
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
            this._$$canvas = this.boundingBox;

        },
        _getContext:function () {
            var context = this._$$canvas[0].getContext('2d');
            this.setContext(context);
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
                '<span class="P_layerItem_up" >上</span>' +
                '<span class="P_layerItem_down" >下</span>' +
                '<span class="P_layerItem_show" >隐藏</span>' +
            '</li>')
        },
    }
    F.extend(LayerItem,Widget,{
        initialize:function () {
        },
        renderUI:function () {
            this._$title = this.boundingBox.find('.P_layerItem_title');
            this._$title.html('图层'+(this.index+1)).attr({'data-i':this.index});
        },
        bindUI:function () {
            this._bind_domEvent();
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
            // that.boundingBox.on(tap.tap,function(e){
            //     console.log(this);
            // })
        }


    })

    return {
        LayerWidgetPanel:LayerWidgetPanel,
    }
})