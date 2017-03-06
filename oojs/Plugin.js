define(['language','Base'],function(language,Base){
    function Plugin(){
        Base.apply(this,arguments);
    }
    language.extend(Plugin,Base)
    Plugin.prototype.__attr = {}
    Plugin.prototype.pluginRun = function(){}
    Plugin.prototype.run = function(){
        this.pluginRun();
        return this;
    }
    Plugin.prototype.uninstall = function(){
        delete this.pluginHost.attr.plugins[this.attr.pluginName]
        console.log(this);
        alert('插件被卸载')
    }
    return  Plugin;
})