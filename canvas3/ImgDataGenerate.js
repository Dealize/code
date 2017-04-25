var finalImgDataList = [];


self.onmessage = function (e) {
    console.log(e);
    switch (e.data.type){
        case 'merget_coverageData':
            merge_coverageData_to_imgData(e.data.data);
            break;
        case 'sperate_coverageData_from_imgData':
            sperate_coverageData_from_imgData(e.data.data);
            break;
    }
    self.postMessage({
        type:e.data.type,
        status:'success',
        data:{
            finalImgDataList:finalImgDataList
        }
    });
}
/**
 * 把画布上的ImgData分离出来（其实也就是把从画布ImgData上把最后1个图层的ImgData给解析出来）
 * @param arg
 * arg {
 *  imgData,
 *  coverageImgDataList，
*   tempImgData,
 *  }
 */
function sperate_coverageData_from_imgData(arg){
    var _notFinallImgData = [],
        tempImgData = arg.tempImgData,
        lastCoverageImgData = arg.coverageImgDataList[arg.coverageImgDataList.length-1],
        lastData = lastCoverageImgData.imgData.data,
        canvasData= arg.imgData.data,
        pxNum = canvasData.length/4;
    if(get_notFinall_coverageImgDatas()==false){
        return;
    }
    //对每个像素进行像素点识别
    for(var i=0;i<=pxNum;i++){
        //如果canvas上的像素点跟合并后的图层像素点不同， 则lastData的像素点为canvasData上的点
        if(tempImgData[4*i]!=canvasData[4*i] || tempImgData[4*i+1]!=canvasData[4*i+1]
            || tempImgData[4*i+2]!=canvasData[4*i+2] || tempImgData[4*i+3]!=canvasData[4*i+3]
        ){
            lastData[4*i]=canvasData[4*i];
            lastData[4*i+1]=canvasData[4*i+1];
            lastData[4*i+2]=canvasData[4*i+2];
            lastData[4*i+3]=canvasData[4*i+3];
        }else{
            //canvasData 上的某个点 跟合并后图层的某个点相同的话 有两种情况
            //1. lastData上该点为透明，
            //2. lastData上该点为不透明。
            if(lastData[4*i+3]!=0){
                lastData[4*i] = tempImgData[4*i];
                lastData[4*i+1] = tempImgData[4*i+1];
                lastData[4*i+2] = tempImgData[4*i+2];
                lastData[4*i+3] = tempImgData[4*i+3];
            }
        }
    }
    finalImgDataList.splice(finalImgDataList.length-1,1,lastCoverageImgData);

    function get_notFinall_coverageImgDatas(){
        if(arg.coverageImgDataList.length==1) {
            for(var i=0;i<=pxNum;i++){
                arg.coverageImgDataList[0].imgData.data[i*4] = arg.imgData.data[i*4];
                arg.coverageImgDataList[0].imgData.data[i*4+1] = arg.imgData.data[i*4+1];
                arg.coverageImgDataList[0].imgData.data[i*4+2] = arg.imgData.data[i*4+2];
                arg.coverageImgDataList[0].imgData.data[i*4+3] = arg.imgData.data[i*4+3];
            }
            finalImgDataList = arg.coverageImgDataList;
            return false;
        }else if(arg.coverageImgDataList.length!=1){
            for(var i=0;i<arg.coverageImgDataList.length-1;i++){
                _notFinallImgData.push(arg.coverageImgDataList[i]);
            }
            return true;
        }

        merge_coverageData_to_imgData({
            coverageImgDataList:_notFinallImgData,
            finalImgData:tempImgData
        })

    }
}
/**
 * 合并所有图层的点。
 * @param arg
 * arg{
 *     finalImgData,
 *     coverageImgDataList
 * }
 */
function merge_coverageData_to_imgData(arg){
    var coverageImgDataList = arg.coverageImgDataList,
        listLength = coverageImgDataList.length,
        finalImgData = arg.finalImgData.data,
        pxNum = finalImgData.length/4,
        currentIndex = listLength - 1,
        currentCoverImgData,
        _rgbaData = {},
        lastCoverageImgData = coverageImgDataList[listLength-1];

    for(var i=0;i<=pxNum;i++){
        get_notlucencypx_from_coverageData(i,currentIndex);
        finalImgData[i*4] = _rgbaData.data[0];
        finalImgData[i*4+1] = _rgbaData.data[1];
        finalImgData[i*4+2] = _rgbaData.data[2];
        finalImgData[i*4+3] = _rgbaData.data[3];
    }
    /**
     * 获取某个像素位置的最终rgba
     * 如果当前图层上的这个像素点为透明的，那么递归到下一个图层去看该点是否透明
     * @param pxNum
     * @param currentIndex
     * @returns {{}}
     */
    function get_notlucencypx_from_coverageData(pxNum,currentIndex){
        var currentData = coverageImgDataList[currentIndex].imgData.data;
        if(currentData[pxNum*4+3]==0){
            currentIndex--;
            if(currentIndex<0){
                _rgbaData.currentIndex = currentIndex;
                _rgbaData.data = [
                    currentData[pxNum],
                    currentData[pxNum+1],
                    currentData[pxNum+2],
                    currentData[pxNum+3],
                ];
                return _rgbaData;
            }else{
                get_notlucencypx_from_coverageData(pxNum,currentIndex);
            }
        }else{
            _rgbaData.currentIndex = currentIndex;
            _rgbaData.data = [
                currentData[pxNum],
                currentData[pxNum+1],
                currentData[pxNum+2],
                currentData[pxNum+3],
            ];
            currentIndex = listLength - 1;
            return _rgbaData;
        }
    }
    finalImgDataList = arg.coverageImgDataList;
}