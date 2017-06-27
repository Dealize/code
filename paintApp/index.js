require.config({
    paths:{
        'FFF':'../fff',
        'tap':'./lib/tap',
        'fnConf':'./fnConf',
        'fnListWidget':'./appWidget/fnListWidget',
        'fnWidget':'./function/fnWidget',
        'rectWidget':'./function/rectWidget',
        'layerWidget':'./function/layerWidget'

    }
})


require(['FFF','tap','fnListWidget'],function (FFF,tap,fnListWidget) {
    var F = FFF.FFF,
        Base = F.Base,
        Widget = F.Widget
    function App(){
        Widget.apply(this,arguments);
    }
    App.ATTRS = {
        boundingBox:{
            value:null
        },
    }
    F.extend(App,Widget, {
        initialize:function (cfg) {
            FFF.App = this;
        },
        renderUI:function () {
            this._new_fnListWidget();
            this._getDom();
        },
        bindUI:function () {
        },
        syncUI:function () {

        },
        _getDom:function () {
        },
        _new_fnListWidget:function () {
            var that = this;
            this._newFnListWidget = new fnListWidget.FnListWidget({
                boundingBox:that.boundingBox,
                app:that
            }).render({
                container:that.boundingBox
            });
        },

    })

    var app = new App({
        boundingBox:$('#P_app')
    }).render();
})