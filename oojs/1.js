
(function(window){
    /**
     * Base
     */
    function Base(){
        this._init();
    }   
    Base.prototype._init = function(){
        this.initialize();
    }
    Base.prototype.initialize = function(){
        console.info('initialize',this)
    }
    Base.prototype.sync = function(){
        console.log('sync',this);
    }
    /**
     * Widget
     */
   


    


    function extend(subclass,superclass,fns){
        for(var i in superclass.prototype){
            subclass.prototype[i] = superclass.prototype[i]
        }
        for(var i in fns){
            subclass.prototype[i] = fns[i]
        }
    }


    window.OOJS = {
        Base:Base,
        core:{
            extend:extend
        }    
    };
})(window)


function Widget(){
    OOJS.Base.apply(this,arguments)
}
OOJS.core.extend(Widget,OOJS.Base)
Widget.prototype.renderUI = function(){
    console.info('renderUI',this)
}
Widget.prototype.bindUI = function(){
    console.info('bindUI',this)
}
Widget.prototype.syncUI = function(){
    console.info('syncUI',this)
}
Widget.prototype.render = function(){
    console.info('render',this)
}
Widget.prototype.destroctor = function(){
    console.info('destructor',this)
}
Widget.prototype.destroy = function(){
    console.info('destructor',this)
}
Widget.prototype._init = function(){
    this.initialize();
    this.bindUI();
}

var bbb = new Widget();
