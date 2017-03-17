define(['oojs','./DragDiv'], function (oojs,dragDiv) {
    var Base = oojs.Base,
        Widget = oojs.Widget;
    var dragDivs = [dragDiv.CirculeDiv,dragDiv.SquareDiv,dragDiv.OblongDiv];

    function Container(){
        Base.apply(this,arguments)
    }
    oojs.language.extend(Container,Base,{
        attr:{
            coord:{}//容器的坐标
        },
        init: function () {
            this._getCoord();
        },
        _getCoord: function () {
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
            currentType:'',
            currentDiv:{}
        },
        init:function () {
            this._boundingBox = $('.leftContainer');
            this.callParent('init');
            this._changeDiv();

        },
        _changeDiv:function () {
            var _divType = parseInt(Math.random()*3000)%3;
            this.currentDiv = new dragDivs[_divType]({
                dragToggle:false
            }).render({
                container:$('.leftContainer')

            });
            this.currentDiv.parent = this;
            this.currentType = this.currentDiv.type;
        },
        //销毁和生成
        update: function () {
            var that = this;
            this._boundingBox.css('background','blue')
            setTimeout(function () {
                that._boundingBox.css('background','')
            },200);
            this.currentDiv.destroy();
            this._changeDiv();

        }
    })

    function RightContainer(){
        Container.apply(this,arguments);
    }
    oojs.language.extend(RightContainer,Container,{
        attr:{
            divList:{},
            currentType:'',
            currentDiv:{}
        },
        init:function () {
            this._boundingBox = $('.rightContainer');
            this.callParent('init');
            for(var i in dragDivs){
                this._addDiv(i);
            }
        },
        _addDiv:function (index) {
            var that = this;
            var _temp = new dragDivs[index]().render({
                    container:$('.rightContainer')
                });
            _temp.parent = this;
            _temp.on('dragged',function (arg) {
                that.currentType = arg.target.type;
                that.currentDiv = arg.target;
                console.log(arg.e.touches);
                that.trigger('dragged2',arg.e);
            })
            this.divList[index] = _temp;
        },
        update: function () {
            for(var i in this.divList){
                if(this.divList[i].type==this.currentType){
                    this.divList[i].destroy();
                    this._addDiv(i)
                }
            }
        },
        reset: function () {
            this.currentDiv.boundingBox.css({
                'left':'0px',
                'top':'0px'
            })
        }
    })


    return {
        Container:Container,
        LeftContainer:LeftContainer,
        RightContainer:RightContainer
    }
})