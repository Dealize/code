require.config({
    paths:{
        'oojs':'../oojs/oojs',
        'Base':'../oojs/Base',
        'language':'../oojs/language',
        'Widget':'../oojs/Widget',
        'Plugin':'../oojs/Plugin',
        'jquery':'../oojs/jquery'
    }
})


require(['oojs','gamePanel'],function (oojs,GamePanel) {
    var Base = oojs.Base,
        Widget = oojs.Widget;

    function App(){
        Base.apply(this,arguments);
    }
    oojs.extend(App,Widget, {
        attr:{
            // charsArr: '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'.split('')
            charsArr:[]
        },
        init:function (cfg) {
            var _arr = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'.split('');
            this.setData({
                charsArr:_arr
            })
            this._headPanel = new GamePanel.HeadPanel({
                boundingBox:$('#headPanel')
            }).render();
            this._footPanel = new GamePanel.FootPanel({
                boundingBox:$('#footPanel')
            }).render();
            this.generateGameArr(10);



        },
        bindUI:function () {
            this._headPanel.on('currentCharChange',function (data) {
               console.log(1,data);
            });
            this._footPanel.on('currentCharChange',function (data) {
                console.log(2,data)
            })
        },
        _getRandomArr:function (arr,length) {
            var resultArr = [],
                newArr = arr.concat(),
                index;
            if(arr.length<length){
                console.error('需要的长度太长');
                return;
            }
            for(var i=0;i<length;i++){
                index = parseInt(Math.random()*newArr.length);
                resultArr.push(newArr[index]);
                newArr.splice(index,1);
            }
            return resultArr;
        },
        generateGameArr:function (length) {
            var _headArr = this._getRandomArr(this.charsArr,length);
            var _footArr = this._getRandomArr(_headArr,length);
            this._headPanel.setCharsArr(_headArr);
            this._footPanel.setCharsArr(_footArr);
        }

    })

    var app = new App({
        boundingBox:$('body')
    }).render();
    console.log(app);
})