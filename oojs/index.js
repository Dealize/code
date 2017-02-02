require(['oojs'],function(OOJS){
    var Base = OOJS.Base;
    var Widget = OOJS.Widget;

    function baseDemo(){
        Widget.apply(this,arguments);
    }
    OOJS.language.extend(baseDemo,Widget,{
        data:{
            name:''
        },
        init:function(){
            console.log('baseDemo is init',this)
        },
        renderUI:function(){
            this.container.innerHTML = 'hello world';
        }
    })

    var a = new baseDemo().render({
        container:document.body
    });
    console.log(a);
})