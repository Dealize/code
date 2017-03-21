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
            charsArr:[]
        },
        init:function (cfg) {
            var _arr = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'.split('');
            this.setData({
                charsArr:_arr,
                currentChar:{
                    head:'',
                    foot:''
                }
            });
            this.gameLength = 3;

            this._headPanel = new GamePanel.HeadPanel({
                boundingBox:$('#headPanel')
            }).render();
            this._footPanel = new GamePanel.FootPanel({
                boundingBox:$('#footPanel')
            }).render();
            this.generateGameArr(this.gameLength);

        },
        bindUI:function () {
            var that = this;
            this._headPanel.on('currentCharChange',function (data) {
               that.setData({
                   currentChar:{
                       head:data.value,
                       foot:that.currentChar.foot
                   }
               })
            });
            this._footPanel.on('currentCharChange',function (data) {
                that.setData({
                    currentChar:{
                        head:that.currentChar.head,
                        foot:data.value
                    }
                })
            });
            this._footPanel.on('hiddenDomNumChange',function (data) {
                if(data.value==that.gameLength){
                    that.gameLength+=1;
                    that.generateGameArr(that.gameLength);
                }
            })
            this.on('currentCharChange',function (data) {
                that._checkCharIsEqual();
            })
        },
        generateGameArr:function (length) {
            var _headArr = this._getRandomArr(this.charsArr,length);
            var _footArr = this._getRandomArr(_headArr,length);
            this._headPanel.setCharsArr(_headArr);
            this._footPanel.setCharsArr(_footArr);
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
        _checkCharIsEqual:function () {
            var that = this,
                headChar = this.currentChar.head,
                footChar = this.currentChar.foot;
            if(headChar && footChar){
                if(headChar == footChar){
                    console.log('匹配')
                    this._confirmCharIsEqual();
                }else{
                    console.log('不匹配')
                }
                this.setData({
                    currentChar:{
                        head:'',
                        foot:''
                    }
                })
                setTimeout(function () {
                    that._resetCharsDom();
                },300)
            }
        },
        _resetCharsDom:function () {
            this._headPanel.resetCharsDom();
            this._footPanel.resetCharsDom();
        },
        _confirmCharIsEqual:function () {
            this._headPanel.confirmCharIsEqual();
            this._footPanel.confirmCharIsEqual();
        }
    })

    var app = new App({
        boundingBox:$('body')
    }).render();
    console.log(app);
})