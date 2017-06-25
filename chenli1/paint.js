/**
 * Created by qq351 on 2017/6/17.
 */
 define([],function () {


    function Paint(config) {
        this.canvas = config.canvas;
        this.context = this.canvas.getContext('2d');
        this.width = config.width || '600';
        this.height = config.height || '400';
        this.children = [];
        this.className = config.className || '';
        this.currentRect = '';
        this.isChangedRectPositon = false;

        this.init();
    }

    //----------------method-----------

    Paint.prototype.draw = function () {
        this.children.forEach(function (item) {
            item.isChangedRectPositon = false;
            item.draw();
        })
    }
    Paint.prototype.redraw = function () {
        this.context.clearRect(0, 0, this.width, this.height);
        this.draw();
    }
    Paint.prototype.addElement = function (config) {
        config.manager = this;
        config.parentNode = this;
        this.children.push(config);
        this.changezIndex();
    }
    Paint.prototype.changezIndex = function(){
        this.children.sort(function(a,b){
            return a.zIndex - b.zIndex;
        })
    }
     Paint.prototype.appendChild = function (arg) {
         arg.parentNode = this;
         this.children.push(arg);

     }
     Paint.prototype.removeChild = function (node) {
         var that = this;
         this.children.forEach(function(item,index){
             if(item == node){
                 that.children.splice(index,1);
             }
         })
     }


    //----------------interface---------------------



    //------------------self--------------------------
    Paint.prototype.init = function () {
        this._$$canvas = $(this.canvas);
        this._initSize();
        this._addClassName();
        this._bindCanvasEvent();
    }
    Paint.prototype._bindCanvasEvent = function () {
        var that = this,
        currentSelcetRect,currentClientX,currentClientY,currentRectX,currentRectY;
        this._$$canvas.on('click',function (e) {

            var clientEventLeft,clentEventTop;
            currentClientX = e.offsetX;
            currentClientY = e.offsetY;

            that.children.forEach(function (item) {
                if(item.checkPointIsInArea(currentClientX,currentClientY)){
                    item.fireEvent('click');
                }
            })

        })

        this._$$canvas.on('mousedown',function(e){
            var clientEventLeft,clentEventTop;

            currentClientX = e.offsetX;
            currentClientY = e.offsetY;

            that.children.forEach(function (item) {
                if(item.checkPointIsInArea(currentClientX,currentClientY)){
                    currentSelcetRect = item;
                    currentSelcetRect.fireEvent('dragStart');
                }
                item.currentRectX = item.x;
                item.currentRectY = item.y;
            })



        })

        this._$$canvas.on('mousemove',function(e){
            var offsetX,offsetY;

            if(!currentSelcetRect){
                return;
            }

            currentSelcetRect.fireEvent('dragging');

            offsetX = e.offsetX - currentClientX;
            offsetY = e.offsetY - currentClientY;

            currentSelcetRect._changeRectPosition(offsetX,offsetY);
            that.redraw();
        })

        this._$$canvas.on('mouseup',function(e){
            if(currentSelcetRect){
                currentSelcetRect.fireEvent('mouseup');
                that.draw();
            }
            currentSelcetRect = null;
        })
    }
    Paint.prototype._checkPointIsInArea = function(currentClientX,currentClientY,callBack){
        var that = this

    }
    Paint.prototype._initSize = function () {
        this._$$canvas.attr({
            width:this.width,
            height:this.height
        })
    }
    Paint.prototype._addClassName = function () {
        this._$$canvas.addClass(this.className);
    }





    return {
        Paint:Paint
    };
})