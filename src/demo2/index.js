var fs = require('fs');
var path = require('path');
var Koa = require('koa');
var send = require('koa-send');
var app = new Koa();
require("babel-register");

require('./app.es6.js');

// console.log(' process.env.NODE_ENV:',process.env.NODE_ENV);

