require.config({
    paths:{
        'FFF':'../fff',
        'tap':'./lib/tap',
        'fnConf':'./fnConf',
        'fnShowWidget':'./appWidget/fnShowWidget',
        'fnListWidget':'./appWidget/fnListWidget',
        'fnWidget':'./function/fnWidget',
        'shapeWidget':'./function/shapeWidget',
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
            this._preventBodyDefault();
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
        },
        _preventBodyDefault:function(){
            $('body').on(tap.tapStart,function(e){
                e.preventDefault();
            })
        },

    })

    var app = new App().render({
        container:$('.P_body')
    });
    F.app = app;
    app.run();
})