define(['FFF'],function (FFF) {
    var F = FFF.FFF,
        Widget = F.Widget;

    function aaa(){
        Widget.apply(this,arguments);
    }
    aaa.ATTRS = {
        boundingBox:{
            value:$('<div class="aaa"></div>')
        },
    }
    F.extend(aaa,Widget,{
        initialize:function () {
        },
        renderUI:function () {

        },
        bindUI:function () {
        },
        syncUI:function () {
        },
        destructor:function () {
        }
    })


    function Rect(){
        Widget.apply(this,arguments);
    }
    Rect.ATTRS = {
        boundingBox:{
            value:$('<div class="DC_layer"></div>')
        },
    }
    F.extend(Rect,Widget,{
        initialize:function () {
        },
        renderUI:function () {
            var a1 = new aaa().render({
                container:this.boundingBox
            })
        },
        bindUI:function () {
            this.boundingBox.on('touchstart',function (e) {
                console.log(e.originalEvent.touches[0]);
            })
        },
        syncUI:function () {
        },
        destructor:function () {
        }
    })





    return {
        Rect:Rect,
    }
})