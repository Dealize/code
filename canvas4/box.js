define(['oojs','CWidget'], function (oojs,CWidget) {
    var Base = oojs.Base,
        CWidget = CWidget.CWidget,
        tap = oojs.language.tap;

    function Box() {
        CWidget.apply(this, arguments);
    }

    oojs.extend(Box, CWidget, {
        attr: {
        },
        init: function () {
            console.log(11)
            this.callParent('init');
        },
        drawUI:function(){
            console.log(21)

            this.callParent('drawUI');
        },
        bindUI: function () {
            console.log(31)

            this.callParent('bindUI');
        }
    })

    return {
        Box: Box
    }
})
