/**
 * 版本规范,0.0.1 第一位迭代的版本，第二位线上修复的版本，第三位测试的版本
 * @type {string}
 */
window.version = '0.0.35';
console.log('版本号：', window.version);
$(function () {
    var $title = $("title");
    $title.html($title.html()+" 当前版本号 "+window.version)
})
window.debug = false;
requirejs.config({
    baseUrl: '.',
    paths: {
        app:'./index',
        areaData:'./areaData',
        employeeData:'./employeeData'
    },
    shim: {
        // vConsole: {
        //     exports: 'vConsole'
        // },
        // calendar: {
        //     exports: 'Calendar'
        // },
        // calendar_lang: {
        //     deps: ['calendar']
        // },
        // qrcode: {
        //     exports: 'qrcode',
        //     deps: ['jquery']
        // },
        // excel:{
        //     deps: ['jquery']
        // },
        // underscore:{
        //     exports:'_'
        // }
    },
    urlArgs: 'v=' + version
});
