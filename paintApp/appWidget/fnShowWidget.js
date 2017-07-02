define(['FFF','tap','fnConf'],function (FFF,tap,fnConf) {
    var F = FFF.FFF,
        Base = F.Base,
        Widget = F.Widget;

    function FnShowWidget(){
        Widget.apply(this,arguments)
    }
    FnShowWidget.ATTRS = {
        boundingBox:{
            value:$('<div class="P_fnListToggle P_btn iconfont">&#xe627;</div>')
        },
        isFnListShow:{
            value:false
        }
    }
    F.extend(FnShowWidget,Widget,{
        initialize:function () {
        },
        renderUI:function () {
        },
        bindUI:function () {
            this._bind_boundingBox();
            this._bind_isFnListShow();
        },
        syncUI:function () {

        },
        _bind_boundingBox:function () {
            var that = this;
            this.boundingBox.on('click',function () {
                debugger;
                that.setIsFnListShow(!that.isFnListShow);
            })
        },
        _bind_isFnListShow:function () {
            var that = this;
            this.on('isFnListShowChange',function (data) {
                F.app.trigger('IsfnListShow',data)
            })
        }
    })
    return {
        FnShowWidget:FnShowWidget,
    }
})