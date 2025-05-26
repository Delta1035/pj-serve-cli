import _debug from 'debug';
import type { Context,Middleware,Next } from 'koa';
import send from 'koa-send';
import fs from 'node:fs';
import path from 'node:path';

const debug = _debug('koa-serve');
export default function (directories: string[] | string,root: string): Middleware {
    if (!Array.isArray(directories)) {
        directories = [directories];
    }
    root = root || path.join(__dirname,'..','..');
    root = path.normalize(root);

    return async function (ctx: Context,next: Next) {
        const reqPath = ctx.path;
        const isAsset = directories.some(function (dir) {
            return reqPath.startsWith('/' + dir);
        });

        if (!isAsset) return next();

        debug('requested:',reqPath);
        try {
            const filePath = (isAsset && !fs.lstatSync(root + ctx.path).isDirectory())
                ? root + ctx.path
                : root + ctx.path + 'index.html';

            debug('served:',filePath);
            // FIXME: 没有发出文件
            await send(ctx,filePath);
        }
        catch (e) {
            debug(e);
            console.log('e >>>>>',e);

            // if (isAsset) {
            //     ctx.body = 'Not Found';
            //     ctx.status = 404;
            // } else {
            //     return next();
            // }
        }
    };
};
