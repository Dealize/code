require(['FFF','areaData','employeeData'],function(FFF,areaData,employeeData){
    var $generateBtn = $('.generateBtn'),
        $container = $('.container'),
        $remainNum = $('.remainNum');
        areaData = areaData,
        employeeData = employeeData,
        selectedEmployee = [],
        tempEmployeeData = employeeData.concat(),
        generateNum = 0;

    init();
    bindEvent();


    function init(){
        console.log(areaData);
    }
    function bindEvent(){
        $generateBtn.on('click',function(e){
            generateArea();
        })
    }

    function generateArea() {
        if(generateNum>=36){
            alert('生成结束');
            return;
        }
        var currentArea = areaData[parseInt(Math.random() * areaData.length)];
        if(currentArea.areaData.length==0){
            generateArea();
        }else{
            var _currentIndex = parseInt(Math.random()* currentArea.areaData.length)
            var currentAreaData = currentArea.areaData[_currentIndex];
            generateEmployee();
            console.log(currentArea,currentAreaData,selectedEmployee);
            var _dom = $('<li>' +
                currentArea.streetName +
                '<span class="splitSpan">|</span>'+
                currentAreaData.areaName +
                '随机分配的人员为：' +
                '<span class="splitSpan">|</span>'+
                selectedEmployee[0].name+', ' +
                selectedEmployee[1].name+
                '</li>')
            $container.prepend(_dom);
            selectedEmployee = [];
            currentArea.areaData.splice(_currentIndex,1);
            generateNum++;
            $remainNum.html(36-generateNum);
        }

        // console.log(currentAreaData);
    }
    function generateEmployee(){
        if(selectedEmployee.length==2){
            tempEmployeeData = employeeData.concat();
            // selectedEmployee = [];
            return ;
        }
        var _employeeArr = tempEmployeeData;
        var _currentIndex = parseInt(Math.random()*_employeeArr.length)
        var selectedOne = _employeeArr[_currentIndex];
        selectedEmployee.push(selectedOne);
        _employeeArr.splice(_currentIndex,1);
        generateEmployee();
    }
})