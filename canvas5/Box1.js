define(['oojs','CNode','CBase'], function (oojs,CNode,CBase) {
    var CNode = CNode.CNode,
        tap = oojs.language.tap;

    function Box1() {
        CNode.apply(this, arguments);
    }

    oojs.extend(Box1, CNode, {
        attr: {
        },
        init: function () {
            this.callParent('init');
        },
        bindUI:function () {
            var that = this;
            this.on(tap.tapMove,function (e) {
                if(that.canMove){
                    that._checkSelfIsInOtherNode();
                }
            });
            this.on(tap.tap,function (e) {
            })
            this.on('isInOtherNode',function (data) {
                that.parentNode.trigger('nodeIsInOtherNode',{
                    fromNode:that,
                    targetNode:data.targetNode,
                    firstTierIndex:data.index,
                    secondTierIndex:data.i
                })
            })
        },
        draw:function () {
            this.callParent('draw');
        },
        _checkSelfIsInOtherNode:function () {
            var that = this;
            var _nodeList = this.parentNode.childNodes;
            _nodeList.forEach(function (sameIndexNodes,index) {
                sameIndexNodes.forEach(function(item,i){
                    if(item != that){
                        if(CBase.util.checkPointIsInArea({
                                x:that.areaPoint.x1,
                                y:that.areaPoint.y1
                            },item)){
                            console.log('节点移动完毕');
                            that.trigger('isInOtherNode',{
                                firstTierIndex:index,  //tier 层级
                                secondTierIndex:i,
                                targetNode:item
                            });
                        };
                    }
                })
            })
        }
    })

    return {
        Box1: Box1
    }
})
