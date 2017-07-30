define(['FFF','tap','fnWidget','util'],function (FFF,tap,fnWidget,util) {
    var F = FFF.FFF,
        Base = F.Base,
        Widget = F.Widget,
        FnDetail = fnWidget.FnDetail,
        fnPanel = fnWidget.FnPanel;

    function SlicerWidgetPanel(){
        fnPanel.apply(this,arguments)
    }
    SlicerWidgetPanel.ATTRS = {
        boundingBox:{
            value:$('<div class="P_slicerPanel">' +
                '<ul class="P_panel_item slicerToggle">' +
                '<li >点击启用</li>' +
                '</ul>'+
                '<hr>' +
                '<ul class="P_panel_item slicerOperate">' +
                    '<li data-type="move">点击移动</li>' +
                    '<li data-type="rotate">点击旋转</li>' +
                    '<li data-type="scale">点击缩放</li>' +
                '</ul>' +
                '<hr>' +
                '<ul class="P_panel_item slicerConfirm">' +
                '<li data-type="ok">确认更改</li>' +
                '<li data-type="no">放弃更改</li>' +
                '</ul>' +
                '</div>')
        },
        toggle:{
            value:false
        },
        operate:{
            value:null
        },
        confirm:{
            value:null
        }
    }
    F.extend(SlicerWidgetPanel,fnPanel,{
        initialize:function () {
        },
        renderUI:function () {
            this._getDom();
            this._$slicerConfirm.hide();
            this._$slicerOperate.hide();
        },
        bindUI:function () {
            var that = this;
            this._bind_attrEvent();
            this._bind_domEvent();
        },
        syncUI:function () {
        },
        _getDom:function () {
            this._$toggle = this.boundingBox.find('.slicerToggle').find('li');
            this._$slicerOperate = this.boundingBox.find('.slicerOperate');
            this._$slicerConfirm = this.boundingBox.find('.slicerConfirm');
        },
        _bind_attrEvent:function () {
            var that = this;
            that.on('toggleChange',function (data) {
                if(data.value){
                    that._$toggle.addClass('toggleActive');
                    that._$slicerOperate.show();
                    that._$slicerConfirm.show();
                    // setTimeout(function () {
                    //     alert('开始选择区域');
                    // },500);
                    that._add_slicerMasker();

                }else{
                    that._$toggle.removeClass('toggleActive');
                    that._$slicerOperate.hide();
                    that._$slicerConfirm.hide();
                    that.setOperate(null);
                    that.setConfirm(null);
                    that._slicerMasker.destroy();
                    that._slicerMasker = null;
                }
                F.app.trigger('showFnPanelToggle',{
                    status:'off'
                })
            });
            that.on('operateChange',function () {

                F.app.trigger('showFnPanelToggle',{
                    status:'off'
                })
            });
            that.on('confirmChange',function () {

                F.app.trigger('showFnPanelToggle',{
                    status:'off'
                })
            })
        },
        _bind_domEvent:function () {
            var that = this;
            that._$toggle.on(tap.tap,function () {
                that.setToggle(!that.toggle);
            });
            that._$slicerOperate.on(tap.tap,'li',function () {
                console.log(this.dataset.type)
                that.setOperate(this.dataset.type);
            })
            that._$slicerConfirm.on(tap.tap,'li',function () {
                console.log(this.dataset.type)
                that.setConfirm(this.dataset.type);
            })
        },
        _add_slicerMasker:function () {
            var that = this;
            if(that._slicerMasker){

            }else{
                that._slicerMasker = new SlicerMasker().render({
                    container:F.app.boundingBox
                })
            }
        },
    })


    function SlicerMasker(){
        fnPanel.apply(this,arguments)
    }
    SlicerMasker.ATTRS = {
        boundingBox:{
            value:$('<div class="P_slicerMasker"></div>')
        },
    }
    F.extend(SlicerMasker,fnPanel, {
        initialize: function () {
        },
        renderUI:function () {

        },
        bindUI:function () {
            this._bind_domEvent();
        },
        syncUI:function () {

        },
        _bind_domEvent:function () {
            var that = this,
                startPosition;
            that.boundingBox.on(tap.tapStart,function (e) {
                if(that._slicer){

                }else{
                    startPosition = util.getTouchPosition(e,'client');
                    that._slicer = new Slicer({
                        x:startPosition.x,
                        y:startPosition.y
                    }).render({
                        container:that.boundingBox
                    });
                }

            })
            that.boundingBox.on(tap.tapMove,function (e) {
                var movePosition = util.getTouchPosition(e,'client');
                that._slicer.setW(movePosition.x - startPosition.x)
                that._slicer.setH(movePosition.y - startPosition.y)
            })
            that.boundingBox.on(tap.tapEnd,function () {
                // confirm('是否选中该区域');
                // if(true){
                //     showPanel
                F.app.trigger('showFnPanelToggle',{
                    status:'on'
                })

                // }else{
                //     that._slicer.destroy();
                //        that._slicer = null;
                // }
            })
            that.boundingBox.on(tap.tap,function () {
                F.app.trigger('showFnPanelToggle',{
                    status:'on'
                })
            })
        }
    })


    function Slicer(){
        fnPanel.apply(this,arguments)
    }
    Slicer.ATTRS = {
        boundingBox:{
            value:$('<div class="P_slicer"></div>')
        },
        x:{
            value:0
        },
        y:{
            value:0
        },
        w:{
            value:0
        },
        h:{
            value:0
        }
    }
    F.extend(Slicer,fnPanel, {
        initialize: function () {
        },
        renderUI:function () {
            console.log(this.x,this.y);

        },
        bindUI:function () {
            this._bind_domEvent();
            this._bind_attrEvent();
        },
        syncUI:function () {
            this.setX(this.x);
            this.setY(this.y);
        },
        _bind_domEvent:function () {
            var that = this;
            that.boundingBox.on(tap.tapStart,function (e) {
            })
            that.boundingBox.on(tap.tapEnd,function () {
            })
            that.boundingBox.on(tap.tap,function () {
                F.app.trigger('showFnPanelToggle',{
                    status:'off'
                })
            },false)
        },
        _bind_attrEvent:function () {
            var that = this;
            that.on('xChange',function (data) {
                that.boundingBox.css({
                    left:data.value
                })
            })
            that.on('yChange',function (data) {
                that.boundingBox.css({
                    top:data.value
                })
            })
            that.on('wChange',function (data) {
                that.boundingBox.css({
                    width:data.value
                })
            })
            that.on('hChange',function (data) {
                that.boundingBox.css({
                    height:data.value
                })
            })
        }
    })

    return {
        SlicerWidgetPanel:SlicerWidgetPanel,
    }
})