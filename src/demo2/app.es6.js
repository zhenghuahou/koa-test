var fs = require('fs');
var path = require('path');
var Koa = require('koa');
var send = require('koa-send');
var app = new Koa();

// console.log(' path:',path,' 11--->',path.rersolve('/foo', 'quux', '..'));
// console.log(' path:',path,'22 --->',path.join('/foo', 'quux', '..'));

// var resolvePath = path.resolve('path1', 'path2', 'a/b/c/');
// var joinPath = path.join('path1', 'path2', 'a/b/c/');
// console.log(' resolvePath:',resolvePath," joinPath:",joinPath);
// resolvePath: /Users/houzhenghua/github/koa-test/path1/path2/a/b/c  
// joinPath: path1/path2/a/b/c/


var test = arguments;

const html = fs.readFileSync(path.join(__dirname,'./test.html'));
const middleware = require('../middleware');

app.use(middleware.error())

app.use(async function(ctx,next){
  console.log('test1',ctx.method,' ctx.path:',ctx.path);
  next(); //要放在前面
  
  let  path;
  if (path = await send(ctx, ctx.path, { root: __dirname })) {
      console.log('test4',path)
  }
  console.log('test5:',path);
});

// response
app.use((ctx,next)=>{
    //箭头函数没有自己的arguments,这里面引用的的arguments是外面一层函数的arguments
    //所以 test ===arguments 为true
    // console.log(' arguments:',arguments,test === arguments);
    ctx.type='text/html';
    // ctx.type='html';//ok
    ctx.body = html;
    console.log('test2');
    next(); //执行下一个中间件(--2)
    console.log('test3');
});

//下一个中间件(--2)
app.use((ctx, next)=>{
  const start = new Date();
  console.log('最后一个中间件 this:');
});

app.listen('3001');

/*
输出顺序:
test1 GET  ctx.path: /
test2
最后一个中间件 this:
test3
test5: undefined
error js -->then--> 执行中 ctx.status: 200  ctx.url: /



test1 GET  ctx.path: /test.js
test2
最后一个中间件 this:
test3
test4 /Users/houzhenghua/github/koa-test/src/demo2/test.js
test5: /Users/houzhenghua/github/koa-test/src/demo2/test.js
error js -->then--> 执行中 ctx.status: 200  ctx.url: /test.js
*/