require.config({
    paths:{
        paint:'paint'
    }
})
require(['paint','draggableRect'],function (paint,draggableRect) {

    var DraggableRect = draggableRect.DraggableRect;

    var myPaint = new paint.Paint({
        width:'600',
        height:'400',
        canvas:$('#paint1')[0]
        // className:'class1'
    });

    var yellowRect = new DraggableRect({
        color:'darkorange',
        x:410,
        y:150,
        zIndex:2
    });
    var blueRect = new DraggableRect({
        color:'blue',
        x:200,
        y:100,
        isDrag:false
    });
    var redRect = new DraggableRect({
        color:'red',
        x:20,
        y:100,
    });



    blueRect.addEventListener('loaded',function () {
        //console.log('方块渲染完成');
    })
    blueRect.addEventListener('click',function () {
        // alert('点击了我');
    })
    blueRect.addEventListener('dragEnd',function () {
        var hitRect = blueRect.getHitRect();
        if(hitRect){
            var _parentNode = blueRect.parentNode;
            _parentNode.removeChild(blueRect);
            hitRect.appendChild(blueRect);
        }
    })
    redRect.addEventListener('mouseup',function () {
        console.log(redRect.children);
    })




    myPaint.addElement(blueRect);
    myPaint.addElement(redRect);
    myPaint.addElement(yellowRect);


    myPaint.draw();
})

