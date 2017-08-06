define(['FFF','tap','fnWidget','util'],function (FFF,tap,fnWidget,util) {
    var F = FFF.FFF,
        Base = F.Base,
        Widget = F.Widget,
        FnDetail = fnWidget.FnDetail,
        fnPanel = fnWidget.FnPanel;

    function FileWidgetPanel(){
        fnPanel.apply(this,arguments)
    }
    FileWidgetPanel.ATTRS = {
        boundingBox:{
            value:$('<div class="P_filterPanel">' +
                '<ul class="P_panel_item">' +
                '<li data-type="save">保存</li>' +
                '<li data-type="reset">重置</li>' +
                '</ul>' +
                '</div>')
        },
    }
    F.extend(FileWidgetPanel,fnPanel,{
        initialize:function () {
        },
        renderUI:function () {

        },
        bindUI:function () {
            var that = this;
            that._bind_originEvent();
            that.boundingBox.on(tap.tap,'li',function (e) {
                var _type = this.dataset.type;
                switch(_type){
                    case 'save':
                        that._save();
                        break;
                    case 'reset':
                        that._reset();
                        break;
                }

            })
        },
        syncUI:function () {
        },
        _reset:function () {
            var result = confirm('是否重置？');
            if(result){
                window.location.reload();
            }
        },
        _save:function () {
            var that = this;
            F.app.trigger('need_get_finalImgData');
        },
        _bind_originEvent:function () {
            var that = this;
            F.app.on('get_finalImgData',function (data) {
                console.log(data.data);
                F.app.trigger('setImgDataFilter',{
                    data:data
                })

                that._refresh_tempCanvas(data);
                that._save_img(data.canvas[0]);
            })

        },
        _refresh_tempCanvas:function (data) {
            console.log(data.data);
            var _context = data.canvas[0].getContext('2d');
            _context.putImageData(data.data,0,0);
        },
        _save_img:function (canvas) {
            var aLink = $('<a></a>'),
                base64Data = canvas.toDataURL('png');
            aLink.attr({
                href:base64Data,
                download:'img.png'
            })
            $('body').append(aLink);
            console.log(aLink);
            aLink[0].click();
        }
    })


    return {
        FileWidgetPanel:FileWidgetPanel,
    }
})