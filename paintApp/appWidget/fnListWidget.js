define(['FFF','tap','fnConf'],function (FFF,tap,fnConf) {
    var F = FFF.FFF,
        Base = F.Base,
        Widget = F.Widget;


    function FnListWidget(){
        Base.apply(this,arguments)
    }
    FnListWidget.ATTRS = {
        isShow:{
            value:false
        },
        selectIndex:{
            value:null
        }
    }
    F.extend(FnListWidget,Base,{
        initialize:function () {
            this._new_fnTitleListWidget();
            this._new_fnPanelListWidget();
            this._bind_isShow();
            this._bind_selectIndex();
        },
        _new_fnTitleListWidget:function () {
            this._fnTitleList = new FnTitleListWidget({
                manager:this
            }).render({
                container:F.app.boundingBox
            })
        },
        _new_fnPanelListWidget:function () {
            this._fnPanelList = new FnTitlePanelWidget({
                manager:this
            }).render({
                container:F.app.boundingBox
            })
        },
        _bind_isShow:function () {
            var that = this;
            this.on('isShowChange',function (data) {
                this._fnTitleList.setIsShow(data.value);
                this._fnPanelList.setIsShow(data.value);
            })
            F.app.on('showFnPanelToggle',function (data) {
                if(data==undefined){
                    that.setIsShow(!that.isShow);
                }
                if(data&&data.status=='off'){
                    that.setIsShow(false);
                }
                if(data&&data.status=='on'){
                    that.setIsShow(true);

                }
            })
        },
        _bind_selectIndex:function () {
            this.on('selectedIndexChange',function (data) {
                this._fnTitleList.setSelectIndex(data);
                this._fnPanelList.setSelectIndex(data);
            })
        }
    })


    function FnTitleListWidget(){
        Widget.apply(this,arguments)
    }
    FnTitleListWidget.ATTRS = {
        isShow:{
            value:false
        },
        boundingBox:{
            value:$('<ul class="P_fnTitleList"></ul>')
        },
        fnList:{
            value:[]
        },
        manager:{
            value:null
        },
        selectIndex:{
            value:null
        }
    }
    F.extend(FnTitleListWidget,Widget,{
        initialize:function () {
        },
        renderUI:function () {
            this._render_item();
        },
        bindUI:function () {
            this._bind_isShow();
            this._bind_selectIndex();
        },
        syncUI:function () {

        },


        _bind_isShow:function () {
            var that = this;
            this.on('isShowChange',function (data) {
                if(data.value){
                    that.boundingBox.removeClass('P_fnListHide').addClass('P_fnListShow');
                }else{
                    that.boundingBox.removeClass('P_fnListShow').addClass('P_fnListHide');
                }
            })
        },
        _render_item:function () {
            var that = this,
                fnItem;
            fnConf && fnConf.forEach(function (item, index) {
                item.index = index;
                item.manager = that.manager;
                fnItem = new FnTitleItem(item).render({container:that.boundingBox});
                that.fnList.push(fnItem);
            })
        },
        _bind_selectIndex:function () {
            var that = this;
            this.on('selectIndexChange',function (data) {
                that.fnList.forEach(function(item,index){
                    if(index==data.value){
                        item.setActive(true);
                    }else{
                        item.setActive(false);
                    }
                })
            })
        }
    })


    function FnTitlePanelWidget(){
        Widget.apply(this,arguments)
    }
    FnTitlePanelWidget.ATTRS = {
        isShow:{
            value:false
        },
        boundingBox:{
            value:$('<ul class="P_fnPanelList"></ul>')
        },
        manager:{
            value:null
        },
        fnList:{
            value:[]
        },
        selectIndex:{
            value:null
        }
    }
    F.extend(FnTitlePanelWidget,Widget,{
        initialize:function () {
        },
        renderUI:function () {
            this._render_item();
        },
        bindUI:function () {
            this._bind_isShow();
            this._bind_selectIndex();

        },
        syncUI:function () {
        },
        _bind_isShow:function () {
            var that = this;
            this.on('isShowChange',function (data) {
                if(data.value){
                    that.boundingBox.removeClass('P_fnPanelHide').addClass('P_fnPanelShow');
                }else{
                    that.boundingBox.removeClass('P_fnPanelShow').addClass('P_fnPanelHide');
                }
            })
        },
        _render_item:function () {
            var that = this,
                fnItem;
            fnConf && fnConf.forEach(function (item, index) {
                item.index = index;
                item.manager = that.manager;
                fnItem = new FnPanelItem(item).render({container:that.boundingBox});
                that.fnList.push(fnItem);
            })
        },
        _bind_selectIndex:function () {
            var that = this;
            this.on('selectIndexChange',function (data) {
                that.fnList.forEach(function(item,index){
                    if(index==data.value){
                        item.setActive(true);
                    }else{
                        item.setActive(false);
                    }
                })
            })
        }

    })


    function FnTitleItem(){
        Widget.apply(this,arguments)
    }
    FnTitleItem.ATTRS = {
        isShow:{
            value:false
        },
        boundingBox:{
            value:$('<li class="P_fnTitleItem iconfont P_btn"></li>')
        },
        manager:{
            value:null
        },
        index:{
            value:null
        },
        active:{
            value:false
        }
    }
    F.extend(FnTitleItem,Widget,{
        initialize:function (cfg) {
            this._cfg = cfg;
            this.setIndex(cfg.index);
        },
        renderUI:function () {
            this._render_title();
        },
        bindUI:function () {
            this._bind_boundingBox();
            this._bind_active();
        },
        syncUI:function () {
        },
        _render_title:function () {
            this.boundingBox.html(this._cfg.fnTitle);
        },
        _bind_boundingBox:function () {
            var that = this;
            that.boundingBox.on('click',function (e) {
                that.manager.trigger('selectedIndexChange',that.index);
            })
        },
        _bind_active:function () {
            var that = this;
            that.on('activeChange',function (data) {
                if(data.value){
                    that.boundingBox.addClass('active');
                }else{
                    that.boundingBox.removeClass('active');
                }
            })
        }
    })

    function FnPanelItem(){
        Widget.apply(this,arguments)
    }
    FnPanelItem.ATTRS = {
        isShow:{
            value:false
        },
        boundingBox:{
            value:$('<li class="P_fnPanelItem"></li>')
        },
        manager:{
            value:null
        },
        index:{
            value:null
        },
        active:{
            value:false
        }

    }
    F.extend(FnPanelItem,Widget,{
        initialize:function (cfg) {
            this._cfg = cfg;
            this.setIndex(cfg.index);
        },
        renderUI:function () {
            this._render_panel();
        },
        bindUI:function () {
            this._bind_boundingBox();
            this._bind_active();
        },
        syncUI:function () {
            this.setActive(false);
        },
        _render_panel:function () {
            var panel = new this._cfg.fnPanel(
                this._cfg.panelData
            ).render({
                container:this.boundingBox
            })
        },
        _bind_boundingBox:function () {
            var that = this;
        },
        _bind_active:function () {
            var that = this;
            that.on('activeChange',function (data) {
                if(data.value){
                    that.boundingBox.show();
                }else{
                    that.boundingBox.hide();
                }
            })
        }
    })


    return {
        FnListWidget:FnListWidget,
    }
})