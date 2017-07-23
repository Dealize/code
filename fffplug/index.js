require.config({
    paths:{
        'FFF':'../fff',
    }
})

require(['FFF','plug','rect'], function (FFF,plug,rect) {

    var aaa = new rect.Rect().render();
})