define(['Base','language'],function(Base,language){
    function Widget(){
        Base.apply(this,arguments)
    }
    language.extend(Widget,Base)

    function renderUI(){}
    function bindUI(){}
    function syncUI(){}
    function destructor(){

    }
    var widgetFn = {
        render:function(){
            var _container = arguments[0].container?arguments.container:document.body
            // _container.appendChild(this.ATTR.dom)
            _container.innerHTML = this.ATTR.dom;
            renderUI();
            bindUI();
            syncUI();
        },
        destroy:function(){
             destructor()
        }
    }

    language.mixin(Widget.prototype,widgetFn,true);
    return Widget;
})