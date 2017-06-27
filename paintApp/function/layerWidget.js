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
            value:$('<div class="P_fnPanelItem">' +
                '<div class="P_layer_add">添加图层</div>' +
                '<ul class="P_layer_list"></ul>' +
                '</div>')
        }
    }
    F.extend(LayerWidgetPanel,fnPanel,{
        initialize:function () {
        },
        renderUI:function () {
            this._bind_addLayer();
            this._run_layerManager();
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
            this.layerManager = new LayerManager({
                app:that.app,
                parent:that,
                boundingBox:that.boundingBox.find('.P_layer_list')
            });
            this.app.layerManager = this.layerManager;
            this.layerManager.render({
                container:that.boundingBox
            })
        }
        

    })

    function LayerManager(){
        Widget.apply(this,arguments)
    }
    LayerManager.ATTRS = {
        layerList:{
            value:[]
        },
        layerItemList:{
            value:[]
        },
        app:{value:null},
        parent:{value:null}
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
        parent:{value:null}
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
        parent:{value:null}
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