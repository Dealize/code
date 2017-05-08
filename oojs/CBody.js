define(['oojs','CBase'], function (oojs,cBase) {
    var CBase = cBase.CBase,
        cUtil = cBase.util,
        tap = oojs.language.tap;

    function CBody() {
        CBase.apply(this, arguments);
    }

    oojs.extend(CBody, CBase, {
        attr: {
            canvas:null
        },
        init: function () {
            this.context = this.canvas.getContext('2d');
            this._bindEvent();
            this.renderUI();
            this.bindUI();
            this.syncUI();
        },
        _bindEvent:function () {
            var that = this;
            for(var i in tap){
                console.log(tap[i]);
                (function (event) {
                    that.canvas.addEventListener(event,function (e) {
                        that.touches = cUtil.getTouchPosition(e);
                        that.trigger(event,e)
                        that.triggerNodeEvent(event,e);
                    })
                })(tap[i])

            }
        },
        render:function () {
            this._render();
            return this;
        },
        renderUI:function () {},
        bindUI:function () {},
        syncUI:function () {}


    })

    return {
        CBody: CBody
    }
})

