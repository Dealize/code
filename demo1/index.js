require.config({
    paths:{
        'oojs':'../oojs/oojs',
        'Base':'../oojs/Base',
        'language':'../oojs/language',
        'Widget':'../oojs/Widget',
        'Plugin':'../oojs/Plugin'
    }
})

require(['oojs'],function (oojs) {
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
        init:function () {
            console.log('this is init',this);
        },
        renderUI:function () {
            console.log(666)
        },
        bindUI: function () {
            this.on('aaa', function (e) {
                console.log(123);
            })
        }
    })





    function CirculeDiv(){
        DragDiv.apply(this,arguments);
    }
    oojs.language.extend(CirculeDiv,DragDiv,{
        attr:{
            type:'circule'
        },
        boundingBox:$('<div class="circule"></div>'),
        init: function () {

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
            this.attr.aaa = cfg.desc;
            this.cfg = cfg.desc;
            this.dong = 'tao';

        },
        renderUI: function () {

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
        init: function () {
        },
        renderUI: function () {

        }

    })


    //var a = new DragDiv().render({
    //    container:$('body')
    //})

    //var circuleDiv = new CirculeDiv().render({
    //    container:$('.rightContainer')
    //})
    var squareDiv = new SquareDiv({
        desc:'qqqqqq'
    }).render({
        container:$('.rightContainer')
    })
    //var oblongDiv = new OblongDiv().render({
    //    container:$('.rightContainer')
    //})
    var oblongDiv2 = new SquareDiv({
        desc:'qweqwe'
    }).render({
        container:$('.leftContainer')
    })

    oblongDiv2.plugins['dong'] = 'name'
    //console.log(DragDiv,a);

})