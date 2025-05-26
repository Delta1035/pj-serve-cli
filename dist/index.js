#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const server_1 = require("./server");
commander_1.program
    .version('1.0.0', '-v, --version', '显示版本号')
    .description('static file serve')
    .option('-p, --port <port>', 'Port number to listen on', '8080')
    .argument('[indexPath]', 'Path to the index file', './index.html');
commander_1.program.parse();
const [dir] = commander_1.program.args;
const { port } = commander_1.program.opts();
console.log('args >>>>>>>', dir);
console.log('opts >>>>>>>', port);
const root = process.cwd();
(0, server_1.boot)(port, dir, root);
//# sourceMappingURL=index.js.map