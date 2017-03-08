define(['oojs'], function (oojs) {
    var Base = oojs.Base,
        Widget = oojs.Widget;
    function DragDiv(){
        Widget.apply(this,arguments)
    }
    oojs.language.extend(DragDiv,Widget,{
        attr:{
            name:'123',
            type:'',
        },
        boundingBox:$('<div class="">123</div>'),
        init:function (cfg) {
            this._cfg = cfg;
        },
        renderUI:function () {
        },
        bindUI: function () {
            var that = this;
            var mouseX,mouseY,objX,objY;
            var dragging = false;
            this.boundingBox.css({
                'left':'0px',
                'top':'0px'
            })
            this.boundingBox.bind(oojs.language.tap.tapStart,function (e) {
                dragging = true;
                this.style.position = 'relative';
                mouseX = e.clientX;
                mouseY = e.clientY;
                objX = parseInt(this.style.left);
                objY = parseInt(this.style.top);
            })
            this.boundingBox.bind(oojs.language.tap.tapMove, function (e) {
                if(that._cfg && that._cfg.dragToggle==false){
                    dragging = false;
                }
                if(dragging){
                    this.style.left = parseInt(e.clientX-mouseX+objX)+ 'px';
                    this.style.top = parseInt(e.clientY-mouseY+objY)+ 'px';
                }
            })
            this.boundingBox.bind(oojs.language.tap.tapEnd,function(e){
                dragging = false;
                that.trigger('dragged',{e:e,target:that});
            })
        },
    })


    function CirculeDiv(){
        DragDiv.apply(this,arguments);
    }
    oojs.language.extend(CirculeDiv,DragDiv,{
        attr:{
            type:'circule'
        },
        boundingBox:$('<div class="circule"></div>'),
        init: function (cfg) {
            this.callParent('init',cfg);
        },
        renderUI: function () {

        }

    })
    function SquareDiv(){
        DragDiv.apply(this,arguments);
    }
    oojs.language.extend(SquareDiv,DragDiv,{
        attr:{
            type:'square'
        },
        boundingBox:$('<div class="square"></div>'),
        init: function (cfg) {
            this.callParent('init',cfg);
        },
        renderUI: function () {

        },
        bindUI: function () {
            //this.callParent('bindUI');
        }

    })
    function OblongDiv(){
        DragDiv.apply(this,arguments);
    }
    oojs.language.extend(OblongDiv,DragDiv,{
        attr:{
            type:'oblong'
        },
        boundingBox:$('<div class="oblong"></div>'),
        init: function (cfg) {
            this.callParent('init',cfg);
        },
        renderUI: function () {

        }

    })


    return {
        DragDiv:DragDiv,
        CirculeDiv:CirculeDiv,
        SquareDiv:SquareDiv,
        OblongDiv:OblongDiv
    }
})