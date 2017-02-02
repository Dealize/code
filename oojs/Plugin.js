// define(['language','Base'],function(language,Base){
//     function Plugin(){
//         console.log(this);
//         Base.apply(this,arguments);
//     }
//     Plugin.__initAttr = {
//         originData:{},
//         plugData:{},
//         super:''
//     }
//     language.extend(Plugin,Base)
//     function pluginSetData(){

//     }
//     function pluginFn (){

//     }
//     function run(){
//         pluginFn();
//         return this;
//     }

//     var pluginFn = {
//         pluginSetData:pluginSetData,
//         pluginFn:pluginFn,
//         run:run
//     }
//     language.mixin(Plugin.prototype,pluginFn,true)
//     return  Plugin;
// })