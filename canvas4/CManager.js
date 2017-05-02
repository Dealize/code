define(['oojs','CWidget','Box'], function (oojs,CWidget,Box) {
    var Base = oojs.Base,
        tap = oojs.language.tap,
        CWidget = CWidget.CWidget,
        Box = Box.Box;

    function CManager() {
        Base.apply(this, arguments);
    }

    oojs.extend(CManager, Base, {
        attr: {
            canvas:null,
            eventList:{
                tap:[]
            }

        },
        init: function () {
            this.context = this.canvas.getContext('2d');
            this.drawUI();
            this.bindUI();
        },
        drawUI: function () {
            // var redCWidget = new CWidget({
            var redCWidget = new Box({
                    manager:this,
                    context:this.context,
                    css:{
                        background:"red",
                        width:'30',
                        height:'30',
                        left:'10',
                        top:'10'
                    },
                    event:{
                        tap:function(){
                            console.log(1111)
                        }
                    },
                    shape:'rect'
                }).draw()
        },
        bindUI:function () {
            var that = this;
            this.canvas.addEventListener(tap.tap,function (e) {
                var _fixPosition = that._getTouchPosition(e);
                e.fixedX = _fixPosition.x;
                e.fixedY = _fixPosition.y;
                that.trigger('tapEvent',e);
            })
        },
        _getTouchPosition: function (e, type) {
            var position = {};
            var canvasOffset = $(e.target).offset();
            if (tap.tap == 'touchend') {
                switch (type) {
                    case 'offset':
                        position.x = e.touches[0].offsetX - canvasOffset.left;
                        position.y = e.touches[0].offsetY - canvasOffset.top;
                    case 'client':
                    default:
                        position.x = e.touches[0].clientX - canvasOffset.left;
                        position.y = e.touches[0].clientY - canvasOffset.top;
                        break;
                }
            } else {
                switch (type) {
                    case 'offset':
                        position.x = e.offsetX - canvasOffset.left;
                        position.y = e.offsetY - canvasOffset.top;
                    case 'client':
                    default:
                        position.x = e.clientX - canvasOffset.left;
                        position.y = e.clientY - canvasOffset.top;
                        break;
                }
            }
            return position;
        },


    })

    return {
        CManager: CManager
    }
})
