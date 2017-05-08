define(['oojs','CNode'], function (oojs,CNode) {
    var Base = oojs.Base,
        CNode = CNode.CNode,
        tap = oojs.language.tap;

    function CDiv() {
        CNode.apply(this, arguments);
    }

    oojs.extend(CDiv, CNode, {
        attr: {
        },
        init: function () {
            this.callParent('init');
        },
        bindUI:function () {
            this.on(tap.tap,function (e) {
                console.warn(666);
            })
        },
        draw:function () {
            this.callParent('draw');
            this.context.fillRect(this.css.left,this.css.top,this.css.width,this.css.height);
        },

    })

    return {
        CDiv: CDiv
    }
})
