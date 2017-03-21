define(['oojs'],function (oojs) {
    var Widget = oojs.Widget,
        tap = oojs.language.tap;

    function GamePanel(){
        Widget.apply(this,arguments)
    }
    oojs.extend(GamePanel,Widget,{
        attr:{
            currentChar:'',
            currentCharIndex:'',
            hiddenDomNum:0,
        },
        init:function (cfg) {

        },
        renderUI:function () {
            
        },
        bindUI:function () {
            var that = this;
            this.boundingBox.on(tap.tap,function (e) {
                if(e.target.getAttribute('id')==null && e.target.innerHTML!= '' ){
                    that.resetCharsDom();
                    $(e.target).addClass('active');
                    that.setData({
                        currentChar:e.target.innerHTML,
                        currentCharIndex:e.target.dataset.index
                    })
                }
            })
        },
        setCharsArr:function (arr) {
            this.boundingBox.html('');
            var _domStr = '';
            for(var i in arr){
                _domStr+='<div data-index="'+i+'">'+arr[i]+'</div>'
            }
            this.boundingBox.append(_domStr);
            this._charDomArr = this.boundingBox.find('div');
            this.setData({
                hiddenDomNum:0

            })
        },
        resetCharsDom:function () {
            this._charDomArr.removeClass('active');
        },
        confirmCharIsEqual:function () {
            var _currentDom = this._charDomArr[this.currentCharIndex];
            $(_currentDom).html('').addClass('hidden');
            this.setData({
                hiddenDomNum:this.hiddenDomNum+1
            })
        }
    })
    
    function HeadPanel() {
        GamePanel.apply(this,arguments)
    }
    oojs.extend(HeadPanel,GamePanel,{
        attr:{
            
        },
        init:function () {
            this.callParent('init');
        },
        renderUI:function () {
            this.callParent('rendUI');
        },
        bindUI:function () {
            this.callParent('bindUI');

        }
    })

    function FootPanel() {
        GamePanel.apply(this,arguments)
    }
    oojs.extend(FootPanel,GamePanel,{
        attr:{

        },
        init:function () {
            this.callParent('init');
        },
        renderUI:function () {
            this.callParent('rendUI');
        },
        bindUI:function () {
            this.callParent('bindUI');

        }
    })

    return {
        GamePanel:GamePanel,
        HeadPanel:HeadPanel,
        FootPanel:FootPanel
    }
})