define('Base',function(){
    function Base(){
        this.ATTR = {
            name:'base222'
        }
    }
    Base.ATTR = {
        name:'base'
    }
    Base.prototype.__run = function(){
        console.log('base init',this)
    }
    return Base;
})