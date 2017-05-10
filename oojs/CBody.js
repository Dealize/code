define(['oojs','CBase'], function (oojs,cBase) {
    var CBase = cBase.CBase,
        cUtil = cBase.util,
        tap = oojs.language.tap;

    function CBody() {
        CBase.apply(this, arguments);
    }

    oojs.extend(CBody, CBase, {
        attr: {
            canvas:null,
            width:0,
            height:0,
        },
        init: function () {
            this.context = this.canvas.getContext('2d');
            var _width = this.canvas.getAttribute('width'),
                _height = this.canvas.getAttribute('height');
            this.setData({
                width:_width,
                height:_height
            })
            this._bindEvent();
            this.renderUI();
            this.bindUI();
            this.syncUI();
        },
        _bindEvent:function () {
            var that = this;
            for(var i in tap){
                (function (event) {
                    that.canvas.addEventListener(event,function (e) {
                        that.touches = cUtil.getTouchPosition(e);
                        that.trigger(event,e)
                        that.triggerNodeEvent(event,e);
                    })
                })(tap[i])

            }
            this.on('redraw',function (data) {
                that.context.clearRect(0,0,that.width,that.height);
                that.render();
            })
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

