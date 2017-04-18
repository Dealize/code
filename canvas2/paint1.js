require.config({
    paths:{
        'oojs':'../oojs/oojs',
        'Base':'../oojs/Base',
        'language':'../oojs/language',
        'Widget':'../oojs/Widget',
        'Plugin':'../oojs/Plugin',
        'jquery':'../oojs/jquery',
        'app':'./app'
    }
})
require(['app'],function(app){
  // function init(){
  //   var canvasWidth = screen.width,
  //   canvasHeight = screen.height-$('.toolBar').height();
  //   $('canvas').attr({
  //       'width':canvasWidth,
  //       'height':canvasHeight
  //   })
  // }
  // init();

  var app = new app.App({
    boundingBox:$('body')
  }).render()
  console.log(app);
})
