define(['language'],function(language){
    function Base(){
        console.info('Base')
    }
    Base.prototype.initialize = function(){
        console.info('initialize',this);
    }
    
    Base.prototype._init = function(){
        this.initialize();
    }
    return Base
})