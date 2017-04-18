define(['oojs'], function (oojs) {
    var Widget = oojs.Widget,
        tap = oojs.language.tap;

    function App() {
        Widget.apply(this, arguments);
    }

    oojs.extend(App, Widget, {
        attr: {},
        init: function () {
        },
        renderUI: function () {
            this.canvases = this.boundingBox.find('canvas');
            this.player1Panel = this.boundingBox.find('.player1');
            this.canvas1 = $('.player1').find('canvas');
            this.canvas2 = $('.player2').find('canvas');
            this.canvas1Context = this.canvas1[0].getContext('2d');
            this.canvas2Context = this.canvas2[0].getContext('2d');
            this._getCanvasPosition();
            this._areaLimitPositoin = this._getCanvasPosition();


            // this._refreshCanvas();
        },
        bindUI: function () {
            var that = this;
            this._preventBodyDefault();
            console.log(tap);
            this._bindCanvasEvent();
        },
        syncUI: function () {

        },
        /**
         *   阻止body滑动
         */
        _preventBodyDefault: function () {
            this.boundingBox.on(tap.tapStart, function (e) {
                e.preventDefault();
            })
        },
        /**
         *  获取touch的坐标
         */
        _getTouchPosition: function (e, type) {
            var position = {};
            switch (type) {
                case 'offset':
                    position.touch1 = {
                        x: e.touches[0] && e.touches[0].offsetX,
                        y: e.touches[0] && e.touches[0].offsetY
                    };
                    position.touch2 = {
                        x: e.touches[1] && e.touches[1].offsetX,
                        y: e.touches[1] && e.touches[1].offsetY
                    };
                case 'client':
                default:
                    position.touch1 = {
                        x: e.touches[0] && e.touches[0].clientX ,
                        y: e.touches[0] && e.touches[0].clientY ,
                    };
                    position.touch2 = {
                        x: e.touches[1] && e.touches[1].clientX,
                        y: e.touches[1] && e.touches[1].clientY
                    };
                    break;
            }
            return position;
        },
        /**
         *   获取canvas的位置信息
         */
        _getCanvasPosition: function () {
            var canvas1Position = {},
                canvas2Position = {},
                areaLimitPositoin = {},
                width = this.canvas1.width(),
                height = this.canvas1.height();
            //canvas1的xy与canvas2的xy的算法还不同，
            //因为canvas1是经过旋转180°的，所以这里有点点绕
            canvas1Position.x1 = this.player1Panel.width() - this.canvas1[0].offsetLeft - this.canvas1.width();
            canvas1Position.y1 = this.player1Panel.height() - this.canvas1[0].offsetTop - this.canvas1.height();
            canvas1Position.x2 = this.player1Panel.width() - this.canvas1[0].offsetLeft;
            canvas1Position.y2 = this.player1Panel.height() - this.canvas1[0].offsetTop;
            canvas2Position.x1 = this.canvas2[0].offsetLeft;
            canvas2Position.y1 = this.canvas2[0].offsetTop;
            canvas2Position.x2 = this.canvas2[0].offsetWidth + this.canvas2[0].offsetLeft;
            canvas2Position.y2 = this.canvas2[0].offsetTop + this.canvas2[0].offsetHeight;
            this._canvas1Position = canvas1Position;
            this._canvas2Position = canvas2Position;
            areaLimitPositoin = {
                player1: canvas1Position.y2,
                player2: canvas2Position.y1
            };
            return areaLimitPositoin;
        },
        /**
         *   player1需要进行坐标转换
         */
        _transforPlayerPosition: function (pos) {
            var finalPos = {
                player1:{},player2:{}
            }
            //因为canva1旋转了180°，所以这里的计算也是有点绕
            finalPos.player1.x = this.canvas1.width() - (pos.player1.x - this._canvas1Position.x1);
            finalPos.player1.y = this.canvas1.height() -(pos.player1.y - this._canvas1Position.y1);
            finalPos.player2.x = pos.player2.x - this._canvas2Position.x1;
            finalPos.player2.y = pos.player2.y - this._canvas2Position.y1;
            return finalPos;
        },
        /**
         *   判断touch是属于哪个玩家
         */
        _checkTouchBlongWho: function (pos) {
            var finalPos = {
                player1: {},
                player2: {}
            };
            if (pos.touch1.y < this._areaLimitPositoin.player1) {
                finalPos.player1 = pos.touch1;
            } else if (pos.touch1.y > this._areaLimitPositoin.player2) {
                finalPos.player2 = pos.touch1;
            }
            if (pos.touch2.y < this._areaLimitPositoin.player1) {
                finalPos.player1 = pos.touch2;
            } else if (pos.touch2.y > this._areaLimitPositoin.player2) {
                finalPos.player2 = pos.touch2;
            }
            return finalPos;
        },
        /**
         * 获取最终需要的坐标
         * @param e
         * @private
         */
        _getFinalPosition: function (e) {
            var position = this._getTouchPosition(e);
            position = this._checkTouchBlongWho(position);
            position = this._transforPlayerPosition(position);
            console.log(position);
            return position;
        },
        _bindCanvasEvent:function(){
            var that = this;
            this.canvas1Context.strokeStyle = 'red';
            this.canvas2Context.strokeStyle = 'blue';
            this.canvas1Context.lineWidth = '20';
            this.canvas2Context.lineWidth = '20';
            this.canvases.on(tap.tapStart,function(e){
                var finalPosition = that._getFinalPosition(e);
                that.canvas1Context.beginPath();
                that.canvas2Context.beginPath();
                that.canvas1Context.moveTo(finalPosition.player1.x,finalPosition.player1.y);
                that.canvas2Context.moveTo(finalPosition.player2.x,finalPosition.player2.y);
            })



            var canvasData ;
            this.canvas1.on(tap.tapMove,function(e){
                var finalPosition = that._getFinalPosition(e);
                that.canvas1Context.lineTo(finalPosition.player1.x,finalPosition.player1.y);
                that.canvas1Context.stroke();
                canvasData = that.canvas1Context.getImageData(0,0,that.canvas1.width(),that.canvas2.height());
                that.canvas2Context.putImageData(canvasData,0,0);
                // canvasData = that.canvas2Context.getImageData(0,0,that.canvas2.width(),that.canvas2.height());
                // that.canvas1Context.putImageData(canvasData,0,0);
            })
            this.canvas2.on(tap.tapMove,function(e){
                var finalPosition = that._getFinalPosition(e);
                that.canvas2Context.lineTo(finalPosition.player2.x,finalPosition.player2.y);
                that.canvas2Context.stroke();
                // canvasData = that.canvas1Context.getImageData(0,0,that.canvas1.width(),that.canvas2.height());
                // that.canvas2Context.putImageData(canvasData,0,0);
                canvasData = that.canvas2Context.getImageData(0,0,that.canvas2.width(),that.canvas2.height());
                that.canvas1Context.putImageData(canvasData,0,0);
            })


            this.canvases.on(tap.tapEnd,function(e){
                that.canvas1Context.closePath();
                that.canvas2Context.closePath();
            })
        },
        _refreshCanvas:function(){
            var that = this;
            var canvasData ;
            var toggle = true;
            setInterval(function(){
                canvasData = that.canvas1Context.getImageData(0,0,that.canvas1.width(),that.canvas2.height());
                that.canvas2Context.putImageData(canvasData,0,0);
                canvasData = that.canvas2Context.getImageData(0,0,that.canvas2.width(),that.canvas2.height());
                that.canvas1Context.putImageData(canvasData,0,0);
                if(toggle){
                    console.log(canvasData);
                    toggle = false;
                }
            },30)
        }
    })




    return {
        App: App
    }
})
