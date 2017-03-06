define(['language'],function(language){
    function Base(){
        language.mixin(this.constructor.prototype.__attr,this.constructor.prototype.attr,true)
        this.attr = language.mixin(this.attr,this.constructor.prototype.__attr,true);
        this.root = this.constructor.prototype.root;
        this.parent = this.constructor.prototype.parent;
        this.children = this.constructor.prototype.children;

        delete this.constructor.prototype.attr;
        delete this.constructor.prototype.__attr;
        delete this.constructor.prototype.root;
        delete this.constructor.prototype.parent;
        delete this.constructor.prototype.children;

        this.__run();
    }
    Base.prototype.init = function(){}
    Base.prototype.__attr = {};


    //Manager Attrs
    Base.prototype.parent = {};
    Base.prototype.children = {};
    Base.prototype.root = {};



    //Event
    Base.prototype.__events__ = function () {}
    Base.prototype.on = function (name,fn) {
    }
    Base.prototype.trigger = function (name,args,fn) {
        if(typeof this.__events__[name]=='array'){

        }

    }
    Base.prototype.off = function (name) {
        delete this.__events__[name]
    }
    Base.prototype.offAll = function () {
        this.__events__ = {}
    }

    Base.prototype.__run = function(){
        this.init();
    }
    return Base;
})