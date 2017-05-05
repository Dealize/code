define(['oojs','CWidget'], function (oojs,CWidget) {
    var Base = oojs.Base,
        CWidget = CWidget.CWidget,
        tap = oojs.language.tap;

    function CDiv() {
        CWidget.apply(this, arguments);
    }

    oojs.extend(CDiv, CWidget, {
        attr: {
        },
        init: function () {
        },
        drawUI:function(e){

        },
        bindUI: function (e) {
            switch (e.triggerType){
                case tap.tap:
                    break;
                case tap.tapStart:
                    this._tapStartEvent(e);
                    break;
                case tap.tapMove:
                    this._tapMove(e);
                    break;
                case tap.tapEnd:
                    this._tapEnd(e);
                    break;
            }
        },
        _tapStartEvent:function (e) {
            this.dragToggle = true;
            this.disPosition = {
                x:e.fixedX - this.css.left,
                y:e.fixedY - this.css.top
            }
        },
        _tapMove:function (e) {
            if(!this.dragToggle){
                return;
            }
            this.css.left = e.fixedX-this.disPosition.x;
            this.css.top = e.fixedY-this.disPosition.y;
            this.drawUI(e);
        },
        _tapEnd:function (e) {
            this.dragToggle = false;
        },


    })

    return {
        CDiv: CDiv
    }
})
