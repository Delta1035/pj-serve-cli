import _debug from 'debug';
import type { Context,Middleware,Next } from 'koa';
import send from 'koa-send';
import fs from 'node:fs';
import path from 'node:path';
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

const debug = _debug('koa-serve');
export default function (directories: string[],root: any): Middleware {
    if (!Array.isArray(directories)) directories = [directories];
    root = root || path.join(__dirname,'..','..');
    root = path.normalize(root);

    return async function (ctx: Context,next: Next) {
        let reqPath = ctx.path,
            filePath,isAsset,fd;


        isAsset = directories.some(function (dir) {
            return reqPath.startsWith('/' + dir);
        });

        if (!isAsset) return next();

        debug('requested:',reqPath);
        try {
            filePath = (isAsset && !fs.lstatSync(root + ctx.path).isDirectory())
                ? root + ctx.path
                : root + ctx.path + 'index.html';

            debug('served:',filePath);
            await send(ctx,filePath);
        }
        catch (e) {
            debug(e);
            if (isAsset) {
                ctx.body = 'Not Found';
                ctx.status = 404;
            } else {
                return next();
            }
        }
    };
};
