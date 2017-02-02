require(['Base'],function(Base){
   var a = new Base();


   function demoBase(){
       Base.apply(this,arguments)
   }
   demoBase.prototype = Base.prototype;

   console.log(demoBase.prototype)

   var b = new demoBase();
   console.log(b)

})