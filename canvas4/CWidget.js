define(['oojs'], function (oojs) {
    var Base = oojs.Base,
        tap = oojs.language.tap;

    function CWidget() {
        Base.apply(this, arguments);
    }

    oojs.extend(CWidget, Base, {
        attr: {
            css:{
                width:0,
                height:0,
                left:0,
                top:0,
                color:'',
                background:'',
                textAlign:'',
            },
            event:{},
            zindex:1,
            shape:'rect',//rect  fillrect strokerect
            path:[],
            text:null,
            parent:null,
            manager:null,
            context:null,
            areaPoint:{}
        },
        init: function () {
            console.log(this);
            this.getAreaPoint();
        },
        drawUI:function(e){
            var css = this.css;
            this.context.save();
            this.context.beginPath();
            this.context.fillStyle = css.background;
            this.context.strokeStyle = css.borderColor;
            this.context.moveTo(css.left,css.top);
            switch(this.shape){
                case 'rect':
                    this.context.rect(css.left,css.top,css.width,css.height);
                    this.context.fill();
                    break;
            }
            this.getAreaPoint();

        },

        bindUI: function (e) {
            var that = this;
            switch (e.triggerType){
                case tap.tap:
                    that.event.tap && that.event.tap(e,that);
                    break;
                case tap.tapStart:
                    that.tapMoveToggle = true;
                    that.event.tapStart && that.event.tapStart(e,that);
                    break;
                case tap.tapMove:
                    if(that.tapMoveToggle){
                        that.event.tapMove && that.event.tapMove(e,that);
                    }
                    break;
                case tap.tapEnd:
                    that.tapMoveToggle = false;
                    that.event.tapEnd && that.event.tapEnd(e,that);
                    break;
            }
        },
        syncUI: function (e) {
        },
        draw:function(e){
            var that = this;
            e = e || {};
            this.drawUI();
            this.callParent('drawUI',e);
            if(this.context.isPointInPath(e.fixedX,e.fixedY)){
                this.bindUI(e);
                this.callParent('bindUI',e);
            }else{
                that.tapMoveToggle = false;
            }
            this.syncUI();
            this.callParent('syncUI',e);
            this.context.closePath();
            this.context.restore();
            return this;
        },
        getAreaPoint:function () {
            //目前先只考虑矩形的情况
            var areaPoint = {};
            areaPoint.x1 = parseInt(this.css.left);
            areaPoint.y1 = parseInt(this.css.top);
            areaPoint.x2 = parseInt(this.css.left) + parseInt(this.css.width);
            areaPoint.y2 = parseInt(this.css.top) + parseInt(this.css.height);
            this.setData({
                areaPoint:areaPoint
            })
        }
    })

    return {
        CWidget: CWidget
    }
})
