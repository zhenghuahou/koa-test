const matchRules = {
  'area1':/[^\d.]/g, //楼层取反用
  'area2':/^0+/,  //楼层取反用
  // 'area3':/^\d+(\.{0,1}\d{0,2})?$/  //面积判断是否符合
  'area3':/[^0-9.]/g  //面积判断是否符合  //面积判断是否符合
}
const maxArea = 10000;
const filterArea = function(that,event){
    console.log(' arguments:',arguments);
    var value = event.target.value;
    // value = value.replace(matchRules.area1,'');
    value = value.replace(matchRules.area1,'').replace(matchRules.area2,'');
    value = value.trim();
    let arr = value.split('.');
    let [integer,decimal=''] = arr;
    decimal = decimal.slice(0,2);
    integer = Math.min(integer,maxArea);
    if(!integer){
     return;
    }
    if(integer >= maxArea){
     value = integer;
    }else{
     value = integer + (decimal ? '.'+decimal :'');
    }
    console.info(value,' integer:',integer,' decimal:',decimal,' arr:',arr)
    alert(' value:'+value+";");
    console.log(' value:',value);
    that.value = value;
  }
  
  document.querySelector('.demo').addEventListener('input',function(){
    filterArea(this,event);
  },false);