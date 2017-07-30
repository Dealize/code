require.config({
    paths:{
        'FFF':'../fff',
        'tap':'./lib/tap',
        'fnConf':'./fnConf',
        'util':'./lib/util',
        'fnShowWidget':'./appWidget/fnShowWidget',
        'fnListWidget':'./appWidget/fnListWidget',
        'fnWidget':'./function/fnWidget',
        'shapeWidget':'./function/shapeWidget',
        'brushWidget':'./function/brushWidget',
        'colorWidget':'./function/colorWidget',
        'colorPickerWidget':'./function/colorPickerWidget',
        'basePicWidget':'./function/basePicWidget',
        'layerWidget':'./function/layerWidget',
        'fileWidget':'./function/fileWidget',
        'filterWidget':'./function/filterWidget',
        'slicerWidget':'./function/slicerWidget',

    }
})


require(['FFF','tap','fnListWidget','fnShowWidget'],function (FFF,tap,fnListWidget,fnShowWidget) {
    var F = FFF.FFF,
        Base = F.Base,
        Widget = F.Widget;
    function App(){
        Widget.apply(this,arguments);
    }
    App.ATTRS = {
        boundingBox:{
            value:$('<div id="P_app"></div>')
        },
        drawMethod:{
            value:null
        }
    }
    F.extend(App,Widget, {
        initialize:function () {},
        renderUI:function () {},
        bindUI:function () {
            this._preventBodyDefault();
            this._bind_event();
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
        _bind_event:function () {
            var that =this;
            this.on('changeDrawMethod',function (fnList) {
                that._drawstart = fnList.drawstart;
                that._drawing = fnList.drawing;
                that._drawend = fnList.drawend;
            })
            this.on('drawstart',function (data) {
                that._drawstart && that._drawstart(data);
                that.trigger('showFnPanelToggle',{
                    status:'off'
                });
                that.trigger('showStatusBarToggle',{
                    status:'off'
                })
            })
            this.on('drawing',function (data) {
                that._drawing && that._drawing(data);
            })
            this.on('drawend',function (data) {
                that._drawend && that._drawend(data);
                that.trigger('showStatusBarToggle',{
                    status:'on'
                })
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