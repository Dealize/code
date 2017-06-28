define(['FFF','tap','fnWidget'],function (FFF,tap,fnWidget) {
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
                '<div class="P_layer_add P_layerPanel_item">添加图层</div>' +
                '' +
                '</div>')
        }
    }
    F.extend(LayerWidgetPanel,fnPanel,{
        initialize:function () {
        },
        renderUI:function () {
        },
        bindUI:function () {

        },
        syncUI:function () {
        },
        getDom:function () {

        },
        _bind_addLayer:function () {
            var that = this;
            this._$$addLayer = this.boundingBox.find('.P_layer_add');
            this._$$addLayer.on(tap.tap,function (e) {
                that.layerManager.addLayer();
            })
        },
        _run_layerManager:function () {
            var that = this;
            var aaa  = new LayerManager({
                app:that.app,
                parent:that
            }).render({
                container:that.getBoundingBox()
            });
            console.log(aaa);
            this.app.layerManager = this.layerManager;
        }
    })












    function LayerManager(){
        Widget.apply(this,arguments);
    }
    LayerManager.ATTRS = {
        layerList:{
            value:[]
        },
        layerItemList:{
            value:[]
        },
        app:{value:null},
        parent:{value:null},
        boundingBox:{
            value:$('<ul class="P_layer_list ">666</ul>')
        }
    }
    F.extend(LayerManager,Widget,{
        initialize:function () {
            // this.bindEvent();
        },
        render:function () {
        },
        bindUI:function () {
        },
        syncUI:function () {

        },
        addLayer:function () {
            var that = this,
                _newLayer = new Layer({
                    parent:that,
                    app:that.app
                }),
                _newLayerItem = new LayerItem({
                    parent:that,
                    app:that.app
                });
            _newLayer.render({
                container:that.app.boundingBox,
            });
            _newLayerItem.render({
                container:that.boundingBox,
            });
            this.layerList.push(_newLayer);
            this.layerItemList.push(_newLayerItem);
            this.setLayerList(this.layerList);
            this.setLayerItemList(this.layerItemList);
        },
    })





    function Layer(){
        Widget.apply(this,arguments)
    }
    Layer.ATTRS = {
        app:{value:null},
        parent:{value:null},
        boundingBox:{
            value:$('<div><canvas></canvas></div>')
        }
    }
    F.extend(Layer,Widget,{
        initialize:function () {
        },
        render:function () {
            console.log('layer')
        },
        bindUI:function () {
        },
        syncUI:function () {

        },



    })
    function LayerItem(){
        Widget.apply(this,arguments)
    }
    LayerItem.ATTRS = {
        app:{value:null},
        parent:{value:null},
        boundingBox:{
            value:$('<div class="P_layerPanel_item">111</div>')
        }
    }
    F.extend(LayerItem,Widget,{
        initialize:function () {
            // this.bindEvent();
        },
        render:function () {
            console.log('layerItem')

        },
        bindUI:function () {
        },
        syncUI:function () {

        },
        addLayer:function () {
            console.log(123);
        },


    })

    return {
        LayerWidgetPanel:LayerWidgetPanel,
    }
})