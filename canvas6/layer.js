define(['FFF'],function (FFF) {
    var F = FFF.FFF,
        Widget = F.Widget;
    function Layer(){
        Widget.apply(this,arguments);
    }
    Layer.ATTRS = {
        index:{
            value:1
        },
        isDisplay:{
            value:true
        },
        boundingBox:{
            value:$('<div class="DC_layer"><div class="DC_layer_title">图层</div><canvas width="400" height="400"></canvas></div>')
        }
    }
    F.extend(Layer,Widget,{
        initialize:function () {
            this._canvas = this.boundingBox.find('canvas');
            this._layerTitle = this.boundingBox.find('.DC_layer_title');
            this._layerTitle.html('图层'+this.index);
            this.order = this.index;
            this.boundingBox.attr('data-order',this.index);
        },
        renderUI:function () {

        },
        bindUI:function () {
            var that = this;
            this.on('indexChange',function (data) {
                that.boundingBox.css('z-index',data.value);
                that._canvas.attr('data-index',data.value);
            })
        },
        syncUI:function () {
            this.setIndex(this.getIndex());
        }
    })
    return {
        Layer:Layer,
    }
})