require(['oojs'],function(OOJS){
    var Base = OOJS.Base;
    var Widget = OOJS.Widget;
    var a = new Base();


    function Demo(){
        Widget.apply(this,arguments)
    }
    Demo.ATTR = {
        dom: '<div>666</div>'
    }
    OOJS.language.extend(Demo,Widget,{
        initialize:function(){
            this.aaa = 'demo';
            console.log(this);
        },
        renderUI:function(){},
        bindUI:function(){},
        syncUI:function(){},
        destructor:function(){}
    })
    var b = new Demo().render({
        
    });
    console.log(Demo,b)
})