require.config({
    paths:{
        'FFF':'../fff',
        'tap':'./lib/tap',
        'fnConf':'./fnConf',
        'fnShowWidget':'./appWidget/fnShowWidget',
        'fnListWidget':'./appWidget/fnListWidget',
        'fnWidget':'./function/fnWidget',
        'rectWidget':'./function/rectWidget',
        'layerWidget':'./function/layerWidget'

    }
})


require(['FFF','tap','fnListWidget','fnShowWidget'],function (FFF,tap,fnListWidget,fnShowWidget) {
    var F = FFF.FFF,
        Base = F.Base,
        Widget = F.Widget
    function App(){
        Widget.apply(this,arguments);
    }
    App.ATTRS = {
        boundingBox:{
            value:$('<div id="P_app"></div>')
        },
    }
    F.extend(App,Widget, {
        initialize:function () {},
        renderUI:function () {},
        bindUI:function () {
        },
        syncUI:function () {},
        run:function () {
            this._new_fnShowWidget();
            this._new_fnListWidget();
            return this;
        },
        _new_fnListWidget:function () {
            this._newFnListWidget = new fnListWidget.FnListWidget();
        },
        _new_fnShowWidget:function () {
            this._new_fnShowWidget = new fnShowWidget.FnShowWidget().render({
                container:this.boundingBox
            })
        }
    })

    var app = new App().render({
        container:$('.P_body')
    });
    F.app = app;
    app.run();
})