var areaData = [
    {
        streetName:'长征街道',
        randomIndex:1,
        areaData:[
            {
                areaName:'黄土岘、利民市场',
                residenceNum:27,
                randomIndex:1
            },
            {
                areaName:'化工厂、冯园',
                residenceNum:34,
                randomIndex:2
            },
            {
                areaName:'宝积路、大桥路、火车站 大水头、宝矿',
                residenceNum:38,
                randomIndex:3
            },
            {
                areaName:'大水头、宝矿',
                residenceNum:35,
                randomIndex:3
            }
        ]
    },
    {
        streetName:'兴平街道办',
        randomIndex:1,
        areaData:[
            {
                areaName:'育才路、文化巷',
                residenceNum:33,
                randomIndex:4
            },
            {
                areaName:'向阳路、陶瓷路',
                residenceNum:26,
                randomIndex:5
            },
            {
                areaName:'兴平西路、兴平北路',
                residenceNum:40,
                randomIndex:6
            },
            {
                areaName:'兴平东路、兴平南路',
                residenceNum:35,
                randomIndex:7
            },
            {
                areaName:'农委巷、兴平东路',
                residenceNum:32,
                randomIndex:8
            },
            {
                areaName:'长征西路、五处路口',
                residenceNum:29,
                randomIndex:9
            },
            {
                areaName:'人民广场、复兴路',
                residenceNum:38,
                randomIndex:10
            }
        ]
    },
    {
        streetName:'电力路街道办',
        randomIndex:3,
        areaData:[
            {
                areaName:'兴隆小区、水电二处',
                residenceNum:29,
                randomIndex:1
            },
            {
                areaName:'乐雅路、花苑小区',
                residenceNum:28,
                randomIndex:2
            },
            {
                areaName:'电力路、电厂',
                residenceNum:34,
                randomIndex:3
            },
            {
                areaName:'中区、润景园',
                residenceNum:30,
                randomIndex:3
            }
        ]
    },
    {
        streetName:'宝积乡',
        randomIndex:4,
        areaData:[
            {
                areaName:'平塘路、墩墩滩',
                residenceNum:38,
                randomIndex:1
            },
            {
                areaName:'水沟沿、响泉',
                residenceNum:36,
                randomIndex:2
            },
            {
                areaName:'魏矿',
                residenceNum:37,
                randomIndex:3
            },
            {
                areaName:'吊沟、老庄',
                residenceNum:26,
                randomIndex:3
            },
            {
                areaName:'小水村、毛卜拉',
                residenceNum:28,
                randomIndex:3
            }
        ]
    },
    {
        streetName:'水泉镇',
        randomIndex:5,
        areaData:[
            {
                areaName:'五级街、旱平川村',
                residenceNum:39,
                randomIndex:1
            },
            {
                areaName:'五级街、枣园、贾庄',
                residenceNum:35,
                randomIndex:2
            },
            {
                areaName:'109线、陡城村',
                residenceNum:37,
                randomIndex:3
            },
            {
                areaName:'109线右侧、水泉村',
                residenceNum:34,
                randomIndex:3
            },
            {
                areaName:'109线左侧、玉碗泉村、中村、下村',
                residenceNum:36,
                randomIndex:3
            }

        ]
    },
    {
        streetName:'红会镇',
        randomIndex:6,
        areaData:[
            {
                areaName:'红会一矿、大坝口',
                residenceNum:32,
                randomIndex:1
            },
            {
                areaName:'四矿、红旗山、5号井',
                residenceNum:32,
                randomIndex:2
            },
            {
                areaName:'打拉池、大坝口、兄弟村',
                residenceNum:32,
                randomIndex:3
            },
            {
                areaName:'旱桥、会通煤矿',
                residenceNum:27,
                randomIndex:3
            },
            {
                areaName:'大营水、海子滩、井口',
                residenceNum:30,
                randomIndex:3
            }
        ]
    },
    {
        streetName:'种田乡',
        randomIndex:7,
        areaData:[
            {
                areaName:'种田乡',
                residenceNum:24,
                randomIndex:1
            },
            {
                areaName:'复兴乡、黄峤焦口村',
                residenceNum:32,
                randomIndex:2
            },
            {
                areaName:'牛拜、马饮水',
                residenceNum:21,
                randomIndex:3
            },
            {
                areaName:'王家山上市场',
                residenceNum:28,
                randomIndex:3
            },
            {
                areaName:'王家山下市场',
                residenceNum:28,
                randomIndex:3
            },
            {
                areaName:'黄峤乡公路沿线、双铺',
                residenceNum:30,
                randomIndex:3
            }
        ]
    },
];
var employeeData = [
    {
        name:'刘应孝'
    },
    {
        name:'王斌'
    },
    {
        name:'王晓晴'
    },
    {
        name:'郭伟'
    },
    {
        name:'张升'
    },
    {
        name:'曹鹏'
    },
    {
        name:'许立涛'
    },
    {
        name:'张力文'
    },
    {
        name:'魏玲'
    },
    {
        name:'秦婧'
    },

];
var $generateBtn = $('.generateBtn'),
    $container = $('.container'),
    $remainNum = $('.remainNum');
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

