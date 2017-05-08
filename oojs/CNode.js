define(['oojs','CBase'], function (oojs,CBase) {
    var CBase = CBase.CBase,
        tap = oojs.language.tap;

    function CNode() {
        CBase.apply(this, arguments);
    }

    oojs.extend(CNode, CBase, {
        attr: {
            css:{
                width:0,
                height:0,
                left:0,
                top:0,
                color:'',
                backgroundColor:'',
                borderColor:'',
                textAlign:'',
            },
            areaPoint:{},
            zIndex:0,
            childNodes:[],
            parentNode:null,
            context:null
        },
        init: function () {
            this._generateAreaPoint();
            this.bindUI();
        },
        _generateAreaPoint:function () {
            var areaPoint = {};
            areaPoint.x1 = parseInt(this.css.left);
            areaPoint.y1 = parseInt(this.css.top);
            areaPoint.x2 = parseInt(this.css.left) + parseInt(this.css.width);
            areaPoint.y2 = parseInt(this.css.top) + parseInt(this.css.height);
            this.setData({
                areaPoint:areaPoint
            })
        },
        draw:function () {
            this.context.fillStyle = this.css.backgroundColor;
            this.context.strokeStyle = this.css.borderColor;

        },
        render:function () {
            this.draw();
            this._render();
            return this;
        },
        addEventListender:function (event,callback) {

        }

    })

    return {
        CNode: CNode
    }
})
