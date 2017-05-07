require.config({
    paths:{
        'oojs':'../oojs/oojs',
        'Base':'../oojs/Base',
        'language':'../oojs/language',
        'Widget':'../oojs/Widget',
        'Plugin':'../oojs/Plugin',
        'jquery':'../oojs/jquery',
        'CNode':'../oojs/cNode',
        'CBody':'../oojs/CBody',
        'CDiv':'./CDiv'
    }
})
require(['CDiv'],function(CDiv){

    // console.log(CDiv);
  // var app = new CManager.CManager({canvas:$('#paint')[0]})
  //   var cDiv = new CDiv.CDiv({
  //       css:{
  //           width:100,
  //           height:100,
  //           left:50,
  //           top:50,
  //           backgroundColor:'red'
  //       },
  //       context:document.querySelector('canvas').getContext('2d')
  //   }).render();
  //
  //   cDiv.addEventListender('click',function (e) {
  //       console.log(123);
  //   })

  console.log(cDiv);
})
