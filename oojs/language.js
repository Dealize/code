define(function(){
    
    function extend(subclass,superclass,fns){
        for(var i in superclass.prototype){
            subclass.prototype[i] = superclass.prototype[i]
        }
        for(var i in fns){
            subclass.prototype[i] = fns[i]
        }
        subclass.prototype.constructor = subclass;
        subclass.ATTR= subclass.ATTR?subclass.ATTR:{};
        subclass.ATTR.super = superclass.name;
        subclass.ATTR.name = subclass.name;
        mixin(subclass.ATTR,subclass.__initAttr,true)
        subclass.apply(subclass.ATTR);
        // subclass.prototype.ATTR = subclass.prototype._attr;
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