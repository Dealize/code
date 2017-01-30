define(['language'],function(language){
    function Base(){
        console.info('Base')
    }
    Base.__initAttr = {
        super:''
    }
    Base.prototype.initialize = function(){
        console.info('initialize',this);
    }
    var BaseFn = {
        setData:function(obj){
            
        }
    }


    Base.prototype._init = function(){
        this.initialize();
    }
    return Base
})