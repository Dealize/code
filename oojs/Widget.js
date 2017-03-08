define(['Base','language'],function(Base,language){
    function Widget(){
        Base.apply(this,arguments)
    }

    language.extend(Widget,Base)
    Widget.prototype.__attr = {
        container:'123',
        plugins:{}
    }
    Widget.prototype.renderUI = function(){}
    Widget.prototype.bindUI = function(){}
    Widget.prototype.syncUI = function(){}
    Widget.prototype.destructor = function(){}


    Widget.prototype.render = function(container){
        //this.container = container.container;
        //this.container.appendChild(this.data.boundingBox)
        //this.renderUI();
        //this.bindUI();
        return this;
    }
    Widget.prototype.destroy = function(){
        this.destructor();
        return this;
    }
    Widget.prototype.plug = function(plugin){
        var that = this;
        //console.log(plugin);
        plugin.forEach(function(i){
            //console.log(i);
            i.pluginHost = that;
            // i.pluginHostDom = that.data.boundingBox;
            that.data.plugins[i.data.pluginName] = i;
            //console.log(that.data.plugins[i.data.pluginName]);
        })
        //console.log(that)
        return this;
    }
    
    Widget.prototype.unplug = function(){
        return this;
    }

    return Widget;
})