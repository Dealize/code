define(['FFF','tap','fnWidget','util','colorPickerWidget'],function (FFF,tap,fnWidget,util,colorPickerWidget) {
    var F = FFF.FFF,
        Base = F.Base,
        Widget = F.Widget,
        FnDetail = fnWidget.FnDetail,
        fnPanel = fnWidget.FnPanel;

    function ColorWidgetPanel(){
        fnPanel.apply(this,arguments)
    }
    ColorWidgetPanel.ATTRS = {
        boundingBox:{
            value:$('<div class="P_colorPanel">' +
                '<span>基本颜色</span>' +
                '<ul class="P_panel_item P_colorPanel_ul"></ul>' +
                '<span>更多颜色</span>' +
                '<div class="P_colorPicker"></div>' +
                '</div>')
        },
        currentColor:{
            value:''
        }
    }
    F.extend(ColorWidgetPanel,fnPanel,{
        initialize:function () {
            this._colorList = [
                '#000','#7F7F7F','#880015','#ED1C24','#AD1D23',
                '#FF7F27','#FFF200','#22B124','#00A2E8','#3F48CC',
                '#A348A4'
            ]
        },
        renderUI:function () {
            this._getDom();
            this._renderBind_baseColor();
            this._renderBind_colorPicker();
        },
        bindUI:function () {
            var that = this;
            this.on('currentColorChange',function (data) {
                console.log(data.value);
                F.app.trigger('updateContextConfig',{
                    fillStyle:data.value,
                    lineStyle:data.value,
                    strokeStyle:data.value
                })
                that._$$colorLi.each(function (index,item) {
                    _item = $(item);
                    if(_item.css('background-color') == data.value){
                        $(item).addClass('active');
                    }else{
                        $(item).removeClass('active');
                    }
                })
            })
        },
        syncUI:function () {
            this.setCurrentColor(this._$$colorLi[5].style.backgroundColor)
            // this.setCurrentColor('rgb(0,0,0)');
        },
        _getDom:function () {
            this._$$colorUl = this.boundingBox.find('.P_colorPanel_ul');
            this._$$colorPicker = this.boundingBox.find('.P_colorPicker');
        },
        _renderBind_baseColor:function () {
            var domStr = '',
                that = this;
            this._colorList.forEach(function (item,index) {
                domStr += '<li style="background-color:'+item+' "></li>'
            })
            this._$$colorUl.append(domStr);
            this._$$colorLi = this._$$colorUl.find('li');
            this._$$colorUl.on(tap.tap,'li',function (e) {
                that.setCurrentColor($(this).css('background-color'));
                that._colorPicker.setColor($(this).css('background-color'));
            })
        },
        _renderBind_colorPicker:function () {
            var that = this;
            this._colorPicker = new colorPickerWidget.ColorPickerWidget({
                // width:,
                // height:,
            }).render({
                container:this._$$colorPicker
            })
            this._colorPicker.on('colorChange',function (data) {
                console.log('--------------------',data);
                that.setCurrentColor(data.value);
            });
            // this._colorPicker.setShow(true||false);
        }
    })


    return {
        ColorWidgetPanel:ColorWidgetPanel,
    }
})