import Koa from 'koa';
import koaServe from './koa-serve.middleware';


export const boot = (prot:number) => {
    const app = new Koa();
    app.use(koaServe);
    app.listen(prot);
};   