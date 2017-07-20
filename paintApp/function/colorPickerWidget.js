define(['FFF','tap','util'],function (FFF,tap,util) {
    var F = FFF.FFF,
        Base = F.Base,
        Widget = F.Widget;
    function ColorPickerWidget(){
        Widget.apply(this,arguments);
    }
    ColorPickerWidget.ATTRS = {
        boundingBox:{
            value:$('<div class="CPicker">'+
                        '<canvas id="CPicker_canvas"></canvas>'+
                        '<div class="CPicker_color">当前选中颜色</div>'+
                '</div>')
        },
        width:{
            value:150
        },
        height:{
            value:50
        },
        show:{
            value:true
        },
        color:{
            value:''
        }

    }
    F.extend(ColorPickerWidget,Widget,{
        initialize:function () {
            this._add_styleSheet();
        },
        renderUI:function () {
            var that = this;
            that._getDom();
        },
        bindUI:function () {
            this._bind_attrEvent();
            this._bind_colorPicker_canvas();
        },
        syncUI:function () {
            this.setWidth(this.width);
            this.setHeight(this.height);
            this._init_colorPicker_canvas();

        },
        _add_styleSheet:function () {
            var $style = $('<style>' +
                '.CPicker{display:flex;justify-content: space-around}' +
                '.CPicker_color{border:1px solid}' +
                '</style>');
            $('head').append($style);
        },
        _getDom:function () {
            var that = this;
            that.$colorPickerCanvas = that.boundingBox.find('canvas');
            that.$selectedColorDiv = that.boundingBox.find('.CPicker_color');
            that.colorPickerCanvas_context = that.$colorPickerCanvas[0].getContext('2d');
        },
        _bind_attrEvent:function () {
            var that = this;
            that.on('widthChange',function (data) {
                that.$colorPickerCanvas.attr({
                    width:data.value
                })
            });
            that.on('heightChange',function (data) {
                that.boundingBox.css({
                    height:data.value
                })
                that.$colorPickerCanvas.attr({
                    height:data.value
                })
            });
            that.on('showChange',function (data) {
                if(data.value){
                    that.boundingBox.show();
                }else{
                    that.boundingBox.hide();
                }
            });
            that.on('colorChange',function (data) {
                that.$selectedColorDiv.css({
                    background:data.value
                })
            })
        },
        _init_colorPicker_canvas:function(){
            this.colorPickerCanvas_context.fillRect(0,0,20,30)
            var obj = this.colorPickerCanvas_context.createLinearGradient(0,0,this.width,0),
                that = this;
            obj.addColorStop(0, '#000');
            obj.addColorStop(1 / 8, '#f00');
            obj.addColorStop(2 / 8, '#f0f');
            obj.addColorStop(3 / 8, '#00f');
            obj.addColorStop(4 / 8, '#0ff');
            obj.addColorStop(5 / 8, '#0f0');
            obj.addColorStop(6 / 8, '#ff0');
            obj.addColorStop(7 / 8, '#f00');
            obj.addColorStop(1, '#fff');
            this.colorPickerCanvas_context.fillStyle = obj;
            this.colorPickerCanvas_context.fillRect(0,0,that.width,that.height);
        },
        _bind_colorPicker_canvas:function(){
            var that = this;
            var _canvasImgData;
            var _finalColor = '';
            this.$colorPickerCanvas.on(tap.tapStart,function () {
                that._offset = that.$colorPickerCanvas.offset();
                _canvasImgData= that.colorPickerCanvas_context.getImageData(0,0,that.width,that.height);
            })
            this.$colorPickerCanvas.on(tap.tapStart +' '+ tap.tapMove,function(e){
                var touchPosition = util.getTouchPosition(e);
                touchPosition.x = touchPosition.x - that._offset.left;
                touchPosition.y = touchPosition.y - that._offset.top;
                var _selectedColor = [];
                var _current_rgbaData_position = (Math.round(touchPosition.y)*_canvasImgData.width+Math.round(touchPosition.x))*4;
                _selectedColor.push(_canvasImgData.data[_current_rgbaData_position]);
                _selectedColor.push(_canvasImgData.data[_current_rgbaData_position+1]);
                _selectedColor.push(_canvasImgData.data[_current_rgbaData_position+2]);
                _selectedColor.push(_canvasImgData.data[_current_rgbaData_position+3]);
                _finalColor = 'rgb('+_selectedColor[0]+','+_selectedColor[1]+','+_selectedColor[2]+')';
                that.$selectedColorDiv.css({
                    background:_finalColor
                })
            });
            this.$colorPickerCanvas.on(tap.tapEnd,function(){
                that.setColor(_finalColor)
            })
            console.log(_canvasImgData);
        },

    })
    return{
        ColorPickerWidget:ColorPickerWidget
    }
})