define(['oojs','CBody','CDiv'], function (oojs,CBody,CDiv) {
    var CBody = CBody.CBody,
        CDiv = CDiv.CDiv,
        tap = oojs.language.tap;

    function MyCBody() {
        CBody.apply(this, arguments);
    }

    oojs.extend(MyCBody, CBody, {
        attr: {
        },
        init: function () {
            this.callParent('init');
        },
        renderUI:function () {
            this.boxNode = new CDiv({
                css:{
                    width:100,
                    height:100,
                    left:100,
                    top:100,
                    backgroundColor:'green'
                },
                zindex:0,
                context:this.context
            })
            this.appendChild(this.boxNode);
        },
        bindUI:function () {
            this.on(tap.tap,function (data) {
                // console.log(data.type)
            })

        },

    })

    return {
        MyCBody: MyCBody
    }
})
