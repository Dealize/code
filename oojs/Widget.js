define(['Base','language'],function(Base,language){
    function Widget(){
        console.log(this);
        Base.apply(this,arguments)
    }
    Widget.__initAttr = {
        dom:'',
        domData:{},
        super:'',
        plugins:{}
    }

    language.extend(Widget,Base)

    function renderUI(){}
    function bindUI(){}
    function syncUI(){}
    function destructor(){

    }
    var widgetFn = {
        render:function(){
            var _container = arguments[0].container?arguments[0].container:document.body
            // _container.appendChild(this.ATTR.dom)
            _container.innerHTML = this.ATTR.dom;
            renderUI();
            bindUI();
            syncUI();
            return this;
        },
        destroy:function(){
             destructor();
             return this;
        },
        plug:function(){},
        unplug:function(){},
        
    }

    language.mixin(Widget.prototype,widgetFn,true);
    return Widget;
})