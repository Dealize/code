require.config({
    paths:{
        'FFF':'../fff',
        'tap':'./lib/tap',
        'utilsConf':'./utilsConf',
        'UtilsListWidget':'./appWidget/UtilsListWidget',
        'rectWidget':'./paintWidget/rectWidget'
    }
})


require(['FFF','tap','UtilsListWidget'],function (FFF,tap,UtilsListWidget) {
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
        utilListIsShow:{
            value:false
        }
    }
    F.extend(App,Widget, {
        initialize:function (cfg) {

        },
        renderUI:function () {
            this._newUtilListWidget();
            this._getDom();
        },
        bindUI:function () {
            this._bind_utilToggle_event();
        },
        syncUI:function () {

        },
        _getDom:function () {
            this._$$utilToggle = this.boundingBox.find('.P_utilListToggle');
            this._$$utilList = this.boundingBox.find('.P_utilList');
            this._$$utilPanel = this.boundingBox.find('.P_utilPanel');
        },
        _newUtilListWidget:function () {
            var that = this;
            this._newUtilListWidget = new UtilsListWidget.UtilsListWidget({
                boundingBox:that.boundingBox
            }).render({
                container:that.boundingBox
            });
        },
        _bind_utilToggle_event:function () {
            var that = this;
            this._$$utilToggle.on(tap.tap,function () {
                that.setUtilListIsShow(!that.utilListIsShow);
            })
            this.on('utilListIsShowChange',function (data) {
                if(data.value){
                    that._$$utilList.removeClass('P_utilListHide').addClass('P_utilListShow');
                    that._$$utilPanel.removeClass('P_utilPanelHide').addClass('P_utilPanelShow');
                }else{
                    that._$$utilList.removeClass('P_utilListShow').addClass('P_utilListHide');
                    that._$$utilPanel.removeClass('P_utilPanelShow').addClass('P_utilPanelHide');
                }
            })
        }

    })

    var app = new App({
        boundingBox:$('#P_app')
    }).render();
})