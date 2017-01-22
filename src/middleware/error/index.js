const path = require('path');

/**
 * 404 or 500错误页面
 */
module.exports = function (){
    return function (ctx, next) {
        return next()
        .then(()=>{
            console.log('error js -->then--> 执行中 ctx.status:',ctx.status,
                ' ctx.url:',ctx.url,'\n\n\n')
            const status = ctx.status;
            if (status === 404) {
                ctx.throw('404 page',404)
            }
            // return '哈哈'
        })
        .catch(err => {
            console.log('error js --->catch--> 执行中');
            // 处理400、500等未捕获的错误
            let { status }= err;
            if(status){
                if (status === 404) {
                   console.warn('request Path is ',ctx.url,'404 page redirect => path "/"');
                    ctx.status = 404;
                    // ctx.redirect('/');
                }else{
                    console.error(JSON.stringify(err,2,2));
                }
            }else{
                //未知错误
               console.error(err.name + '\n' +err.message+'\n'+ err.stack);
               ctx.body = err.stack;
               ctx.status = 500;
            };   
        })
    }
}