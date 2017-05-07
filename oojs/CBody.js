define(['oojs','CNode'], function (oojs,CNode) {
    var Base = oojs.Base,
        tap = oojs.language.tap;

    function CBody() {
        CBody.apply(this, arguments);
    }

    oojs.extend(CBody, CNode, {
        attr: {
            canvas:null
        },
        init: function () {
            this.context = this.canvas.getContext('2d');
            this._bindEvent();
        },
        _bindEvent:function () {
            var that = this;
            for(var i in tap){
                this.canvas.on(i,function (e) {
                    CBody.trigger(i,e)
                    that._triggerNodeEvent(e);
                })
            }
        },


    })

    return {
        CBody: CBody
    }
})

