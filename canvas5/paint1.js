require.config({
    paths:{
        'oojs':'../oojs/oojs',
        'Base':'../oojs/Base',
        'language':'../oojs/language',
        'Widget':'../oojs/Widget',
        'Plugin':'../oojs/Plugin',
        'jquery':'../oojs/jquery',
        'CBase':'../oojs/CBase',
        'CNode':'../oojs/cNode',
        'CBody':'../oojs/CBody',

        'CDiv':'./CDiv',
        'MyCBody':'./MyCBody'
    }
})
require(['MyCBody'],function(MyCBody){
    var MyCBody = MyCBody.MyCBody;
    var app = new MyCBody({
        canvas:document.querySelector('canvas')
    }).render();

  console.log(app);
})
