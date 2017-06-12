require.config({
    paths:{
        'FFF':'../fff',
        'layer':'./layer',
        'layerManager':'./layerManager'
    }
})


require(['FFF','layerManager'],function (FFF,layerManager) {
    var F = FFF.FFF,
        Widget = F.Widget;
    function App(){
        Widget.apply(this,arguments);
    }
    F.extend(App,Widget, {
        attr:{
            charsArr:[]
        },
        initialize:function (cfg) {
            var a = new layerManager.LayerManager({
                index:1
            }).render();

        },
        bindUI:function () {
            var that  = this;
            $('canvas').on('mousedown',function (e) {
                console.log(1);
            })
        },
    })

    var app = new App({
        boundingBox:$('body')
    }).render();
})