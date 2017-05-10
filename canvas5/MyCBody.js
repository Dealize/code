define(['oojs','CBody','Box1','CBase'], function (oojs,CBody,Box1,CBase) {
    var CBody = CBody.CBody,
        Box1 = Box1.Box1,
        util = CBase.util,
        tap = oojs.language.tap;

    function MyCBody() {
        CBody.apply(this, arguments);
    }

    oojs.extend(MyCBody, CBody, {
        attr: {
        },
        init: function () {
            this.callParent('init');
            this.boxNode1 = new Box1({
                css:{
                    width:100,
                    height:100,
                    left:100,
                    top:100,
                    backgroundColor:'green'
                },
                zIndex:0,
                context:this.context,
                container:this
            });
            this.boxNode2 = new Box1({
                css:{
                    width:300,
                    height:50,
                    left:150,
                    top:150,
                    backgroundColor:'red'
                },
                zIndex:0,
                context:this.context,
                container:this,
                canMove:false
            });
            this.appendChild(this.boxNode1);
            this.appendChild(this.boxNode2);
            console.log(this.childNodes)
        },
        renderUI:function () {


        },
        bindUI:function () {
            var that = this;
            this.on('nodeIsInOtherNode',function (data) {
                that.removeChild(data.fromNode);
                data.targetNode.appendChild(data.fromNode);
                data.targetNode.setData({
                    canMove:true
                })
            })

        },
        _checkNodeIsInArea:function (fromWidget,toWidget) {

        },

    })

    return {
        MyCBody: MyCBody
    }
})
