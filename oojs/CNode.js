define(['oojs','CBase'], function (oojs,CBase) {
    var CBase = CBase.CBase,
        tap = oojs.language.tap;

    function CNode() {
        CBase.apply(this, arguments);
    }

    oojs.extend(CNode, CBase, {
        attr: {
            css:{
                width:0,
                height:0,
                left:0,
                top:0,
                color:'',
                backgroundColor:'',
                borderColor:'',
                textAlign:'',
            },
            areaPoint:{},
            zIndex:0,
            childNodes:[],
            parentNode:null,
            context:null,
            container:null,
            canMove:true
        },
        init: function () {
            this._generateAreaPoint();
            this._bindMoveEvent();
            this.bindUI();
        },
        _generateAreaPoint:function () {
            var areaPoint = {};
            areaPoint.x1 = parseInt(this.css.left);
            areaPoint.y1 = parseInt(this.css.top);
            areaPoint.x2 = parseInt(this.css.left) + parseInt(this.css.width);
            areaPoint.y2 = parseInt(this.css.top) + parseInt(this.css.height);
            this.setData({
                areaPoint:areaPoint
            })
        },
        _bindMoveEvent:function () {
            var that = this,
                css = this.css;

            this.on(tap.tap,function (e) {
            });
            this.on(tap.tapStart,function(e){
                that._disX = e.fixedX - that.css.left;
                that._disY = e.fixedY - that.css.top;
                that.moveToggle = true;
            });
            this.on(tap.tapMove,function (e) {
                if(!that.canMove){
                    return;
                }
                if(!that.moveToggle){
                    return;
                }
                that.css.left = e.fixedX - that._disX;
                that.css.top = e.fixedY - that._disY;

                that._generateAreaPoint();
                that.container.trigger('redraw',null);
            });
            this.on(tap.tapEnd,function (e) {
                that.moveToggle = false;
            });
            this.on('triggerChildEvent',function (data) {
                that.triggerNodeEvent(data.eventType,data.eventData);
            })
        },
        draw:function () {
            this.context.fillStyle = this.css.backgroundColor;
            this.context.strokeStyle = this.css.borderColor;
            this.context.fillRect(this.css.left,this.css.top,this.css.width,this.css.height);
        },
        render:function () {
            this.draw();
            this._render();
            return this;
        },
        bindUI:function () {},
    })

    return {
        CNode: CNode
    }
})
