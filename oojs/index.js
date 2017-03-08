require(['oojs'],function(OOJS){
    var Base = OOJS.Base;
    var Widget = OOJS.Widget;
    var Plugin = OOJS.Plugin;

    function BoxWidget(){
        Widget.apply(this,arguments);
    }
    OOJS.language.extend(BoxWidget,Widget,{
        attr:{
            name:'',
            boundingBox:document.querySelector('#dragDiv')
        },
        init:function(){
        },
        renderUI:function(){
        }
    })


    function DragPlugin(){
        Plugin.apply(this,arguments)
    }
    OOJS.language.extend(DragPlugin,Plugin,{
        attr:{
            pluginName:'DragPlugin'
        },
        init:function(){
            console.log()
        },
        pluginRun:function(){
            var plugDom = this.pluginHost.attr.boundingBox;
            var disX,disY;
            var that = this;
            plugDom.style.position = 'absolute';
            function dragFn(e){
                disX = this.offsetTop - e.pageY;
                disY = this.offsetLeft - e.pageX;
                document.onmousemove = function(e){
                    plugDom.style.left = e.pageX+disX+'px';
                    plugDom.style.top = e.pageY +disY+'px';
                }
                document.onmouseup = function(e){
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
            }
            plugDom.addEventListener('mousedown',dragFn)
            document.addEventListener('keypress',function(e){
                if(e.keyCode==32){
                    //TODO: EventEmit 
                    that.uninstall();
                    plugDom.removeEventListener('mousedown',dragFn)
                }
            })
            
        }
    })

    var dragPlugin = new DragPlugin();
    var box = new BoxWidget().render({
        container:document.body
    }).plug([dragPlugin]);
    dragPlugin.run();


})