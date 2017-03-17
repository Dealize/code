define(['oojs'],function (oojs) {
    var Widget = oojs.Widget;

    function GamePanel(){
        Widget.apply(this,arguments)
    }
    oojs.extend(GamePanel,Widget,{
        attr:{
            
        },
        init:function (cfg) {

        },
        renderUI:function () {
            
        },
        bindUI:function () {
            this.boundingBox.on('click',function (e) {
                console.log(e.target);
            })
        },
        setCharsArr:function (arr) {
            this.boundingBox.empty();
            var _domStr = '';
            for(var i in arr){
                _domStr+='<div>'+i+'</div>'
            }
            this.boundingBox.append(_domStr);
            this._charDomArr = this.boundingBox.find('div');
            console.log(this._charDomArr)
        }
    })
    
    function HeadPanel() {
        GamePanel.apply(this,arguments)
    }
    oojs.extend(HeadPanel,GamePanel,{
        attr:{
            
        },
        init:function () {
            console.log('head',this)
            this.callParent('init');
        },
        rendUI:function () {
            this.callParent('rendUI');

        },
        bindUI:function () {
            // this.callParent('bindUI');

        }
    })

    function FootPanel() {
        GamePanel.apply(this,arguments)
    }
    oojs.extend(FootPanel,GamePanel,{
        attr:{

        },
        init:function () {
            console.log('foot',this)

            this.callParent('init');
        },
        rendUI:function () {
            this.callParent('rendUI');

        },
        bindUI:function () {
            // this.callParent('bindUI');

        }
    })

    return {
        GamePanel:GamePanel,
        HeadPanel:HeadPanel,
        FootPanel:FootPanel
    }
})