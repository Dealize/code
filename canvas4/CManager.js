define(['oojs','CWidget','CDiv'], function (oojs,CWidget,CDiv) {
    var Base = oojs.Base,
        tap = oojs.language.tap,
        CWidget = CWidget.CWidget,
        CDiv = CDiv.CDiv;

    function CManager() {
        Base.apply(this, arguments);
    }

    oojs.extend(CManager, Base, {
        attr: {
            canvas:null,
            cwidgetList:[],
            sortedCWidgetList:[]

        },
        init: function () {
            this.context = this.canvas.getContext('2d');
            this.drawUI();
            this.bindUI();
        },
        drawUI: function () {
            var that = this;
            var redCDiv= new CDiv({
                    manager:this,
                    context:this.context,
                    css:{
                        background:"red",
                        width:'100',
                        height:'100',
                        left:'10',
                        top:'10'
                    },
                    event:{
                        tap:function(e,context){
                            console.log(11)
                        },
                        tapMove:function (e,context) {
                            that.trigger('checkWidgetIsCover',{
                                point:context.areaPoint,
                                context:context
                            });
                        }
                    }
                }).draw();
            var greenCDiv= new CDiv({
                    manager:this,
                    context:this.context,
                    css:{
                        background:'green',
                        width:'80',
                        height:'80',
                        left:'200',
                        top:'100'
                    }
                }).draw();
            this.cwidgetList.push(redCDiv,greenCDiv);

        },
        bindUI:function () {
            var that = this;
            this.canvas.addEventListener(tap.tap,function (e) {
                var _fixPosition = that._getTouchPosition(e);
                e.fixedX = _fixPosition.x;
                e.fixedY = _fixPosition.y;
                e.triggerType = tap.tap
                that.redraw(e);
            });
            this.canvas.addEventListener(tap.tapStart,function (e) {
                var _fixPosition = that._getTouchPosition(e);
                e.fixedX = _fixPosition.x;
                e.fixedY = _fixPosition.y;
                e.triggerType = tap.tapStart
                that.redraw(e);
            });
            this.canvas.addEventListener(tap.tapMove,function (e) {
                var _fixPosition = that._getTouchPosition(e);
                e.fixedX = _fixPosition.x;
                e.fixedY = _fixPosition.y;
                e.triggerType = tap.tapMove
                that.redraw(e);
            });
            this.canvas.addEventListener(tap.tapEnd,function (e) {
                var _fixPosition = that._getTouchPosition(e);
                e.fixedX = _fixPosition.x;
                e.fixedY = _fixPosition.y;
                e.triggerType = tap.tapEnd
                that.redraw(e);
            });
            this.on('checkWidgetIsCover',function (e) {
                that._checkWidgetIsCover(e);
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
        redraw:function(e){
            this.context.clearRect(0,0,500,500);
            for(var i in this.cwidgetList){
                this.cwidgetList[i].draw(e);
            }
        },
        sortCWidgetListByZindex:function(){
        },
        _checkWidgetIsCover:function (e) {
            var point = e.point;
            this.cwidgetList.forEach(function (item) {
                if(e.context != item  ){
                    if( point.x2 < item.areaPoint.x1 ||
                        point.x1 > item.areaPoint.x2 ||
                        point.y2 < item.areaPoint.y1 ||
                        point.y1 > item.areaPoint.y2
                    ){
                        $('body').css({
                            'background':'#fff'
                        })
                    }else{
                        $('body').css({
                            'background':'pink'
                        })

                    }
                }

            })
        }



    })

    return {
        CManager: CManager
    }
})

