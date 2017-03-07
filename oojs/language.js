define(function(){

    function extend(subclass,superclass,fns){
        function temp(){}
        temp.prototype = superclass.prototype;
        subclass.prototype = new temp();
        subclass.prototype.constructor = subclass;
        fns && Object.keys(fns).forEach(function(key){
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
                if(typeof obj[key]=='object'){
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
            tapObj.tapMove = 'touchMove';
            tapObj.tapEnd = 'tapEnd';
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