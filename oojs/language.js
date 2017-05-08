define(function(){

    function extend(subclass,superclass,fns){
        function temp(){}
        temp.prototype = superclass.prototype;
        subclass.prototype = new temp();
        subclass.prototype.constructor = subclass;
        subclass.prototype.extendFrom = superclass;
        subclass.prototype.superFn = {};
        fns && Object.keys(fns).forEach(function(key){
            switch (key){
                case 'attr':
                    mixin(subclass.prototype.__attr,superclass.prototype.attr);
                    break;
                // case 'init':
                // case 'renderUI':
                // case 'bindUI':
                // case 'syncUI':
                // case 'destructor':
                default:
                    subclass.prototype.superFn[key] = subclass.prototype[key];
                    break;
            }
            subclass.prototype[key] = fns[key];
        })
    }

    function mixin(subobj,superobj,isRewrite){
        subobj = subobj?subobj:{}
        for(var i in superobj){
            if((subobj[i] != undefined && isRewrite==true)|| subobj[i]==undefined){
                subobj[i] = superobj[i]
            }
        }
        return subobj;
    }

    function clone(obj){
        if(typeof obj =='string') {
            var cloned = {};
            cloned = obj;
        }else if(obj.nodeType){
            var cloned = obj.cloneNode();
        }else{
            var cloned ={};
            for(var key in obj){
                // if(typeof obj[key]=='object'){
                if(obj[key] instanceof Array){
                    cloned[key] = obj[key].concat();
                }else if(obj[key] instanceof Object){
                    cloned[key] = clone(obj[key])
                }else{
                    cloned[key] = obj[key];
                }
            }
        }

        return cloned;
    }

    function tap(){
        var tapObj = {}
        if(['ontouchend']in document){
            tapObj.tapStart = 'touchstart';
            tapObj.tapMove = 'touchmove';
            tapObj.tapEnd = 'touchend';
            tapObj.tap = 'touchend';
        }else{
            tapObj.tapStart = 'mousedown';
            tapObj.tapMove = 'mousemove';
            tapObj.tapEnd = 'mouseup';
            tapObj.tap = 'click';
        }
        return tapObj;
    }
    return {
        extend:extend,
        mixin:mixin,
        clone:clone,
        tap:tap()
    }
})