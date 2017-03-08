require.config({
    paths:{
        'oojs':'../oojs/oojs',
        'Base':'../oojs/Base',
        'language':'../oojs/language',
        'Widget':'../oojs/Widget',
        'Plugin':'../oojs/Plugin'
    }
})

require(['oojs'],function (oojs) {
    var Base = oojs.Base,
        Widget = oojs.Widget;


    function DragDiv(){
        Widget.apply(this,arguments)
    }
    oojs.language.extend(DragDiv,Widget,{
        attr:{
            name:'123',
            type:'',
        },
        boundingBox:$('<div class="">123</div>'),
        init:function () {
        },
        renderUI:function () {
        },
        bindUI: function () {
            var that = this;
            //this.on('')
            var mouseX,mouseY,objX,objY;
            var dragging = false;
            this.boundingBox.css({
                'left':'0px',
                'top':'0px'
            })
            this.boundingBox.bind(oojs.language.tap.tapStart,function (e) {
                dragging = true;
                this.style.position = 'relative';
                mouseX = e.clientX;
                mouseY = e.clientY;
                objX = parseInt(this.style.left);
                objY = parseInt(this.style.top);
            })
            this.boundingBox.bind(oojs.language.tap.tapMove, function (e) {
                if(dragging){
                    this.style.left = parseInt(e.clientX-mouseX+objX)+ 'px';
                    this.style.top = parseInt(e.clientY-mouseY+objY)+ 'px';
                }
            })
            this.boundingBox.bind(oojs.language.tap.tapEnd,function(e){
                dragging = false;
                that.trigger('dragged',e);
            })
            function moveFn(e){
                console.log(e.offsetX);
                that._divMoveFn(e);
            }

            this.on('aaa', function (e) {
                console.log(123);
            })
        },
        _divMoveFn:function (e) {
            e.target.style.left= e.offsetX+'px'
        }
    })


    function CirculeDiv(){
        DragDiv.apply(this,arguments);
    }
    oojs.language.extend(CirculeDiv,DragDiv,{
        attr:{
            type:'circule'
        },
        boundingBox:$('<div class="circule"></div>'),
        init: function () {

        },
        renderUI: function () {

        }

    })
    function SquareDiv(){
        DragDiv.apply(this,arguments);
    }
    oojs.language.extend(SquareDiv,DragDiv,{
        attr:{
            type:'square'
        },
        boundingBox:$('<div class="square"></div>'),
        init: function (cfg) {
        },
        renderUI: function () {

        },
        bindUI: function () {
            //this.callParent('bindUI');
        }

    })
    function OblongDiv(){
        DragDiv.apply(this,arguments);
    }
    oojs.language.extend(OblongDiv,DragDiv,{
        attr:{
            type:'oblong'
        },
        boundingBox:$('<div class="oblong"></div>'),
        init: function () {
        },
        renderUI: function () {

        }

    })



    var dragDivs = [CirculeDiv,SquareDiv,OblongDiv];


    function Container(){
        Base.apply(this,arguments)
    }
    oojs.language.extend(Container,Base,{
        attr:{
            coord:{}//容器的坐标
        },
        init: function () {
          this.getCoord();
        },
        getCoord: function () {
            var _offset = this._boundingBox.offset();
            this.coord.point1X = _offset.left;
            this.coord.point1Y = _offset.top;
            this.coord.point2X = _offset.left + this._boundingBox.width();
            this.coord.point2Y = _offset.top + this._boundingBox.height();
        }
    })

    function LeftContainer(){
        Container.apply(this,arguments);
    }
    oojs.language.extend(LeftContainer,Container,{
        attr:{
            currentType:''
        },
        init:function () {
            this._boundingBox = $('.leftContainer');
            this.callParent('init');
            this._changeDiv();

        },
        _changeDiv:function () {
            // var _divType = parseInt(Math.random()*2);
            var _divType = parseInt(Math.random()*3000)%3;
            console.log(_divType);
            var _temp = new dragDivs[_divType]().render({
                container:$('.leftContainer')

            });
            _temp.parent = this;
            this.currentType = _temp.type;
        }
    })

    function RightContainer(){
        Container.apply(this,arguments);
    }
    oojs.language.extend(RightContainer,Container,{
        attr:{
            divList:{},
        },
        init:function () {
            this._boundingBox = $('.rightContainer');
            this.callParent('init');
            this._addDiv();
        },
        _addDiv:function () {
            var that = this;
            for(var i in dragDivs){
                var _temp = new dragDivs[i]().render({
                    container:$('.rightContainer')
                });
                _temp.parent = this;
                _temp.on('dragged',function (e) {
                    that.trigger('dragged',e);
                })
                this.divList[_temp.type] = _temp;
            }
        },
    })



    function App(){
        Base.apply(this,arguments);
    }
    oojs.language.extend(App,Base,{
        attr:{

        },
        init: function () {
            this.rightContainer = new RightContainer();
            this.leftContaienr = new LeftContainer();
            console.log(this.leftContaienr,this.rightContainer);
            this._bindUI();
        },
        _bindUI: function () {
            this.rightContainer.on('dragged', function (e) {
                console.log(e.clientX, e.clientY);
            })
        },
        _checkPoint: function (x,y) {
            //if(x<this.leftContaienr.coord.point1X){//在左框的左边
            //    console.log('在左框左边')
            //}else if(x>this.leftContaienr.coord.point2X && x<this.rightContainer.coord.point2X){
            //    console.log('在左框的右边')
            //}else if(){
            //
            //}
        }
    })


    var app = new App();


})