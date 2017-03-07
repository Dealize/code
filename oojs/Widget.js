define(['Base','language'],function(Base,language){
    function Widget(){
        Base.apply(this,arguments);
        this.boundingBox = $(language.clone(this.constructor.prototype.boundingBox[0]));
        this.plugins = this.constructor.prototype.plugins;
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
        var _container = config.container?config.container:$('body');
        _container.append(this.boundingBox);
        this.callParent('renderUI');
        this.callParent('bindUI');
        this.renderUI(config);
        this.bindUI(config);
        return this;
    }
    Widget.prototype.destroy = function(){
        this.destructor();
        return this;
    }
    Widget.prototype.plug = function(plugin){
        var that = this;
        plugin.forEach(function(i){
            i.pluginHost = that;
            // i.pluginHostDom = that.attr.boundingBox;
            that.attr.plugins[i.attr.pluginName] = i;
        })
        return this;
    }
    Widget.prototype.unplug = function(){
        return this;
    }

    return Widget;
})