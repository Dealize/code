define(['FFF','tap','fnConf'],function (FFF,tap,fnConf) {
    var F = FFF.FFF,
        Base = F.Base,
        Widget = F.Widget;

    function FnItemWidget(){
        Widget.apply(this,arguments)
    }
    FnItemWidget.ATTRS = {
        fnTitle:{
            value:''
        },
        fnPanel:{
            value:null
        },
        fnDetail:{
            value:null
        },
        parent:{
            value:null
        },
        app:{
            value:null
        },
        index:{
            value:null
        },
        boundingBox:{
            value:$('<div class="P_fnPanelItem"></div>')
        },
        titleContainer:{
            value:null
        }
    }
    F.extend(FnItemWidget,Widget,{
        initialize:function (cfg) {

        },
        renderUI:function () {
            this._render_itemTitle();
            this._render_itemPanel();
        },
        bindUI:function () {
            this._bind_title_event();
            this._bind_parent_event();
        },
        syncUI:function () {
            this.hide();
        },
        hide:function () {
            this.boundingBox.hide();
        },
        show:function () {
            this.boundingBox.show();
        },


        _render_itemTitle:function () {
            this._$$title = $('<li class="P_fnItem" data-index="'+this.index+'">'+this.fnTitle+'</li>');
            this.titleContainer.append(this._$$title);
        },
        _bind_title_event:function () {
            var that = this;
            this._$$title.on(tap.tap,function () {
                that.parent.trigger('showFnItemOne',that.index);
            })
        },
        _render_itemPanel:function () {
            var that = this;
            that._fnPanel = new that.fnPanel({
                app:that.app
            }).render({
                container:that.boundingBox
            })
        },
        _bind_parent_event:function () {
            var that = this;
            //todo:question
            //什么情况下用自定义事件， 什么情况下用逻辑树
            //什么情况下需要把逻辑放到上一层组件里，什么情况下需要内聚到当前组件里。
            //以下方式完全可以在上一层组件中实现
            that.parent.on('showFnItemOne',function (data) {
                if(data==that.index){
                    that.show();
                }else{
                    that.hide();
                }
            })
        }

    })



    function FnListWidget(){
        Widget.apply(this,arguments)
    }
    FnListWidget.ATTRS = {
        app:{
            value:null
        },
        fnsList:{
            value:[]
        },
        selectedItem:{
            value:null
        },
        widgetIsShow:{
            value:null
        }
    }
    F.extend(FnListWidget,Widget,{
        initialize:function () {
        },
        renderUI:function () {
            this._getDom();
            this._render_uitlList();
        },
        bindUI:function () {
            this._bind_widgetIsShow();
            this._bind_showToggle();
        },
        syncUI:function () {
            
        },


        //--private--
        _getDom:function () {
            this._$$showToggle = this.boundingBox.find('.P_fnListToggle');
            this._$$fnList = this.boundingBox.find('.P_fnList');
            this._$$fnPanelList = this.boundingBox.find('.P_fnPanel');
        },
        _render_uitlList:function () {
            var that = this,
                fnItem;
            fnConf.forEach(function (item, index) {
                item.parent = that;
                item.app = that.app;
                item.index = index;
                item.titleContainer = that._$$fnList;
                fnItem = new FnItemWidget(item).render({
                    container:that._$$fnPanelList
                });
                that.fnsList.push(fnItem);
            })
        },
        _bind_widgetIsShow:function () {
            var that = this;
            this.on('widgetIsShowChange',function (data) {
                if(data.value){
                    that._$$fnList.removeClass('P_fnListHide').addClass('P_fnListShow');
                    that._$$fnPanelList.removeClass('P_fnPanelHide').addClass('P_fnPanelShow');
                }else{
                    that._$$fnList.removeClass('P_fnListShow').addClass('P_fnListHide');
                    that._$$fnPanelList.removeClass('P_fnPanelShow').addClass('P_fnPanelHide');
                }
            })
        },
        _bind_showToggle:function () {
            var that = this;
            this._$$showToggle.on(tap.tap,function () {
                that.setWidgetIsShow(!that.widgetIsShow);
            })
        }
    })


    return {
        FnListWidget:FnListWidget,
    }
})