require(['oojs'],function(OOJS){
    var Base = OOJS.Base;
    var Widget = OOJS.Widget;
    var Plugin = OOJS.Plugin;


    function divWidget(){
        Widget.apply(this,arguments)
    }
    OOJS.language.extend(divWidget,Widget,{
        attr:{
            
        },
        init:function (cfg) {
            console.log(cfg);
        },
        renderUI:function () {
            
        },
        bindUI:function () {
            
        }
    })

    var a = new divWidget({
        name:123,
        boundingBox:$('body')
    }).render({
        container:$('body')
    });
    console.log(a);

})