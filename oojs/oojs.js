(function (window) {
    function Base(){
        this._init()
    }
    Base.ATTR = [123];
    Base.prototype._init = function () {
        Base.prototype.initialize();
        this.ATTR = Base.ATTR;
    }
    Base.prototype.initialize = function () {
        console.info(this,'initialize');
    }

    function extend(subClass,superClass,fns){
        for(var i in superClass.prototype){
            subClass.prototype[i] = superClass.prototype[i]
        }
        for(var i in superClass){
            subClass[i] = superClass[i];
        }
        for(var i in fns){
            subClass.prototype[i] = fns[i]
        }
        subClass.prototype._init();
    }

    window.OOJS = {
        Base:Base,
        core:{
            extend:extend
        }
    }
})(window)

var Base = OOJS.Base;
function demo(){
    this.name = 'demo';
}
demo.age = '666'
OOJS.core.extend(demo,Base,{
    initialize: function () {
        console.log(this,123);
    }
});
var a = new demo();
