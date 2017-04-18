define(['Base','language','jquery'],function(Base,language,JQuery){
    function Widget(){
        Base.apply(this,arguments);
        this.boundingBox = $(language.clone(this.constructor.prototype.boundingBox[0]));
        this.plugins = this.constructor.prototype.plugins;
        for(var i in arguments[0]){
            if(i=='boundingBox' ){
                if(arguments[0][i] instanceof  JQuery){
                    this.boundingBox = arguments[0][i];
                }else if(arguments[0][i].nodeType!='undefined'){
                    this.boundingBox = $(arguments[0][i])
                }else{
                    console.warn('传入的boundingBox非法');
                }
            }
        }
    }

    language.extend(Widget,Base)
    Widget.prototype.__attr = {};
    Widget.prototype.plugins = {};
    Widget.prototype.boundingBox = $('<div class="boundingBox"></div>');

    Widget.prototype.renderUI = function(){}
    Widget.prototype.bindUI = function(){}
    Widget.prototype.syncUI = function(){}
    Widget.prototype.destructor = function(){}


    Widget.prototype.render = function(config){
        if(this.__arg.boundingBox =='undefined'){
            var _container = config.container?config.container:$('body');
            _container.append(this.boundingBox);
        }else{

        }
        // this.callParent('renderUI');
        // this.callParent('bindUI');
        this.renderUI(config);
        this.bindUI(config);
        this.syncUI(config);
        return this;
    }
    Widget.prototype.destroy = function(){
        this.destructor();
        this.boundingBox.remove();
        for(var i in this){
            delete this[i];
        }
        return this;
    }
    Widget.prototype.plug = function(plugin){
        var that = this;
        //console.log(plugin);
        plugin.forEach(function(i){
            //console.log(i);
            i.pluginHost = that;
            // i.pluginHostDom = that.attr.boundingBox;
            that.attr.plugins[i.attr.pluginName] = i;
        })
        //console.log(that)
        return this;
    }
    Widget.prototype.unplug = function(){
        return this;
    }

    return Widget;
})