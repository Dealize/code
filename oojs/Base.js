define(['language'],function(language){
    function Base(){
        language.mixin(this.constructor.prototype.__attr,this.constructor.prototype.data,true)
        this.data = language.mixin(this.data,this.constructor.prototype.__attr,true);
        delete this.constructor.prototype.data;
        delete this.constructor.prototype.__attr;
        this.__run();
    }
    Base.prototype.init = function(){}

    Base.prototype.__attr = {}
    Base.prototype.__run = function(){
        this.init();
    }
    return Base
})