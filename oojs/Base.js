define(['language'],function(language){
    function Base(){
        language.mixin(this.constructor.prototype.__attr,this.constructor.prototype.data,true)
        //var aa = language.mixin(this.constructor.prototype.__attr,this.constructor.prototype.data,true)
        //console.log(aa); // 把两个属性合并了，widget原型下的__attr和BoxWidget原型下的data 
        this.data = language.mixin(this.data,this.constructor.prototype.__attr,true);
        delete this.constructor.prototype.data;
        delete this.constructor.prototype.__attr;
        this.__run();
    }
    Base.prototype.init = function(){}

    Base.prototype.__attr = {}
    Base.prototype.__run = function(){
        //console.log(this)
        this.init();
    }
    return Base
})