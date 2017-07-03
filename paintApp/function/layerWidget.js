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
                _img.src = data.data.src;
                var _layer = that.layerList[0],
                    _imgW = _img.naturalWidth,
                    _imgH = _img.naturalHeight,
                    _imgRatio;//缩放比例

                _imgRatio = Math.abs(_imgH/(_imgW/300));

                console.log(_imgRatio,_imgH);
                _layer.context.clearRect(0,0,_layer.size.width,_layer.size.height);
                _layer.context.drawImage(_img,40,100,300,_imgRatio);
            })
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
                    index:this.layerList-1
                }).render({
                container:this.layerContaienr
            }),
                newLayerItem = new LayerItem().render({
                container:this.boundingBox
            })
            this.layerList.push(newLayer);
        },
        getLayerContext:function (index) {
            return this.layerList[index]['context']|| null;
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
                F.app.trigger('showFnPanelToggle',{
                    status:'off'
                });
                drawing = true;
                startPosition = util.getTouchPosition(e,'client');
                that.context.strokeStyle = 'red';
                // that.context.lineWidth = '5';
                that.context.beginPath();
                that.context.moveTo(startPosition.x,startPosition.y);
                // that.context.moveTo(startPosition.x+100,startPosition.y+100);
                console.log(startPosition);
            })
            this._$$canvas.on(tap.tapMove,function(e){
                if(!drawing){
                    return;
                }
                movingPosition = util.getTouchPosition(e,'client');
                that.context.lineTo(movingPosition.x,movingPosition.y);
                that.context.stroke();
            })
            this._$$canvas.on(tap.tapEnd,function(e){
                drawing = false;
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
                    that.context[i] = that.contextConfig[i];
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
            value:$('<li></ul>')
        },
    }
    F.extend(LayerItem,Widget,{
        initialize:function () {
        },
        renderUI:function () {
            this.boundingBox.html('图层'+(this.index+1));
        },
        bindUI:function () {
        },
        syncUI:function () {

        },


    })

    return {
        LayerWidgetPanel:LayerWidgetPanel,
    }
})