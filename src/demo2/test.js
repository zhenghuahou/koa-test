// if ( CSS.supports( '(display: flex)' ) ) {
//     console.log( '支持flex' )
// } else {
//     console.log( '不支持flex' )
// }
// if ( CSS.supports( '(display: flexbox)' ) ) {
//     console.log( '支持flexbox' )
// } else {
//     console.log( '不支持flexbox' )
// }


function random(min = 0,max = min +1){
                return  toHex(Math.round(Math.random()*(max-min))+ min>>0) //[0,255]包括0，255
            }
function toHex(number = 0){
    return number.toString(16)
}
var dom = document.querySelector('.test');
document.querySelector('.btn').addEventListener('click',function(){
    dom.style.setProperty('--theme-colour', `#${random(0,255)}${random(0,255)}${random(0,255)}`);
},false);







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