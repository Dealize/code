self.onmessage = function (e) {
    console.log(e);
    switch (e.data.type){
        case 'merget_coverageData':
            merge_coverageData_to_imgData(e.data.data);
            break;
    }
    self.postMessage({
        type:'merget_coverageData',
        status:'success'
    });
}

function sperate_coverageData_from_imgData(arg){
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
    console.log(111);
    var coverageImgDataList = arg.coverageImgDataList,
        listLength = coverageImgDataList.length,
        finalImgData = arg.finalImgData.data,
        pxNum = finalImgData.length/4,
        currentIndex = listLength - 1,
        currentCoverImgData,
        _rgbaData = {},
        lastCoverageImgData = coverageImgDataList[listLength-1];

    for(var i=0;i<pxNum;i++){
        // var _rgbaData = get_notlucencypx_from_coverageData(i,currentIndex);
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

}