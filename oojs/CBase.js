define(['oojs'], function (oojs) {
    var Base = oojs.Base,
        tap = oojs.language.tap;

    function CBase() {
        Base.apply(this, arguments);
    }

    oojs.extend(CBase, Base, {
        attr: {
            zIndex:0,
            childNodes:[],
            parentNode:null,
        },
        init: function () {
            this.bindUI()
        },
        appendChild:function (childNode) {
            var childZindex = childNode.zIndex || 0,
            currentZindexChildNodeList = this.childNodes[childZindex] || [];
            currentZindexChildNodeList.push(childNode);
            this.childNodes[childZindex] = currentZindexChildNodeList;
            this.setData({
                childNodes:this.childNodes
            })
        },
        triggerNodeEvent:function (event,e) {
            var that = this;
            this.childNodes.forEach(function (childNode,index) {
                childNode.forEach(function (grandChild,i) {
                    if(util().checkPointIsInArea(that.touches,grandChild)){
                        grandChild.trigger(event,e)
                    }
                })
            })
        },
        _render:function () {
            this.childNodes.forEach(function (childNode,index) {
                childNode.forEach(function (grandChild,i) {
                    if(grandChild.childNodes.length==0){
                        grandChild.draw();
                    }else{
                        grandChild.render();
                    }
                })
            })
        },


        bindUI:function () {

        },
        render:function () {
        },
        addEventListender:function (event,callback) {

        }

    })

    function util() {
        var util = {
            checkPointIsInArea:function (point,area) {
                if(point.x<area.areaPoint.x1 || point.x>area.areaPoint.x2 || point.y<area.areaPoint.y1 ||point.y>area.areaPoint.y2){
                    return false;
                }else{
                    return true;
                }

                // if( point.x2 < area.areaPoint.x1 ||
                //     point.x1 > area.areaPoint.x2 ||
                //     point.y2 < area.areaPoint.y1 ||
                //     point.y1 > area.areaPoint.y2
                // ){
                //     return true;
                // }else{
                //     return false;
                //
                // }
            },
            getTouchPosition: function (e, type) {
                var position = {};
                var canvasOffset = $(e.target).offset();
                if (tap.tap == 'touchend') {
                    switch (type) {
                        case 'offset':
                            position.x = e.touches[0].offsetX - canvasOffset.left;
                            position.y = e.touches[0].offsetY - canvasOffset.top;
                        case 'client':
                        default:
                            position.x = e.touches[0].clientX - canvasOffset.left;
                            position.y = e.touches[0].clientY - canvasOffset.top;
                            break;
                    }
                } else {
                    switch (type) {
                        case 'offset':
                            position.x = e.offsetX - canvasOffset.left;
                            position.y = e.offsetY - canvasOffset.top;
                        case 'client':
                        default:
                            position.x = e.clientX - canvasOffset.left;
                            position.y = e.clientY - canvasOffset.top;
                            break;
                    }
                }
                return position;
            },
        };
        return util;
    }
    return {
        CBase: CBase,
        util: util()
    }
})
