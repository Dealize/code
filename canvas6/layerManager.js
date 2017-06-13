define(['FFF','layer'],function (FFF,layer) {
    var F = FFF.FFF,
        Widget = F.Widget;
    function LayerManager(){
        Widget.apply(this,arguments);
    }
    LayerManager.ATTRS = {
        boundingBox:{

        },
        layerList:{
            value:[]
        },
        resultCanvas:{

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
            this._bindLayerSave();
        },
        syncUI:function () {
            this.addLayer();
        },

        //implement------------------------------------------------------------------------

        addedLayer:function (layer) {},
        getDomObj:function () {},





        //method -------------------------------------------------------------------------

        addLayer:function () {
            var that = this,
                newLayerIndex = that.layerList.length,
                newLayer;
            newLayer = new layer.Layer({
                index: newLayerIndex,
                parent:this
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
        getLayerItemByIndex:function (index) {
            this._$layers_orderList = this.boundingBox.find('.DC_layerManager_left');
            var _$orderItemList = this._$layers_orderList.find('.DC_layerManager_itemTitle')
            return _$orderItemList[this.layerList.length-index];
        },
        saveImg:function () {

        },


        //self ---------------------------------------------------------------------------

        _getDom:function () {
            this._$layers_orderList = this.boundingBox.find('.DC_layerManager_left');
            this._$layers_container = this.boundingBox.find('.DC_layerManager_center');
            this.getDomObj();
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
                currentIndex,
                originIndex;
            this.boundingBox.on('click','.DC_layerManager_itemName',function (e) {
                $parent = $(this).parent();
                $itemList = that._$layers_orderList.find('.DC_layerManager_itemTitle');
                currentIndex = parseInt($parent[0].dataset.order);
                var _currentLayer = that.layerList[currentIndex];
                $itemList.each(function (index, item) {
                        $(item).removeClass('DC_layer_title_active');
                })
                $parent.addClass('DC_layer_title_active');
                that.layerList.forEach(function (item,index) {
                    if(index==currentIndex){
                        item.setIsActive(true);
                    }else{
                        item.setIsActive(false);
                    }
                })
            })
            this.boundingBox.on('click','.DC_layerManager_item_up',function (e) {
                $parent = $(this).parent();
                $target = $parent.prev();
                $target.before($parent);
                $itemList = that._$layers_orderList.find('.DC_layerManager_itemTitle');
                that.setLayerList(that.layerList);

                // currentIndex = $parent.data('order'); 为什么jquery 的data 会缓存
                currentIndex = parseInt($parent[0].dataset.order);
                var _currentLayer = that.layerList[currentIndex];
                that.layerList.splice(currentIndex,1);
                that.layerList.splice(currentIndex+1,0,_currentLayer);
                that.setLayerList(that.layerList);

                $itemList.each(function(index,item){
                    item.dataset.order = $itemList.length - index -1;
                });
            })
            this.boundingBox.on('click','.DC_layerManager_item_down',function (e) {
                $parent = $(this).parent();
                $target = $parent.next();
                $target.after($parent);
                $itemList = that._$layers_orderList.find('.DC_layerManager_itemTitle');
                // currentIndex = $parent.data('order');
                currentIndex = parseInt($parent[0].dataset.order);
                console.log(currentIndex);
                var _currentLayer = that.layerList[currentIndex];
                that.layerList.splice(currentIndex,1);
                that.layerList.splice(currentIndex-1,0,_currentLayer);
                that.setLayerList(that.layerList);
                $itemList.each(function(index,item){
                    item.dataset.order = $itemList.length - index -1;
                });

            });
            this.boundingBox.on('click','.DC_layerManager_item_hide',function (e) {
                $parent = $(this).parent();
                currentIndex = $parent.data('order');
                var _currentLayer = that.layerList[currentIndex];
                console.log(_currentLayer.order);
                _currentLayer.setIsDisplay(!_currentLayer.getIsDisplay());
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
            var that = this;
            this.on('layerListChange',function (data) {
                var arr = [];
                data.value.forEach(function (item,index) {
                    console.log(index);
                  item.setIndex(index);
                  arr.push(item.order);
                })
                console.log(arr);
            })
        },
        _bindLayerSave:function () {
            var that = this;
            this.boundingBox.find('.DC_layerManager_save').on('click',function(e){
                that._mergeLayer();
            })
        },
        _mergeLayer:function () {
            var that = this,
                _resultContext;
            _resultContext = that.resultCanvas.getContext('2d');
            _resultContext.clearRect(0,0,400,400);
            that.layerList.forEach(function(item,index){
                if(item.isDisplay==true){
                    _resultContext.drawImage(item.canvas,0,0);
                }
            })

        }

    })
    return {
        LayerManager:LayerManager,
    }
})