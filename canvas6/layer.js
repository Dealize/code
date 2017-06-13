define(['FFF'],function (FFF) {
    var F = FFF.FFF,
        Widget = F.Widget;
    function Layer(){
        Widget.apply(this,arguments);
    }
    Layer.ATTRS = {
        parent:{
            value:null
        },
        index:{
            value:1
        },
        isDisplay:{
            value:true
        },
        boundingBox:{
            value:$('<div class="DC_layer"><div class="DC_layer_title">图层</div><canvas width="400" height="400"></canvas></div>')
        },
        isActive:{
            value:false
        },
    }
    F.extend(Layer,Widget,{
        initialize:function () {
            this.$canvas = this.boundingBox.find('canvas');
            this.canvas = this.$canvas[0];
            this._layerTitle = this.boundingBox.find('.DC_layer_title');
            this._layerTitle.html('图层'+this.index);
            this.order = this.index;
            this.boundingBox.attr('data-order',this.index);
        },
        renderUI:function () {

        },
        bindUI:function () {
            var that = this;
            that._bindCanvasEvent();
            this.on('indexChange',function (data) {
                that.boundingBox.css('z-index',data.value);
                that.$canvas.attr('data-index',data.value);
            })
            this.on('isDisplayChange',function(data){
                var _leftItem = that.parent.getLayerItemByIndex(that.index+1);
                if(data.value==true){
                    $(_leftItem).removeClass('DC_hideCover');
                    this.boundingBox.show();
                }else{
                    this.boundingBox.hide();
                    $(_leftItem).addClass('DC_hideCover');
                }
            })
            this.on('isActiveChange',function (data) {
                if(data.value==true){
                    that.boundingBox.addClass('DC_layer_canvas_active');
                }else{
                    that.boundingBox.removeClass('DC_layer_canvas_active');
                }
            })
        },
        syncUI:function () {
            this.setIndex(this.getIndex());
        },
        _bindCanvasEvent:function () {
            var that = this,
                paintToggle = false;

            this.context = this.canvas.getContext('2d');
            this.context.lineWidth = 10;
            this.context.strokeStyle = '#00ff00';
            this.$canvas.on('mousedown',function (e) {
                paintToggle = true;
                that.context.beginPath();
            })
            this.$canvas.on('mousemove',function (e) {
                if(!paintToggle){
                    return;
                }
                that.context.lineTo(e.offsetX, e.offsetY);
                that.context.stroke();
            })
            this.$canvas.on('mouseup',function (e) {
                paintToggle = false;
                that.context.closePath();

            })
        }
    })
    return {
        Layer:Layer,
    }
})