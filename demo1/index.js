require.config({
    paths:{
        'oojs':'../oojs/oojs',
        'Base':'../oojs/Base',
        'language':'../oojs/language',
        'Widget':'../oojs/Widget',
        'Plugin':'../oojs/Plugin'
    }
})
//oblong 长方形
//circle 圆
//square 正方形
//用到了子组件绑定事件 父组件trigger  (父组件向子组件通讯)
//  子组件向父组件通信呢?


require(['oojs','./Container'],function (oojs,container) {
    var Base = oojs.Base,
        Widget = oojs.Widget;

    function App(){
        Base.apply(this,arguments);
    }
    oojs.language.extend(App,Base,{
        attr:{

        },
        init: function () {
            this.rightContainer = new container.RightContainer();
            this.leftContaienr = new container.LeftContainer();
            console.log(this.leftContaienr,this.rightContainer);
            this._bindUI();
        },
        _bindUI: function () {
            var that = this;
            var mouseX,mouseY;
            var _isMobile = false;
            if(oojs.language.tap.tapStart=='touchstart'){
                _isMobile = true;
            }
            console.log(oojs.language.tap);

            this.rightContainer.on('dragged2', function (e) {
                mouseX = _isMobile?e.changedTouches[0].clientX:e.clientX;
                mouseY = _isMobile?e.changedTouches[0].clientY:e.clientY;
                //判断拖拽的组件是否在左边容器里, 在的话判断,不在的话恢复初始位置
                //判断对比的组件是否一致, 是的话 销毁,重新生成,不是的话 恢复初始位置
               if(that._checkPoint(mouseX, mouseY) && that._checkTypes()){
                    that.leftContaienr.update();
                    that.rightContainer.update();
               }else{
                    that.rightContainer.reset();
               }
            })
        },
        _checkPoint: function (x,y) {
            var _isInRight = false;
            if(x>this.leftContaienr.coord.point1X && x<this.leftContaienr.coord.point2X &&
                y>this.leftContaienr.coord.point1Y && y<this.leftContaienr.coord.point2Y
            ){
                _isInRight = true;
            }
            return _isInRight;
        },
        _checkTypes: function () {
            var _isSame = false;
            if(this.rightContainer.currentType ==this.leftContaienr.currentType){
                _isSame = true;
            }
            return _isSame;
        }
    })

    var app = new App();


})