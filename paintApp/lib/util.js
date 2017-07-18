define(['tap'],function (tap) {
    function getTouchPosition(e,type) {
        var position = {};
        if(tap.tapEnd=='touchend'){
            switch(type){
                case 'offset':
                    position.x = e.originalEvent.touches[0].offsetX;
                    position.y = e.originalEvent.touches[0].offsetY;
                case 'client':
                default:
                    position.x = e.originalEvent.touches[0].clientX;
                    position.y = e.originalEvent.touches[0].clientY;
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

    }
    return {
        getTouchPosition:getTouchPosition
    }
})