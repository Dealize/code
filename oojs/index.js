require(['oojs'],function(OOJS){
    var Base = OOJS.Base;
    var Widget = OOJS.Widget;
    var Plugin = OOJS.Plugin;
    // var a = new Base();


    // function Demo(){
    //     Widget.apply(this,arguments)
    // }
    // Demo.ATTR = {
    //     dom: '<div>666</div>'
    // }
    // OOJS.language.extend(Demo,Widget,{
    //     initialize:function(){
    //         this.aaa = 'demo';
    //         console.log(this);
    //     },
    //     renderUI:function(){},
    //     bindUI:function(){},
    //     syncUI:function(){},
    //     destructor:function(){}
    // })
    // var b = new Demo().render({
    //     container:document.body
    // });


    // function demoPlugin(){
    //     Plugin.apply(this,arguments);
    // }
    // demoPlugin.ATTR = {
    //     pluginData:{
    //         name:{
    //             value:'123',
    //         }
    //     }
    // }
    // OOJS.language.extend(demoPlugin,Plugin,{
    //     initialize:function(){
    //         console.log('demoplugin is init',this)
    //     },
    //     pluginFn:function(){
    //         console.log('demoplugin fn is called',this)
    //     }
    // })


    // window.demo1 = new demoPlugin()
    // window.demo2 = new demoPlugin()


    function baseDemo(){
        Base.apply(this,arguments);
    }
    baseDemo.ATTR = {
        dong:'tao'
    }
    OOJS.language.extend(baseDemo,Base,{
        initialize:function(){
            console.log('baseDemo is init',this)
        }
    })

    var a = new baseDemo();
    console.log(a);
})