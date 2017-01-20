import nodemon from 'nodemon'

nodemon({
     script: `${__dirname}/app.es6.js`,
     watch: [`${__dirname}/`],
     ext: 'js json html',
     execMap: {
         'js': 'babel-node'
     },
	env: {
	    "NODE_ENV": "development"
	}
 }).on('crash', function () {
     console.error('nodemon crashed!')
 }).on('quit', function() {
     process.kill(process.pid)
 }).on('restart', function (files) {
     process.stdout.clearLine()
     process.stdout.cursorTo(0)
     process.stdout.write(`server restarting due to 【${files.map(file => file.replace(`${__dirname}/`, ''))}】\n`)
 })
 // 防止进程意外退出
 process.on('uncaughtException', function (err) {
     // console.log(err);
     // console.log(err.stack);
 });



