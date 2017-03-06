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

    return {
        extend:extend,
        mixin:mixin
    }
})