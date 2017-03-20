/**
 * 版本规范,0.0.1 第一位迭代的版本，第二位线上修复的版本，第三位测试的版本
 * @type {string}
 */
window.version = '0.0.1';
console.log('版本号：', window.version);
window.debug = false;
requirejs.config({
    baseUrl: './js',
    paths: {
    	index:'./index',
        overview:'./overview',
        account:'./account'
//      // 库函数
//      vConsole: 'lib/vconsole.min',
//      layer: 'lib/layer',
//      text: 'lib/text',
//      qrcode: 'lib/qrcode/jquery.qrcode',
//      calendar: './lib/calendar/jscal2',
//      calendar_lang: './lib/calendar/cn',
//      excel:'./lib/excel/xlsx.core.min',
//
//      //模块部分
//      moduleBase: './modules/module_base',
//      comparison: './modules/comparison',
//      module_carousel_1: './modules/module_carousel_1',
//      module_coupon_2: './modules/module_coupon_2',
//      module_storeEntrance_2: './modules/module_storeEntrance_2',
//      module_description_1: './modules/module_description_1',
//      module_title_1: './modules/module_title_1',
//      module_title_2: './modules/module_title_2',
//      module_title_3: './modules/module_title_3',
//      module_storeExhibition_1: './modules/module_storeExhibition_1',
//      module_productsExhibition_1: './modules/module_productsExhibition_1',
//      module_productsExhibition_2: './modules/module_productsExhibition_2',
//      module_productsExhibition_3: './modules/module_productsExhibition_3',
//      module_nav_1: './modules/module_nav_1',
//      module_tab_1: './modules/module_tab_1',
//      module_groupBuyBrand_1: './modules/module_groupBuyBrand_1',
//      module_headPic_1: './modules/module_headPic_1',
//
//      edit_leftBar: './admin/edit_leftBar',
//      edit_centerShow: './admin/edit_centerShow',
//
//      //页面部分
//      adminEditList: './admin/list',
//      adminEditDetail: './admin/pageAttr',
//      adminEditPage: './admin/edit_main',
//
//      //公共部分
//      common: './common/common',
//      host: '../host',
//      commonAJAX: './common/commonAjax',
//      mapsConfig: './common/maps',
//      upload: './upload/uploader'
    },
    shim: {
//      vConsole: {
//          exports: 'vConsole'
//      },
//      calendar: {
//          exports: 'Calendar'
//      },
//      calendar_lang: {
//          deps: ['calendar']
//      },
//      qrcode: {
//          exports: 'qrcode',
//          deps: ['jquery']
//      }
    },
    urlArgs: 'v=' + version
});
