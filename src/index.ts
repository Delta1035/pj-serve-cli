#!/usr/bin/env node
import { program } from 'commander';
program
    .version('1.0.0','-v, --version','显示版本号')
    .description('static file serve')
    .option('-p, --port <port>', 'Port number to listen on', '8080')
    .argument('[indexPath]', 'Path to the index file', './index.html')
    // .option('-p, --port <port>','Port number to listen on');


program.parse();

const options = program.opts();
const args = program.args
console.log(args);
const limit = options.first ? 1 : undefined;
console.log(program.args[0].split(options.separator,limit));