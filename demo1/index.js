require.config({
    paths:{
        'oojs':'../oojs/oojs',
        'Base':'../oojs/Base',
        'language':'../oojs/language',
        'Widget':'../oojs/Widget',
        'Plugin':'../oojs/Plugin'
    }
})

require(['oojs'],function (oojs) {
    var Base = oojs.Base,
        Widget = oojs.Widget;


    function DragDiv(){
        Widget.apply(this,arguments)
    }
    oojs.language.extend(DragDiv,Widget,{
        attr:{
            name:'123'
        },
        boundingBox:$('<h1>123123123</h1>'),
        init:function () {
            console.log('this is init',this);
        },
        renderUI:function () {
            console.log(666)
        }
    })


    var a = new DragDiv().render({
        container:$('body')
    })
    console.log(DragDiv,a);

})