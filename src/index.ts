#!/usr/bin/env node
import { program } from 'commander';
import { boot } from './server';
program
    .version('1.0.0','-v, --version','显示版本号')
    .description('static file serve')
    .option('-p, --port <port>', 'Port number to listen on', '8080')
    .argument('[indexPath]', 'Path to the index file', './index.html')


program.parse();

const [dir] = program.args
const {port} = program.opts()
console.log('args >>>>>>>',dir);
console.log('opts >>>>>>>',port);
const root = process.cwd()

boot(port,dir,root)