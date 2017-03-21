define(['oojs'],function (oojs) {
    var Widget = oojs.Widget,
        tap = oojs.language.tap;

    function GamePanel(){
        Widget.apply(this,arguments)
    }
    oojs.extend(GamePanel,Widget,{
        attr:{
            currentChar:''
        },
        init:function (cfg) {

        },
        renderUI:function () {
            
        },
        bindUI:function () {
            var that = this;
            this.boundingBox.on(tap.tap,function (e) {
                if(e.target.getAttribute('id')==null && e.target.innerHTML!= '' ){
                    that.setData({
                        currentChar:e.target.innerHTML
                    })
                }
            })
        },
        setCharsArr:function (arr) {
            this.boundingBox.empty();
            var _domStr = '';
            for(var i in arr){
                _domStr+='<div>'+arr[i]+'</div>'
            }
            this.boundingBox.append(_domStr);
            this._charDomArr = this.boundingBox.find('div');
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
        rendUI:function () {
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
        rendUI:function () {
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