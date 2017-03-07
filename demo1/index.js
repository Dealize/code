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
            this.on('')
            this.boundingBox.bind(oojs.language.tap.tap,function (e) {
            })
            this.boundingBox.bind(oojs.language.tap.tapStart,function (e) {
                // that.boundingBox.bind(oojs.language.tap.tapMove,that._divMoveFn(e));
                that.boundingBox.bind(oojs.language.tap.tapMove,moveFn);
                console.log(e)
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




    function LeftContainer(){
        Base.apply(this,arguments);
    }
    oojs.language.extend(LeftContainer,Base,{
        attr:{
            currentType:''
        },
        init:function () {
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
            this.attr.currentType = _temp.attr.type;
        }
    })

    function RightContainer(){
        Base.apply(this,arguments);
    }
    oojs.language.extend(RightContainer,Base,{
        attr:{
            divList:{}
        },
        init:function () {
            this._addDiv();

        },
        _addDiv:function () {
            var that = this;
            for(var i in dragDivs){
                var _temp = new dragDivs[i]().render({
                    container:$('.rightContainer')
                });
                _temp.parent = this;
                _temp.on('dragged',function (arg) {
                    console.log(that,arg,_temp.attr.type);
                })
                this.attr.divList[_temp.attr.type] = _temp;

            }
            console.log(this);
        }
    })

    var rightContainer = new RightContainer();
    var leftContaienr = new LeftContainer();
    console.log(leftContaienr,rightContainer)

})