define(['oojs'],function(oojs){
  var Widget = oojs.Widget,
      tap = oojs.language.tap;

  function App(){
    Widget.apply(this,arguments);
  }
  oojs.extend(App,Widget,{
    attr:{
        toolBarShow:{
          value:true
        }
    },
    init:function(){
    },
    renderUI:function(){
      this.$canvas = this.boundingBox.find('canvas'),
      this.$toolBar = this.boundingBox.find('.toolBar');
      this.context = this.$canvas[0].getContext('2d');
      console.log(this.context);
    },
    bindUI:function(){
      var that = this;
      this._preventBodyDefault();
      this._bindToolBarEvent();
      this._bindCanvasEvent();
      this._controlToolBarShowHide();
    },
    syncUI:function(){

    },
    _bindToolBarEvent:function(){
      this.$toolBar.on(tap.tap,function(e){
          var target = e.target,
              targetType = target.className.split(' ')[0],
              targetColor = target.className.split(' ')[1];

          switch (targetType) {
            case 'setting':
              console.log('setting');
              break;
            case 'brush':
              console.log('brush');
              break;
            case 'text':
              console.log('text');
              break;
            case 'eraser':
              console.log('eraser');
              break;
            case 'color':
              console.log('color');
            default:
              break;
          }
          switch (targetColor) {
            case 'orange':

              break;
            default:

          }
      })
    },
    _bindCanvasEvent:function(){
        var that = this,
            startPosition = {},
            movingPosition = {},
            drawing = false;

        this.$canvas.on(tap.tapStart,function(e){
          drawing = true;

          startPosition = that._getTouchPosition(e,'client');
          that.context.strokeStyle = 'red';
          that.context.lineWidth = '5';
          that.context.beginPath();
          that.context.moveTo(startPosition.x,startPosition.y);
          // that.context.moveTo(startPosition.x+100,startPosition.y+100);
          console.log(startPosition);
        })
        this.$canvas.on(tap.tapMove,function(e){
          if(!drawing){
            return;
          }
          that.setData({
            'toolBarShow':false
          })
          movingPosition = that._getTouchPosition(e,'client');
          that.context.lineTo(movingPosition.x,movingPosition.y);
          that.context.stroke();
        })
        this.$canvas.on(tap.tapEnd,function(e){
          drawing = false;
          that.setData({
            'toolBarShow':true
          })
          that.context.closePath();
        })

    },
    _getTouchPosition:function(e,type){
      var position = {};
      if(tap.tap=='touchend'){
        switch(type){
          case 'offset':
              position.x = e.touches[0].offsetX;
              position.y = e.touches[0].offsetY;
          case 'client':
          default:
              position.x = e.touches[0].clientX;
              position.y = e.touches[0].clientY;
              break;
        }
      }else{
        switch(type){
          case 'offset':
              position.x = e.offsetX;
              position.y = e.offsetY;
          case 'client':
          default:
              position.x = e.clientX;
              position.y = e.clientY;
              break;
        }
      }
      return position;
    },
    _preventBodyDefault:function(){
      $('body').on(tap.tapStart,function(e){
        e.preventDefault();
      })
    },
    _controlToolBarShowHide:function(){
        var that = this;
        this.on('toolBarShowChange',function(data){
          if(data.value){
              that.$toolBar.show();
          }else{
              that.$toolBar.hide();
          }
        })
    },
    _selectTool:function(){

    }

  })
  return {
    App:App
  }
})
