define([],function () {
    function Rect(config) {
        this.config = '';
        this.width = '';
        this.height = '';
        this.color = '';
        this.x = '';
        this.y = '';
        this.zIndex = '';
        this.children = [];
        this.parentNode = null;
        this.eventList = {};
        this.isDrag = false;
        this.manager = null;

    }
    //--------method ------------
    Rect.prototype.addEventListener = function (eventType,callBack) {
        this.eventList[eventType] = this.eventList[eventType] || [];
        this.eventList[eventType].push(callBack);
    }
    Rect.prototype.fireEvent = function (eventType,arg) {
        var that = this;
        this.eventList[eventType] && this.eventList[eventType].forEach(function (item,index) {
            item(arg);
        })
    }
    Rect.prototype.checkPointIsInArea = function (currentClentX,currentClentY) {
        if(currentClentX>this.x &&
            currentClentX<=(this.x+this.width) &&
            currentClentY>this.y &&
            currentClentY<=(this.y+this.height)) {
            return true;
    } else{
        return false;
    }
}
    Rect.prototype.appendChild = function (arg) {
        arg.parentNode = this;
        this.children.push(arg);

    }
    Rect.prototype.removeChild = function (node) {
        var that = this;
        this.children.forEach(function(item,index){
            if(item == node){
                that.children.splice(index,1);
            }
        })
    }

    Rect.prototype.draw = function () {
        this.context = this.manager.context;
        this._setContextStyle();
        this.context.fillRect(this.x,this.y,this.width,this.height);
        this.fireEvent('loaded');

        this.children.forEach(function (item, index) {
            item.draw();
        })
    }


    //---------------interface----------
    Rect.prototype._setContextStyle = function () {
        this.context.fillStyle = this.color;
    }


    return {
        Rect:Rect
    }
})