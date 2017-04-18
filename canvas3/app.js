define(['oojs'], function (oojs) {
    var Widget = oojs.Widget,
        tap = oojs.language.tap;

    function App() {
        Widget.apply(this, arguments);
    }

    oojs.extend(App, Widget, {
        attr: {
            currentScene: {},
            sceneList: {},
            selectedTool:{},
            lineWidth:{},
            selectedColor:{}
        },
        init: function () {
            var that = this;
        },
        renderUI: function () {
            this.$canvasScene = this.boundingBox.find('.canvasScene');
            this.$canvas = this.$canvasScene.find('canvas'),
            this.$toolScene = this.boundingBox.find('.toolScene');
            this.$toolBtn = this.boundingBox.find('.toolBtn');
            this.$confirmBtn = this.$toolScene.find('.confirmBtn');
            this.$cancelBtn = this.$toolScene.find('.cancelBtn');
            this.$colorPickerCanvas = this.$toolScene.find('canvas');
            this.$selectedColorDiv = this.$toolScene.find('.selectedColorDiv');

            this.context = this.$canvas[0].getContext('2d');
            this.colorPickerCanvas_context = this.$colorPickerCanvas[0].getContext('2d');
            this._set_canvas_size();
            this._init_colorPicker_canvas();
        },
        bindUI: function () {
            var that = this;
            this._prevent_body_default();
            this._bind_scene_event();
            this._bind_toolScene_event();
            this._bind_canvaScene_event();
            this._bind_canvas_event();
            this._bind_colorPicker_canvas();
            this.on('selectedToolChange',function(data){
                console.log(data.value);
                switch(data.value){
                    case 'brush':
                        that._tapStart_canvasFn = null;
                        that._tapMove_canvasFn = that._brush_event;
                        break;
                    case 'fillRect':
                        that._tapStart_canvasFn = that._fillRect_tapStart_event;
                        that._tapMove_canvasFn = that._fillRect_tapMove_event;
                        break;
                    case 'strokeRect':
                        that._tapStart_canvasFn = that._strokeRect_tapStart_event;
                        that._tapMove_canvasFn = that._strokeRect_tapMove_event;
                        break;
                    case 'fillCircle':
                        that._tapStart_canvasFn = that._fillCircle_tapStart_event;
                        that._tapMove_canvasFn = that._fillCircle_tapMove_event;
                        break;
                    case 'strokeCircle':
                        that._tapStart_canvasFn = that._strokeCircle_tapStart_event;
                        that._tapMove_canvasFn = that._strokeCircle_tapMove_event;
                        break;
                    case 'eraser':
                        that._tapStart_canvasFn = null;
                        that._tapMove_canvasFn = that._eraser_event;

                        break;
                }
            })

        },
        syncUI: function () {
            this._initScene();

        },
        _set_canvas_size: function () {
            var canvasWidth = screen.width - 5,
                canvasHeight = screen.height - 10;
            this.$canvas.attr({
                'width': canvasWidth,
                'height': canvasHeight
            })
            this._canvasSize = {
                width:canvasWidth,
                height:canvasHeight
            }
        },
        _bind_scene_event: function () {
            var that = this;
            that.on('currentSceneChange', function (data) {
                var currentSceneClassName = that.currentScene.className;
                that.sceneList.each(function (index, item) {
                    if (item.classList.contains(data.value)) {
                        $(item).show();
                    } else {
                        $(item).hide();
                    }
                })
            })
        },
        _bind_toolScene_event: function () {
            var that = this,
                target,
                targetType,
                selectedTool,
                lineWidth;
            that.$toolScene.on(tap.tap, '.toolItem', function (e) {
                target = e.target;
                targetType = target.className.split(' ')[1];
                switch (targetType) {
                    case 'reset':
                        if(confirm('确认要清除画布？')){
                            that._reset_canvas_data();
                        }
                        that._goto_canvasScene()
                        break;
                    case 'save':
                        that._save_canvas_data();
                        that._goto_canvasScene();
                        break;
                    case 'undo':
                        that._go_canvas_undo();
                        that._goto_canvasScene();
                        break;
                    case 'brush':
                        selectedTool = 'brush';
                        break;
                    case 'text':
                        selectedTool = 'text';
                        break;
                    case 'eraser':
                        selectedTool = 'eraser';
                        break;
                    case 'fillRect':
                        selectedTool = 'fillRect';
                        break;
                    case 'strokeRect':
                        selectedTool = 'strokeRect';
                        break;
                    case 'fillCircle':
                        selectedTool = 'fillCircle';
                        break;
                    case 'strokeCircle':
                        selectedTool = 'strokeCircle';
                        break;
                    case 'stuff':
                        selectedTool = 'stuff';
                        break;
                    default:
                        break;
                }
                var $target = $(e.target);
                that.$toolScene.find('.toolItem').each(function(index,item){
                    $(item).removeClass('active');
                })
                $target.addClass('active');
            })
            that.$toolScene.on(tap.tap,'.lineWidthItem',function (e) {
                var $target = $(e.target);
                that.$toolScene.find('.lineWidthItem').each(function(index,item){
                    $(item).removeClass('active');
                })
                $target.addClass('active');
                that.setData({
                    lineWidth:e.target.innerHTML
                })
            })
            that.$toolScene.on(tap.tap,'.blockBtn',function(e){

                switch (e.target.className.split(' ')[1]){
                    case 'confirmBtn':
                        that.setData({
                            currentScene: 'canvasScene',
                            selectedTool:selectedTool,
                            lineWidth:lineWidth
                        })
                        break;
                    case 'cancelBtn':
                        that.setData({
                            currentScene: 'canvasScene',
                        })
                        break;
                }
            })
            that.on('lineWidthChange',function(data){
                that.context.lineWidth = data.value
            })
        },
        _bind_canvaScene_event: function () {
            var that = this;
            that.$toolBtn.on(tap.tap, function (e) {
                that.setData({
                    currentScene: 'toolScene'
                })
            })
        },
        _bind_canvas_event: function () {
            var that = this,
                startPosition = {},
                movingPosition = {},
                drawing = false;

            this.$canvas.on(tap.tapStart, function (e) {
                drawing = true;
                that._save_canvas_undo()
                startPosition = that._getTouchPosition(e, 'client');
                that.context.beginPath();
                that.context.moveTo(startPosition.x, startPosition.y);
                that._tapStart_canvasFn &&  that._tapStart_canvasFn();
            })
            this.$canvas.on(tap.tapMove, function (e) {
                if (!drawing) {
                    return;
                }
                movingPosition = that._getTouchPosition(e, 'client');
                that._tapMove_canvasFn(startPosition.x,startPosition.y,movingPosition.x,movingPosition.y);
            })
            this.$canvas.on(tap.tapEnd, function (e) {
                drawing = false;
                that.context.closePath();
            })

        },
        _prevent_body_default: function () {
            $('body').on(tap.tapStart, function (e) {
                e.preventDefault();
            })
        },
        _initScene: function () {
            this.setData({
                sceneList: this.boundingBox.find('.scene')
            });
            this.setData({
                currentScene: 'toolScene',
                selectedColor:'red',
                selectedTool:'brush',
                lineWidth:5
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
        _save_canvas_data:function(){
            var aLink = $('<a></a>'),
                base64Data = this.$canvas[0].toDataURL('png');
            aLink.attr({
                href:base64Data,
                download:'img.png'
            })
            console.log(aLink);
            aLink[0].click();
        },
        _reset_canvas_data:function(){
            var that = this;
            that.context.clearRect(0,0,that._canvasSize.width,that._canvasSize.height)
        },
        _goto_canvasScene:function(){
            this.setData({
                currentScene:'canvasScene'
            })
        },
        _save_canvas_undo:function () {
            var imgData = this.context.getImageData(0,0,this._canvasSize.width,this._canvasSize.height);
            this._canvasSteps = this._canvasSteps || [];
            this._canvasSteps.push(imgData);
            if(this._canvasSteps.length>4){
                this._canvasSteps.splice(0,this._canvasSteps.length - 4);
            }
            console.log(this._canvasSteps);
        },
        _go_canvas_undo:function(){
            var _canvasStepsLength = this._canvasSteps.length;
            this.context.putImageData(this._canvasSteps[_canvasStepsLength-1],0,0);
            if(_canvasStepsLength>1){
                this._canvasSteps.pop();
            }
        },
        _brush_event:function(x1,y1,x2,y2){
            var that = this;
            that.context.lineTo(x2, y2);
            that.context.stroke();
        },
        _fillRect_tapMove_event:function(x1,y1,x2,y2){
            var that = this;
            that.context.fillStyle = that.context.strokeStyle;
            that.context.putImageData(that._currentImgData,0,0);
            that.context.fillRect(x1,y1,x2-x1,y2-y1);
            that.context.stroke();
        },
        _fillRect_tapStart_event:function(){
            var that =this;
            that._currentImgData = that.context.getImageData(0,0,that._canvasSize.width,that._canvasSize.height);
        },
        _strokeRect_tapMove_event:function(x1,y1,x2,y2){
            var that = this;
            that.context.putImageData(that._currentImgData,0,0);
            that.context.strokeRect(x1,y1,x2-x1,y2-y1);
            that.context.stroke();
        },
        _strokeRect_tapStart_event:function(){
            var that =this;
            that._currentImgData = that.context.getImageData(0,0,that._canvasSize.width,that._canvasSize.height);
        },
        _fillCircle_tapMove_event:function(x1,y1,x2,y2){
            var that = this;
            that.context.putImageData(that._currentImgData,0,0);
            that.context.arc(x1,y1,Math.max(x2-x1,y2-y1),0,360*Math.PI,true);
            that.context.stroke();
        },
        _fillCircle_tapStart_event:function(){
            var that =this;
            that._currentImgData = that.context.getImageData(0,0,that._canvasSize.width,that._canvasSize.height);
        },
        _strokeCircle_tapMove_event:function(x1,y1,x2,y2){
            var that = this;
            that.context.putImageData(that._currentImgData,0,0);
            that.context.arc(x1,y1,Math.max(x2-x1,y2-y1),0,360*Math.PI,true);
            that.context.stroke();
        },
        _strokeCircle_tapStart_event:function(){
            var that =this;
            that._currentImgData = that.context.getImageData(0,0,that._canvasSize.width,that._canvasSize.height);
        },
        _eraser_event:function(x1,y1,x2,y2){
            this.context.clearRect(x2,y2,10,10);
        },
        _init_colorPicker_canvas:function(){
            var obj = this.colorPickerCanvas_context.createLinearGradient(0,0,200,0);
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
            this.colorPickerCanvas_context.fillRect(0,0,200,100);
            // gradientBar.addColorStop(0, '#f00');
            // 4     gradientBar.addColorStop(1 / 6, '#f0f');
            // 5     gradientBar.addColorStop(2 / 6, '#00f');
            // 6     gradientBar.addColorStop(3 / 6, '#0ff');
            // 7     gradientBar.addColorStop(4 / 6, '#0f0');
            // 8     gradientBar.addColorStop(5 / 6, '#ff0');
            // 9     gradientBar.addColorStop(1, '#f00');
            // this.colorPickerCanvas_context.fillStyle = 'pink';
            // this.colorPickerCanvas_context.fillRect(0,0,50,100);
            // this.colorPickerCanvas_context.fillStyle = '#6fa8dc';
            // this.colorPickerCanvas_context.fillRect(50,0,100,100);
            // this.colorPickerCanvas_context.fillStyle = 'darkblue';
            // this.colorPickerCanvas_context.fillRect(100,0,200,100);

        },
        _bind_colorPicker_canvas:function(){
            var that = this;
            var _canvasImgData = this.colorPickerCanvas_context.getImageData(0,0,this.$colorPickerCanvas.width(),this.$colorPickerCanvas.height());
            var _finalColor = '';
            this.$colorPickerCanvas.on(tap.tapStart +' '+ tap.tapMove,function(e){
                var touchPosition = that._getTouchPosition(e);
                var _selectedColor = [];
                // _canvasImgData.
                var _current_rgbaData_position = (Math.round(touchPosition.y)*_canvasImgData.width+Math.round(touchPosition.x))*4;
                // console.log(parseInt(touchPosition.x*touchPosition.y*4),_canvasImgData.data.length);
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
                that.setData({
                    selectedColor:_finalColor
                })
            })
            this.on('selectedColorChange',function(data){
                console.log(data.value);
                that.context.fillStyle = data.value;
                that.context.strokeStyle = data.value;
                that.$selectedColorDiv.css({
                    background:data.value
                })
            })
            console.log(_canvasImgData);
        },


    })


    return {
        App: App
    }
})
