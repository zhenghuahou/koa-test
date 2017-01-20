var fs = require('fs');
var path = require('path');
var Koa = require('koa');
var send = require('koa-send');
var app = new Koa();


 async function tt(ctx,next){
  console.log(' next--->111:',next);
  // next();
  // if ('/' == ctx.path) return ctx.body = 'Try GET /package.json';
  // await send(ctx, ctx.path, { root: __dirname });
}

tt();

// console.log(' path:',path,' 11--->',path.rersolve('/foo', 'quux', '..'));
// console.log(' path:',path,'22 --->',path.join('/foo', 'quux', '..'));

// var resolvePath = path.resolve('path1', 'path2', 'a/b/c/');
// var joinPath = path.join('path1', 'path2', 'a/b/c/');
// console.log(' resolvePath:',resolvePath," joinPath:",joinPath);
// resolvePath: /Users/houzhenghua/github/koa-test/path1/path2/a/b/c  
// joinPath: path1/path2/a/b/c/


 async function tt(ctx,next){
  console.log(' next--->111:',next);
  // next();
  // if ('/' == ctx.path) return ctx.body = 'Try GET /package.json';
  // await send(ctx, ctx.path, { root: __dirname });
}

tt();


var test = arguments;


const html = fs.readFileSync(path.join(__dirname,'./test.html'));
// const html = 'html';
// console.log(' tt:',html);

/**
 * 处理静态文件
 * 
 * 参数为root路径
 */
// app.use(middleware.assstatic('.'));

console.log('    ------->',23);

app.use( function(ctx,next){
  console.log(' ------+++++=====tttt:huazi');
  next();
  // if ('/' == ctx.path) return ctx.body = 'Try GET /package.json';
  // await send(ctx, ctx.path, { root: __dirname });
});


// response
app.use((ctx,next)=>{
    //箭头函数没有自己的arguments,这里面引用的的arguments是外面一层函数的arguments
    //所以 test ===arguments 为true
    // console.log(' arguments:',arguments,test === arguments);

    ctx.type='text/html';
    // ctx.type='html';//ok
    ctx.body = html;
    // ctx.throw('error','错误提示')
    // console.log(' ctx:',ctx,' next:',next);

    next(); //执行下一个中间件(--2)
});


//下一个中间件(--2)
app.use((ctx, next) => {
  const start = new Date();
  // console.log(' ctx-->',ctx, 'this:',this)
  return next().then(() => {
    const ms = new Date() - start;
    console.log('**********',`${ctx.method} ${ctx.url} : ${ms}ms`);
  });
});



app.listen('3001');