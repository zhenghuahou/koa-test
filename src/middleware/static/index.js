/**
 * Module dependencies.
 */

const resolve = require('path').resolve;
// const debug = require('debug')('rudy-static');
const send = require('koa-send');

/**
 * Serve static files from `root`.
 *
 * @param {String} root
 * @param {Object} [opts]
 * @return {Function}
 * @api public
 */

module.exports = function(root, opts) {
    console.log(' staitc-->index.js 函数',opts,' roor:',root)
    opts = opts || {};

    opts.root = resolve(root);

    if (opts.index !== false) {
        opts.index =  opts.index || 'index.html';
    }

    if (!opts.defer) {
        return async function serve(ctx, next) {

            console.log(' static 什么时候调用 : ',ctx.method);
            if (ctx.method == 'HEAD' || ctx.method == 'GET') {
                if (await send(ctx, ctx.path, opts)) {
                    return next();
                }
            }

            console.log(' static @@@@@@@@@@@@@')
            
            return next();
        };
    }
    return async function serve(ctx, next) {

        // console.log(ctx.method);
        if (ctx.method != 'HEAD' && ctx.method != 'GET') {
            return next();
        }

        if (ctx.body != null || ctx.status != 404) {
            return next();
        }

        send(ctx, ctx.path, opts);
        //next();
    };
};
