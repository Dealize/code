require.config({
    paths:{
        'FFF':'../fff',
        'layer':'./layer',
        'layerManager':'./layerManager',
        'my_layerManager':'./my_layerManager',
    }
})


require(['FFF','my_layerManager'],function (FFF,my_layerManager) {
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
            var a = new my_layerManager.My_layerManager({
                resultCanvas:$('#resultCanvas')[0]
            }).render({
                container:$('#app')
            });

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