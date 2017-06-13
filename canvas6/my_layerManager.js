define(['FFF','layer','layerManager'],function (FFF,layer,layerManager) {
    var F = FFF.FFF,
        LayerManager = layerManager.LayerManager;

    function My_layerManager(){
        LayerManager.apply(this,arguments);
    }
    My_layerManager.ATTRS = {
        boundingBox:{
            value:$('<div class="DC_layerManager">' +
                '<div class="DC_layerManager_left">' +
                '<div class="DC_layerManager_addLayer">新建图层</div>' +
                '</div>' +
                '<div class="DC_layerManager_center"></div>' +
                '<div class="DC_layerManager_save">点击保存</div>' +
                '</div>')
        },
    }
    F.extend(My_layerManager,LayerManager,{
        initialize:function () {
            this.callParent();
        },
        renderUI:function () {
            this.callParent();

        },
        bindUI:function () {
            this.callParent();

        },
        syncUI:function () {
            this.callParent();

        },
        addedLayer:function () {

        },
        getDomObj:function () {

        },

    })
    return {
        My_layerManager:My_layerManager,
    }
})