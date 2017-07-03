define(['FFF','tap','fnWidget','util'],function (FFF,tap,fnWidget,util) {
    var F = FFF.FFF,
        Base = F.Base,
        Widget = F.Widget,
        FnDetail = fnWidget.FnDetail,
        fnPanel = fnWidget.FnPanel;

    function BasePicWidgetPanel(){
        fnPanel.apply(this,arguments)
    }
    BasePicWidgetPanel.ATTRS = {
        boundingBox:{
            value:$('<div class="P_basePicPanel">' +
                '<span>选择底图</span>' +
                '<ul class="P_basePicList"></ul>' +
                '</div>')
        },
        picList:{
            value:[
                {
                    title:'表情1',
                    src:'./imgs/1.jpeg'
                },{
                    title:'表情2',
                    src:'./imgs/2.jpeg'
                },{
                    title:'哆啦A梦',
                    src:'./imgs/3.jpg'
                },
            ]
        }
    }
    F.extend(BasePicWidgetPanel,fnPanel,{
        initialize:function () {
        },
        renderUI:function () {
            this._getDom();

            this._renderBind_pic();

        },
        bindUI:function () {
            var that = this;
            this.on('lineWidthChange',function (data) {
                F.app.trigger('updateContextConfig',{
                    lineWidth:parseInt(data.value)
                })
                that._$$degreeLi.each(function (index,item) {
                    if(item.dataset.index == data.value){
                        $(item).addClass('active');
                    }else{
                        $(item).removeClass('active');
                    }
                })
            })
        },
        syncUI:function () {
        },
        _getDom:function () {
            this._$$imgUl = this.boundingBox.find('.P_basePicList');
        },
        _renderBind_pic:function () {
            var domStr = '',
                that = this;
            console.log(that.picList.length);
            that.picList.forEach(function (item,index) {
                domStr += '<li data-index="'+index+'"><span>'+item.title+'</span><img src="'+item.src+'"/></li>';
            })
            this._$$imgUl.append(domStr);
            this._$$imgLi = this._$$imgUl.find('li');
            this._$$imgUl.on(tap.tap,'li',function (e) {
                var _index = this.dataset.index;
                F.app.trigger('drawImg',{
                    data:that.picList[_index]
                });
            })
        }
    })


    return {
        BasePicWidgetPanel:BasePicWidgetPanel,
    }
})