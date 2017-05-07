define(['oojs'], function (oojs) {
    var Base = oojs.Base,
        tap = oojs.language.tap;

    function CBase() {
        CBase.apply(this, arguments);
    }

    oojs.extend(CBase, Base, {
        attr: {
            zIndex:0,
            childNodes:[],
            parentNode:null,
        },
        init: function () {
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
        checkPointIsInArea:function (point,area) {
            
        },
        triggerNodeEvent:function (e) {
            var that = this;
            this.childNodes.forEach(function (item,index) {
                if(that.checkPointIsInArea(e,item.area)){

                }
            })
        },



        render:function () {
        },
        addEventListender:function (event,callback) {

        }

    })

    function CUtil() {
        var util = {
            checkPointIsInArea:function (point,area) {

            },

        };
        return util;
    }
    return {
        CBase: CBase,
        CUtil: CUtil
    }
})
