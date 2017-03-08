define(['Base','language'],function(Base,language){
    function Manager(){
        Base.apply(this,arguments);
    }


    Manager.prototype.children = [];
    Manager.prototype.addChildren = function (children) {
        if(typeof child == 'array'){
            children.forEach(function (index,item) {
                addChild(item);
            })
        }else{
            addChild(children);
        }
        function addChild(child){
            this.child.push(child);
            child.parent = this;
        }
    }



    function Widget(){
        Base.apply(this,arguments);
        this.boundingBox = this.constructor.prototype.boundingBox;
        this.plugins = this.constructor.prototype.plugins;

        delete this.constructor.prototype.boundingBox;
        delete this.constructor.prototype.plugins;
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
        var _container = config.container?$('body'):config.container;
        _container.append(this.boundingBox[0]);
        this.renderUI(config);
        this.bindUI(config);
        return this;
    }
    Widget.prototype.destroy = function(){
        this.destructor();
        this.boundingBox.remove();
        for(var i in this){
            delete this[i];
        }
        console.warn(this);
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