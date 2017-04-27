


self.onmessage = function (e) {
    switch (e.data.type){
        case 'merget_coverageData':
            merge_cover_to_result(e.data.data);
            break;
        case 'sperate_coverageData_from_imgData':
            split_result_to_cover(e.data.data);
            break;
    }

}
/**
 * 把图层数据合并成最终的合成数据
 * @param arg
 * arg{
 * coverageImgDataList:arr,
 * finalImgData:imgData
 * }
 */
function merge_cover_to_result(arg){
    var rgbaData = {} ,
        coverageImgDataList = arg.coverageImgDataList,
        currentIndex = coverageImgDataList.length-1,
        finalImgData = arg.finalImgData.data,
        pxNum = finalImgData.length/4;
    for(var i=0;i<= pxNum;i++) {
        get_notLucencypx_from_position(i,currentIndex);
        finalImgData[i*4] = rgbaData.data[0];
        finalImgData[i*4+1] = rgbaData.data[1];
        finalImgData[i*4+2] = rgbaData.data[2];
        finalImgData[i*4+3] = rgbaData.data[3];
    }

    /**
     * 多个图层叠加在一起，针对于某个点，有可能上层图层的该点是透明的。
     * 这个方法的作用是 对于某个像素点，获取到图层叠加后该点的最终色值
     * @param pxNum
     * @param currentIndex
     */
    function get_notLucencypx_from_position(pxNum,currentIndex){
        var currentData = coverageImgDataList[currentIndex].imgData.data;
        //判断该点透明度，如果为透明的话 则遍历进去找下一个图层该点的透明度
        if(currentData[pxNum*4+3]==0){
            currentIndex -- ;
            if(currentIndex<0){
                rgbaData.currentIndex = currentIndex;
                rgbaData.data = [
                    currentData[pxNum*4],
                    currentData[pxNum*4+1],
                    currentData[pxNum*4+2],
                    currentData[pxNum*4+3],
                ]
            }else{
                get_notLucencypx_from_position(pxNum,currentIndex);
            }
        }else{
            rgbaData.currentIndex = currentIndex;
            rgbaData.data = [
                currentData[pxNum*4],
                currentData[pxNum*4+1],
                currentData[pxNum*4+2],
                currentData[pxNum*4+3],
            ]
        }
    }
}

/**
 * 把合成数据（也是canvas的实时数据）拆分成图层数据
 * 由于在canvas上操作，始终是在操作最后1个图层的数据，其他图层的数据并没有发生变化
 * 所以这个方法的作用是： canvas数据与（前几个图层的合并数据）进行比对，求出最后一个图层的数据
 * @param arg
 * tempImgData:tempImgData,
 * imgData:imgData,
 * coverageImgDataList:list
 */
function split_result_to_cover(arg){
    var others_imgData_list = [],
        imgData_list = arg.coverageImgDataList,
        tempImgData = arg.tempImgData.data,
        canvasData = arg.imgData.data
        pxNum = tempImgData.length/4,
        last_coverageImgData = imgData_list[imgData_list.length-1].imgData.data;

    get_others_imgData();

    /**
     * 获取除去最后1个图层以外的其他图层合成数据。
     */
    function get_others_imgData(){
        //获取除去最后1个图层以外的其他图层数组。
        if(imgData_list.length>=2){
            for(var i=0;i<imgData_list.length-1;i++){
                others_imgData_list.push(imgData_list[i]);
            }
            merge_cover_to_result({
                finalImgData:arg.tempImgData,
                coverageImgDataList:imgData_list
            })
            get_resultImgData();

        }else{
            others_imgData_list = [arg.imgData];
            for(var i=0 ;i<pxNum;i++){
                last_coverageImgData[i*4] = canvasData[i*4];
                last_coverageImgData[i*4+1] = canvasData[i*4+1];
                last_coverageImgData[i*4+2] = canvasData[i*4+2];
                last_coverageImgData[i*4+3] = canvasData[i*4+3];
            }
        }

    }

    /**
     * 通过canvasData与上面的合成数据进行比对，求出最后1个图层的数据
     */
    function get_resultImgData(){
        for(var i=0;i<pxNum;i++){
            if(canvasData[i*4]!=tempImgData[i*4] ||
                canvasData[i*4+1]!=tempImgData[i*4+1] ||
                canvasData[i*4+2]!=tempImgData[i*4+2] ||
                canvasData[i*4+3]!=tempImgData[i*4+3]
            ){
                last_coverageImgData[i*4] = canvasData[i*4];
                last_coverageImgData[i*4+1] = canvasData[i*4+1];
                last_coverageImgData[i*4+2] = canvasData[i*4+2];
                last_coverageImgData[i*4+3] = canvasData[i*4+3];
            }else{
                //如果canvasData和合并后的ImgData在某点的色值一样的话，会有两种情况
                // 1.最后一个图层中 这个点是透明的   不进行操作
                //2. 最后一个图层中，这个点本身就跟合并后图层的点色值是一样的   进行赋值操作
                if(last_coverageImgData[i*4+3]==0){

                }else{
                    last_coverageImgData[i*4] = canvasData[i*4];
                    last_coverageImgData[i*4+1] = canvasData[i*4+1];
                    last_coverageImgData[i*4+2] = canvasData[i*4+2];
                    last_coverageImgData[i*4+3] = canvasData[i*4+3];
                }
            }
        }
    }
    self.postMessage({
        type:'split_result_to_cover',
        status:'success',
        data:arg
    });
}