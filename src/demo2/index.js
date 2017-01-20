var fs = require('fs');
var path = require('path');
var Koa = require('koa');
var send = require('koa-send');
var app = new Koa();
require("babel-register");
require('./app.es6.js');




// async function(ctx,next){
//   console.log(' nex:',next);
//   next();
//   // if ('/' == ctx.path) return ctx.body = 'Try GET /package.json';
//   // await send(ctx, ctx.path, { root: __dirname });
// }


// import nodemon from 'nodemon'

// nodemon({
//     script: `${__dirname}/app.es6.js`,
//     watch: [`${__dirname}/`],
//     ext: 'js json',
//     execMap: {
//         'js': 'babel-node'
//     }
// }).on('crash', function () {
//     console.error('nodemon crashed!')
// }).on('quit', function() {
//     process.kill(process.pid)
// }).on('restart', function (files) {
//     // process.stdout.clearLine()
//     // process.stdout.cursorTo(0)
//     process.stdout.write(`bkd-server restarting due to [${files.map(file => file.replace(`${__dirname}/`, ''))}]`)
// })

// // 防止进程意外退出
// process.on('uncaughtException', function (err) {
//     // console.log(err);
//     // console.log(err.stack);
// });


