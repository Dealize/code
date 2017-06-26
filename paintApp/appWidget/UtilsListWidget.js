define(['FFF','tap','utilsConf'],function (FFF,tap,utilsConf) {
    var F = FFF.FFF,
        Base = F.Base,
        Widget = F.Widget;

    function UtilItemWidget(){
        Widget.apply(this,arguments)
    }
    UtilItemWidget.ATTRS = {
        utilTitle:{
            value:''
        },
        utilPanel:{
            value:null
        },
        utilDetail:{
            value:null
        },
        parent:{
            value:null
        },
        index:{
            value:null
        },
        boundingBox:{
            value:$('<div class="P_utilPanelItem">123</div>')
        },
        titleContainer:{
            value:null
        }
    }
    F.extend(UtilItemWidget,Widget,{
        initialize:function (cfg) {
            console.log(cfg);
        },
        renderUI:function () {
            console.log(this)
            this._render_itemTitle();
        },
        bindUI:function () {

        },
        syncUI:function () {
            
        },
        _render_itemTitle:function () {
            this._$$title = $('<li class="P_utilItem" data-index="'+this.index+'">'+this.utilTitle+'</li>');
            this.titleContainer.append(this._$$title);
        },
        _bind_title_event:function () {
            var that = this;
            this._$$title.on(tap.tap,function () {
                that.parent.trigger('')
            })
        }
    })



    function UtilsListWidget(){
        Widget.apply(this,arguments)
    }
    UtilsListWidget.ATTRS = {
        utilsList:{
            value:[]
        },
        selectedItem:{
            value:null
        }
    }
    F.extend(UtilsListWidget,Widget,{
        initialize:function () {
            console.log(utilsConf);
        },
        renderUI:function () {
            this._getDom();
            this._renderUitlList()
        },
        bindUI:function () {
            
        },
        syncUI:function () {
            
        },


        //--private--
        _getDom:function () {
            this._$$showToggle = this.boundingBox.find('.P_utilListToggle');
            this._$$utilList = this.boundingBox.find('.P_utilList');
            this._$$utilPanelList = this.boundingBox.find('.P_utilPanel');
        },
        _renderUitlList:function () {
            var that = this,
                utilItem;
            utilsConf.forEach(function (item, index) {
                item.parent = that;
                item.index = index;
                item.titleContainer = that._$$utilList;
                utilItem = new UtilItemWidget(item).render({
                    container:that._$$utilPanelList
                });
                that.utilsList.push(utilItem);
            })
        },
    })


    return {
        UtilsListWidget:UtilsListWidget,
    }
})