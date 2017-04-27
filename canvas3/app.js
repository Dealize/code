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
            selectedColor:{},
            currentCoverage:{},
            coverageList:[],
        },
        init: function () {
            var that = this;
            console.log(this);
            this._coverageList = [];
            this.worker = new Worker('ImgDataGenerate2.js');

        },
        renderUI: function () {
            var that = this;
            getDomFromCanvasScene();
            getDomFromCoverageScene();
            getDomFromToolScene();
            this._set_canvas_size();
            this._init_colorPicker_canvas();
            
            function getDomFromCanvasScene(){
                that.$canvasScene = that.boundingBox.find('.canvasScene');
                that.$canvas = that.$canvasScene.find('canvas');
                that.context = that.$canvas[0].getContext('2d');
                window.aacontext = that.context;

            }
            function getDomFromCoverageScene(){
                that.$coverageBtn = that.boundingBox.find('.coverageBtn');
                that.$coverageBtns = that.boundingBox.find('.coveragebtns');
                that.$coverageBtnContainer = that.boundingBox.find('.coverageBtnContainer');
                that.$coverageCanvas = that.boundingBox.find('.coverageScene').find('canvas');
                that.coverageContext = that.$coverageCanvas[0].getContext('2d');
            }
            function getDomFromToolScene(){
                that.$toolScene = that.boundingBox.find('.toolScene');
                that.$toolBtn = that.boundingBox.find('.toolBtn');
                that.$colorPickerCanvas = that.$toolScene.find('canvas');
                that.$selectedColorDiv = that.$toolScene.find('.selectedColorDiv');
                that.colorPickerCanvas_context = that.$colorPickerCanvas[0].getContext('2d');

            }
        },
        bindUI: function () {
            var that = this;
            this._prevent_body_default();
            this._bind_scene_event();
            this._bind_toolScene_event();
            this._bind_coverageScene_event();
            this._bind_canvaScene_event();
            this._bind_canvas_event();
            this._bind_colorPicker_canvas();
            this.on('selectedToolChange',function(data){
                that._tapStart_canvasFn = that['_'+data.value+'_tapStart_event'];
                that._tapMove_canvasFn = that['_'+data.value+'_tapMove_event'];
                //通过上面这种方法可以优化switch，从而不至于更耦合
                /**
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
                 */
            })

            // this.$coverageBtn.on('click',function(e){
            //     console.log(e.target.classList[1]);
            //     // if(e.target.classList[1]=='coverage1'){
            //         that._get_coverageData_from_ImgData(that.context.getImageData(0,0,370,657).data,that.coverage2.data,that.coverage1.data);
            //         that.coverageContext.putImageData(that.coverage1,0,0);
            //     // }
            //
            // })
        },
        syncUI: function () {
            var that = this;
            this._initScene();
            this.coverage1 = this.context.createImageData(this._canvasSize.width,this._canvasSize.height);
            this.coverage2 = this.context.createImageData(this._canvasSize.width,this._canvasSize.height);


            // w1.postMessage(this.coverage1);
            that.worker.onmessage = function(e){
                console.log(e.data.data);
                that.coverageList = e.data.data.coverageImgDataList ;

                // switch (e.data.type){
                //     case 'split_result_to_cover':
                //        that.coverageList = e.data.data.coverageImgDataList ;
                //        break;
                //     case 'merge_cover_to_result':
                //         that.coverageList = e.data.data.coverageImgDataList;
                // }
            }
        },



        _set_canvas_size: function () {
            //innerWidth
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
                //通过pre  new 来做判断
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
                    //这里同样可以优化掉这些case
                    /**
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
                     */
                    default:
                        selectedTool = targetType;
                        break;
                }
                var $target = $(e.target);
                that.$toolScene.find('.toolItem').each(function(index,item){
                    $(item).removeClass('active');
                })
                $target.addClass('active');
                that.setData({
                    selectedTool:selectedTool
                })
            })
            that.$toolScene.on(tap.tap,'.lineWidthItem',function (e) {
                var $target = $(e.target);
                that.$toolScene.find('.lineWidthItem').each(function(index,item){
                    $(item).removeClass('active');
                })
                $target.addClass('active');
                that.setData({
                    lineWidth : lineWidth
                })
                lineWidth = e.target.innerHTML
            })
            that.on('lineWidthChange',function(data){
                that.context.lineWidth = data.value
            })
        },
        _bind_coverageScene_event:function(){
            var that = this;
            that.$coverageBtns.on(tap.tap,'.add',function(){
                that._add_coverage();
            })
            that.$coverageBtnContainer.on('change','input',function (e) {
                console.log(e.target.checked);
            });
            that.on('currentCoverageChange',function(data){
                // console.log(data);
            })
            that.on('coverageListChange',function(data){
                that.worker.postMessage({
                    type:'merget_coverageData',
                    data:{
                        finalImgData:that.context.getImageData(0,0,that._canvasSize.width,that._canvasSize.height),
                        coverageImgDataList:that.coverageList
                    }
                })
            })
            that.$coverageBtnContainer.on(tap.tap,'.coverage_item_name',function(e){
                console.log($(e.target).parent().data().index);

                var _currentIndex = $(e.target).parent().data().index;
                that.coverageContext.putImageData(that.coverageList[_currentIndex].imgData,0,0);
            })
        },
        _bind_canvaScene_event: function () {
            var that = this;
            that.$toolBtn.on(tap.tap, function (e) {
                that.setData({
                    currentScene: e.target.classList[1].split('Btn')[0]||'toolScene'
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
                that.worker.postMessage({
                    type:'sperate_coverageData_from_imgData',
                    data:{
                        tempImgData:that.coverageContext.createImageData(that._canvasSize.width,that._canvasSize.height),
                        imgData:that.context.getImageData(0,0,that._canvasSize.width,that._canvasSize.height),
                        coverageImgDataList:that.coverageList
                    }
                })
                console.log(that.currentCoverage,that.coverageList);

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
                currentScene: 'coverageScene',
                selectedColor:'red',
                selectedTool:'brush',
                lineWidth:5
            });
            this._add_coverage();
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
            $('body').append(aLink);
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
        _brush_tapMove_event:function(x1,y1,x2,y2){
            var that = this;
            that.context.lineTo(x2, y2);
            that.context.stroke();
        },
        _fillRect_tapMove_event:function(x1,y1,x2,y2){
            var that = this;
            that.context.fillStyle = that.context.strokeStyle;
            that.context.putImageData(that._currentImgData,0,0);
            // that.context.fillRect(x1,y1,x2-x1,y2-y1);
            // 这种写法为什么必须要加beginPath
            that.context.beginPath();
            that.context.rect(x1,y1,x2-x1,y2-y1);
            that.context.fill();
            // that.context.closePath();
        },
        _fillRect_tapStart_event:function(){
            var that =this;
            that._currentImgData = that.context.getImageData(0,0,that._canvasSize.width,that._canvasSize.height);
        },
        _strokeRect_tapMove_event:function(x1,y1,x2,y2){
            var that = this;
            that.context.putImageData(that._currentImgData,0,0);
            that.context.strokeRect(x1,y1,x2-x1,y2-y1);
            // that.context.stroke();
        },
        _strokeRect_tapStart_event:function(){
            var that =this;
            that._currentImgData = that.context.getImageData(0,0,that._canvasSize.width,that._canvasSize.height);
        },
        _fillCircle_tapStart_event:function(){
            var that =this;
            that._currentImgData = that.context.getImageData(0,0,that._canvasSize.width,that._canvasSize.height);
        },
        _fillCircle_tapMove_event:function(x1,y1,x2,y2){
            var that = this;
            that.context.putImageData(that._currentImgData,0,0);
            var _radius =Math.max(Math.abs(x2-x1),Math.abs(y2-y1));
            that.context.beginPath()
            that.context.arc(x1,y1,_radius,0,2*Math.PI,true);
            that.context.fill();
            that.context.closePath();
        },
        _strokeCircle_tapMove_event:function(x1,y1,x2,y2){
            var that = this;
            that.context.putImageData(that._currentImgData,0,0);
            var _radius =Math.max(Math.abs(x2-x1),Math.abs(y2-y1));
            that.context.beginPath()
            that.context.arc(x1,y1,_radius,0,2*Math.PI,true);
            that.context.stroke();
            that.context.closePath();
        },
        _strokeCircle_tapStart_event:function(){
            var that =this;
            that._currentImgData = that.context.getImageData(0,0,that._canvasSize.width,that._canvasSize.height);
        },
        _eraser_tapMove_event:function(x1,y1,x2,y2){
            this.context.clearRect(x2,y2,30,30);
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
        _add_coverage:function(){
            var that = this,
                newImgData;
            if(this.coverageList.length>5){
                alert('最多创建5个图层');
                return ;
            }
            var domStr ='<div class="coverageBtn" data-index="'+this.coverageList.length+'">' +
                '<span class="coverage_item_name">图层'+this.coverageList.length+'</span>'+
                '<span class="coverage_item_del">删除</span>'+
                '<span class="coverage_item_show">是否显示<input type="checkbox" checked></span>'+
            '</div>';
            this.$coverageBtnContainer.prepend(domStr);
            if(that.coverageList.length==0){
                newImgData = that.context.getImageData(0,0,that._canvasSize.width,that._canvasSize.height);
            }else{
                newImgData = this.context.createImageData(this._canvasSize.width,this._canvasSize.height);

            }
            var newCoverageData ={
                imgData:newImgData,
                index:this.coverageList.length
            }
            this.coverageList.push(newCoverageData);
            this.setData({
                currentCoverage:newCoverageData,
                coverageList: this.coverageList
            })

        },
    })


    return {
        App: App
    }
})
