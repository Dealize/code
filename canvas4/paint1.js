require.config({
    paths:{
        'oojs':'../oojs/oojs',
        'Base':'../oojs/Base',
        'language':'../oojs/language',
        'Widget':'../oojs/Widget',
        'Plugin':'../oojs/Plugin',
        'jquery':'../oojs/jquery',
        'CManager':'./CManager',
        'CWidget':'./CWidget',
        'CDiv':'./CDiv',
    }
})
require(['CManager'],function(CManager){


  var app = new CManager.CManager({canvas:$('#paint')[0]})


  console.log(app);
})
