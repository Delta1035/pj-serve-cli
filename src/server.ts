import Koa from 'koa';
import koaServe from './koa-serve.middleware';


export const boot = (prot:number,directories: string[] | string,root:string) => {
    const app = new Koa();
    app.use(koaServe(directories,root));
    app.listen(prot);
};   