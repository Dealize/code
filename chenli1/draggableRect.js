/**
 * Created by qq351 on 2017/6/18.
 */
define(['rect'],function (rect) {
    var Rect = rect.Rect;

    function extend(subclass,superclass){
        var superObj = new superclass();
        subclass.prototype = superObj;
        subclass.constructor = subclass;
        return subclass;
    }

    function DraggableRect(config) {
        Rect.apply(this);
        this.config = config;
        this.width = config.width || 60;
        this.height = config.height || 60;
        this.color = config.color || 'blue';
        this.x = config.x || 40;
        this.y = config.y || 40;
        this.zIndex = config.zIndex || '0';
        this.children = [];
        this.parentNode = null;
        this.eventList = {};
        this.isDrag = config.isDrag || true;
        this.manager = null;

        this.init();
    }

    extend(DraggableRect,Rect);

    //--------method ------------

    //---------------interface----------


    //---------self-------------
    DraggableRect.prototype.init = function () {
        this._addEvent();


    }
    DraggableRect.prototype._changeRectPosition = function ( offsetX, offsetY) {
        var that = this;
        if(!this.isChangedRectPositon) {
            this.x = offsetX + this.currentRectX;
            this.y = offsetY + this.currentRectY;
            this.isChangedRectPositon = true;
        }
        if (this.children && this.children.length > 0) {
            this.children.forEach(function (item) {

                item.x = item.x - item.parentNode.x;
                item.y = item.y - item.parentNode.y;
                item._changeRectPosition();
            })
        }
    }
    DraggableRect.prototype._addEvent = function(){
        var that = this;
        this.addEventListener('mouseup',function () {
            that.fireEvent('dragEnd');
            that._updateChildrenDisPosition();

        })
    }
    DraggableRect.prototype.getHitRect = function () {
        var that = this,
            nodeList = this.manager.children,
            resultItem  = null;

        nodeList.forEach(function (item) {
            if(that.x < item.x+item.width && that.x > item.x){
                resultItem = item;
                // item.appendChild(that);
                //item 就是容器了
                // console.log(item);
                // var _parentNode = that.parentNode;
                // _parentNode && _parentNode.removeChild(that);
                //
                // item.appendChild(that);

                //dragRect.zIndex ++;
            }
        })
        return resultItem;

    }

    DraggableRect.prototype._updateChildrenDisPosition = function () {

    }



    return {
        DraggableRect:DraggableRect
    }
})