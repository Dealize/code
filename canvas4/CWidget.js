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
        },
        init: function () {
            console.log(1)

            console.log(this);
        },
        drawUI:function(){
            console.log(2);
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
            this.context.closePath();
            this.context.restore();
        },
        bindUI: function () {
            console.log(3);
            var that = this;
            this.manager.on('tapEvent',function (e) {
                if(that.context.isPointInPath(e.fixedX,e.fixedY)){
                    that.event.tap && that.event.tap();
                }
            })
            this.manager.on('tapStartEvent',function (e) {
                if(that.context.isPointInPath(e.fixedX,e.fixedY)){
                    that.event.tapStart && that.event.tapStart();
                }
            })
            this.manager.on('tapMoveEvent',function (e) {
                if(that.context.isPointInPath(e.fixedX,e.fixedY)){
                    that.event.tapMove && that.event.tapMove();
                }
            })
            this.manager.on('tapEndEvent',function (e) {
                if(that.context.isPointInPath(e.fixedX,e.fixedY)){
                    that.event.tapEnd && that.event.tapEnd();
                }
            })
        },
        syncUI: function () {
        },
        draw:function(){
            this.drawUI();
            this.bindUI();
            this.syncUI();
            console.log(4);
        }
    })

    return {
        CWidget: CWidget
    }
})
