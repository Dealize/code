define(['language'],function(language){
    function Base(){
        language.mixin(this.constructor.prototype.__attr,this.constructor.prototype.attr,true)
        this.attr = language.clone(this.constructor.prototype.__attr);
        // this.attr = language.mixin(this.attr,this.constructor.prototype.__attr,true);


        this.__run(arguments);
    }
    Base.prototype.init = function(arg){
    }
    Base.prototype.__attr = {};


    Base.prototype.callParent = function (fn,arg) {
        this.__superFn__ = this.superFn[fn];
        this.__superFn__ && this.__superFn__(arg);
    }

    //Event
    Base.prototype.on = function (name,fn) {
        if(this.__events__==undefined){
            this.__events__ = {};
        }
        //已经有该名字的事件,事件要依次被触发而不是被覆盖
        if(this.__events__[name] && typeof this.__events__[name] instanceof  Array){
            this.__events__[name].push(fn);
        }else if(typeof this.__events__[name]=='function'){
            this.__events__[name] = [this.__events__[name],fn]
        }else{
            this.__events__[name] = fn;
        }
    }
    Base.prototype.trigger = function (name,args,fn) {
        if(this.__events__==undefined){
            this.__events__ = {};
        }
        if(this.__events__[name] instanceof Array){
            for(var i in this.__events__[name]){
                this.__events__[name][i](args)
            }
        }else if(this.__events__[name]){
            this.__events__[name](args);
        }else{
            // console.warn('没有绑定过'+name+'事件')
        }
        fn && fn();
    }
    Base.prototype.off = function (name) {
        delete this.__events__[name]
    }
    Base.prototype.offAll = function () {
        this.__events__ = {}
    }



    Base.prototype.setData = function (data,from) {
        var _tempData = [];
        var _tempDataKey = [];
        for(var i in data){
            var _oldValue = this.attr[i];
            this.attr[i] = data[i];
            this[i] = this.attr[i];
            _tempData.push({
                oldValue:_oldValue,
                value:data[i]
            })
            _tempDataKey.push(i);
        }
        // if(from=='sys'){
          for(var i in _tempDataKey){
              this.trigger(_tempDataKey[i]+'Change',_tempData[i]);
          }
        // }
    }
    Base.prototype.__run = function(arg){
        var _argObj = {};
        for(var i in this.attr){
            this[i] = this.attr[i];
        }
        for(var i in arg[0]){
            if(i !='boundingBox'){
              _argObj[i] = arg[0][i];
            }
        }
        this.setData(_argObj,'sys');
        this.__arg = arg[0];
        this.init(arg[0]);
    }
    return Base;
})
