var koa = require('koa');
var app = new koa();

// x-response-time
app.use(function *(next){
  // (1) 进入路由
  var start = +new Date;
  //获取某个cookie
  console.log('iw_user_province_cookie_h5 获取cookie:', this.cookies.get('iw_user_province_cookie_h5'));
    
  //设置某个cookie,如果值有汉字，需要转义
  this.cookies.set('iw_user',`ceshi${encodeURIComponent('喊')}`,{expires:new Date((new Date).setDate(20))});
  // this.cookies.set('IW_UUID_COOKIES', 'test',{expires:new Date(-1)});

  //清空cookie值,expires值要是Date类型
  this.cookies.set('huazi', 'test',{expires:new Date(-1)});

  console.log(' 第一个start:',start);

  yield next;

  // (5) 再次进入 x-response-time 中间件，记录2次通过此中间件「穿越」的时间
  var ms = new Date - start;
  console.log(' 第一个start回来ms:',ms);
  this.set('X-Response-Time', ms + 'ms');

  // this.throw('name required', 400);
  // (6) 返回 this.body
});

// logger
app.use(function *(next){
  // (2) 进入 logger 中间件
  var start = +new Date;
  console.log('第二个 start:',start);

  yield next;
  // (4) 再次进入 logger 中间件，记录2次通过此中间件「穿越」的时间
  var ms = new Date - start;
    console.log('第二个 start回来ms:',ms);
  console.log('%s %s - %s', this.method, this.url, ms);
});

// response
app.use(function *(){
    var start = +new Date;
  // (3) 进入 response 中间件，没有捕获到下一个符合条件的中间件，传递到 upstream
  console.log('第三个 start:',start,' this.ip:',this.ip);
  console.log(' this.acceptsEncodings():',this.acceptsEncodings());
  console.log("this.accepts('html'):",this.accepts('html'));
  console.log("this.accepts():",this.accepts());
  console.log("this.accepts(png):",this.accepts('png'));
  console.log("this.accepts(xxxx):",this.accepts('xxxx'));
  console.log("this.acceptsEncodings():",this.acceptsEncodings());
  console.log("this.acceptsCharsets():",this.acceptsCharsets());
  console.log("this.acceptsLanguages():",this.acceptsLanguages());
  console.log(' this.type:',this.type)
  console.log(' this.length:',this.length)
  console.log(' this.path:',this.path)
  console.log(' this.get(ETag):',this.get('Etag'))
  console.log(' this:',this);
  this.set({
  'Etag': '1234',
  'Cache-Control': 'aa-xxno-cache',
  'Last-Modified': new Date()
});
  // this.remove('Cache-Control');
  console.log(' 2 ---->this.get(ETag):',this.get('Etag'))
  // this.body = '胡子qHello World!!!11';
  // this.status = 301;
  // this.redirect('/cart');
  // this.body = 'Redirecting to shopping cart';
});


app.on('error', function(err, ctx){
  log.error('server error', err, ctx);
});





//可以监听多个端口
app.listen(3000);
// app.listen(3002);



