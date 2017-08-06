define([],function () {
    function tap(){
        var tapObj = {}
        if(['ontouchend']in document){
            tapObj.tapStart = 'touchstart';
            tapObj.tapMove = 'touchmove';
            tapObj.tapEnd = 'touchend';
            tapObj.tap = 'touchstart';
        }else{
            tapObj.tapStart = 'mousedown';
            tapObj.tapMove = 'mousemove';
            tapObj.tapEnd = 'mouseup';
            tapObj.tap = 'click';
        }
        return tapObj;
    }
    return tap()
})