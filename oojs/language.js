define(function(){
    
    function extend(subclass,superclass,fns){
        for(var i in superclass.prototype){
            subclass.prototype[i] = superclass.prototype[i]
        }
        for(var i in fns){
            subclass.prototype[i] = fns[i]
        }
        subclass.prototype.constructor = subclass;
        subclass.prototype.ATTR = subclass.ATTR
        subclass.prototype._init();
    }

    function mixin(subobj,superobj,isRewrite){
        for(var i in superobj){
            if((subobj[i] != undefined && isRewrite==true)|| subobj[i]==undefined){
                subobj[i] = superobj[i]
            }
        }
    }

    return {
        extend:extend,
        mixin:mixin
    }
})