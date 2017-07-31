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
            that.on('confirmChange',function (data) {
                switch (data.value){
                    case 'no':
                        that._slicerMasker.reset();
                        break;

                }
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
                that._$slicerOperate.find('li').each(function (index, item) {
                    $(item).removeClass('toggleActive');
                })
                $(this).addClass('toggleActive');
                that.setOperate(this.dataset.type);
            })
            that._$slicerConfirm.on(tap.tap,'li',function () {
                that._$slicerConfirm.find('li').each(function (index, item) {
                    $(item).removeClass('toggleActive');
                })
                $(this).addClass('toggleActive');
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
                startPosition
            ;
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
            that.boundingBox.on(tap.tapEnd,function (e) {
                if(!that.confirmToggle){
                    if(confirm('是否选中该区域')){
                        that._slicer.lock();
                        that._confirmToggle = true;
                    }else{
                        that.reset();
                    }
                    F.app.trigger('showFnPanelToggle',{
                        status:'on'
                    })
                }
            })
            that.boundingBox.on(tap.tap,function () {
                F.app.trigger('showFnPanelToggle')
            })
        },
        reset:function () {
            this._slicer.destroy();
            this._slicer = null;
            this._confirmToggle = null;

        }
    })


    function Slicer(){
        fnPanel.apply(this,arguments)
    }
    Slicer.ATTRS = {
        boundingBox:{
            value:$('<div class="P_slicer"><canvas width="0" height="0"></canvas></div>')
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
            this._getDom();
        },
        bindUI:function () {
            this._bind_domEvent();
            this._bind_attrEvent();
        },
        syncUI:function () {
            this.setX(this.x);
            this.setY(this.y);
        },
        _getDom:function () {
            this._$canvas = this.boundingBox.find('canvas');
        },
        _bind_domEvent:function () {
            var that = this;
            that.boundingBox.on(tap.tapStart,function (e) {
                e.stopPropagation();
                F.app.trigger('showFnPanelToggle',{
                    status:'off'
                })

            })
            that.boundingBox.on(tap.tapMove,function (e) {
                e.stopPropagation();

                console.log(123);
            })
            that.boundingBox.on(tap.tapEnd,function (e) {
                e.stopPropagation();
            })

            that.boundingBox.on(tap.tap,function (e) {
                e.stopPropagation();
                console.log(1);
                F.app.trigger('showFnPanelToggle',{
                    status:'off'
                })
            })
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
        },
        lock:function () {
            var that = this;
            that._init_canvasSize();

        },
        _init_canvasSize:function () {
            this._$canvas.attr({
                width:this.w,
                height:this.h
            })
        },
        a:function(){
            var that  = this;
            F.app.trigger('needCutImg',{
                x:that.x,
                y:that.y,
                w:that.w,
                h:that.h
            })
            // F.app.on('getCutImgData')
        }

    })

    return {
        SlicerWidgetPanel:SlicerWidgetPanel,
    }
})