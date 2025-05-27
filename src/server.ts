import Router from '@koa/router';
import fs from 'fs';
import { readFile } from 'fs/promises';
import Koa from 'koa';
import path from 'path';
import koaServe from './koa-serve.middleware';

export const boot = (prot: number,directories: string[] | string,root: string) => {
    const app = new Koa();
    app.use(koaServe(directories,root));
    const router = new Router();
    router.get(/.*/,async (ctx) => {
        const indexPath = path.join(root,'index.html');
        const reqPath = ctx.request.path;
        const assetsPath = path.join(root,reqPath);
        if (fs.existsSync(assetsPath)) {
            const stat = fs.lstatSync(assetsPath);
            if (!stat.isDirectory()) {
                ctx.type = path.extname(assetsPath);
                ctx.body = fs.createReadStream(assetsPath);
                return;
            }
        }
        const file = await readFile(indexPath,'utf-8');
        ctx.body = file;
    });
    app.use(router.routes());
    app.listen(prot);
};   