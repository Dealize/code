define(['FFF','layer'],function (FFF,layer) {
    var F = FFF.FFF,
        Widget = F.Widget;
    function LayerManager(){
        Widget.apply(this,arguments);
    }
    LayerManager.ATTRS = {
        boundingBox:{
            value:$('<div class="DC_layerManager">' +
                '<div class="DC_layerManager_left">' +
                '<div class="DC_layerManager_addLayer">新建图层</div>' +
                '</div>' +
                '<div class="DC_layerManager_right"></div>' +
                '</div>')
        },
        layerList:{
            value:[]
        }
    }
    F.extend(LayerManager,Widget,{
        initialize:function () {
        },
        renderUI:function () {
            this._getDom();
        },
        bindUI:function () {
            this._bindAddLayer();
            this._bindLayerItemOpearte();
            this._bindLayerListChange();
        },
        syncUI:function () {
        },

        //implement------------------------------------------------------------------------

        addedLayer:function (layer) {},

        //method -------------------------------------------------------------------------

        addLayer:function () {
            var that = this,
                newLayerIndex = that.layerList.length+1,
                newLayer;
            newLayer = new layer.Layer({
                index: newLayerIndex
            }).render({
                container:that._$layers_container,
            })

            this.layerList.push(newLayer);
            this._$layers_orderList.prepend('<div class="DC_layerManager_itemTitle" data-index="'+newLayerIndex+'" data-order="'+newLayerIndex+'">' +
                '<span class="DC_layerManager_itemName">图层'+newLayerIndex+'</span>' +
                '<span class="DC_layerManager_item_up">上</span>' +
                '<span class="DC_layerManager_item_down">下</span>' +
                '<span class="DC_layerManager_item_hide">hide</span>' +
                '<span class="DC_layerManager_item_close">X</span>' +
            '</div>')
            this.addedLayer(layer);
        },

        //self ---------------------------------------------------------------------------

        _getDom:function () {
            this._$layers_orderList = this.boundingBox.find('.DC_layerManager_left');
            this._$layers_container = this.boundingBox.find('.DC_layerManager_right');
        },
        _bindAddLayer:function () {
            var  that = this;
            this.boundingBox.find('.DC_layerManager_addLayer').on('click',function () {
                that.addLayer();
            })
        },
        _bindLayerItemOpearte:function () {
            var that = this,
                $parent,
                $target,
                $itemList,
                currentIndex;
            this.boundingBox.on('click','.DC_layerManager_item_up',function (e) {
                $parent = $(this).parent();
                $target = $parent.prev();
                $target.before($parent);
                $itemList = that._$layers_orderList.find('.DC_layerManager_itemTitle');
                $itemList.each(function(index,item){
                   item.dataset.order = $itemList.length - index;
                });
                currentIndex = $parent.data('order');
                var _currentLayer = that.layerList[currentIndex-1];
                that.layerList.splice(currentIndex-1,1);
                that.layerList.splice(currentIndex-1-1,0,_currentLayer);
                that.setLayerList(that.layerList);
            })
            this.boundingBox.on('click','.DC_layerManager_item_down',function (e) {
                $parent = $(this).parent();
                $target = $parent.prev();
                $target.before($parent);
                $itemList = that._$layers_orderList.find('.DC_layerManager_itemTitle');
                $itemList.each(function(index,item){
                    item.dataset.order = $itemList.length - index;
                });
                currentIndex = $parent.data('order');
                var _currentLayer = that.layerList[currentIndex-1];
                that.layerList.splice(currentIndex-1,1);
                that.layerList.splice(currentIndex-1-1,0,_currentLayer);
                that.setLayerList(that.layerList);
            });
            this.boundingBox.on('click','.DC_layerManager_item_hide',function (e) {
                $parent = $(this).parent();
                $target = $parent.prev();
                $target.before($parent);
                $itemList = that._$layers_orderList.find('.DC_layerManager_itemTitle');
                $itemList.each(function(index,item){
                    item.dataset.order = $itemList.length - index;
                });
                currentIndex = $parent.data('order');
                var _currentLayer = that.layerList[currentIndex-1];
                that.layerList.splice(currentIndex-1,1);
                that.layerList.splice(currentIndex-1-1,0,_currentLayer);
                that.setLayerList(that.layerList);
            });
            this.boundingBox.on('click','.DC_layerManager_item_close',function (e) {
                $parent = $(this).parent();
                $target = $parent.prev();
                $target.before($parent);
                $itemList = that._$layers_orderList.find('.DC_layerManager_itemTitle');
                $itemList.each(function(index,item){
                    item.dataset.order = $itemList.length - index;
                });
                currentIndex = $parent.data('order');
                var _currentLayer = that.layerList[currentIndex-1];
                that.layerList.splice(currentIndex-1,1);
                that.layerList.splice(currentIndex-1-1,0,_currentLayer);
                that.setLayerList(that.layerList);
            })

        },
        _bindLayerListChange:function () {
            this.on('layerListChange',function (data) {
                var arr = [];
                data.value.forEach(function (item,index) {
                  item.setIndex(index);
                  arr.push(item.order);
                })
                console.log(arr);
            })
        }
    })
    return {
        LayerManager:LayerManager,
    }
})