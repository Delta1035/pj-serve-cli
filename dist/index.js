#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
commander_1.program
    .version('1.0.0', '-v, --version', '显示版本号')
    .description('static file serve')
    .option('-p, --port <port>', 'Port number to listen on', '8080')
    .argument('[indexPath]', 'Path to the index file', './index.html');
// .option('-p, --port <port>','Port number to listen on');
commander_1.program.parse();
const options = commander_1.program.opts();
const args = commander_1.program.args;
console.log(args);
const limit = options.first ? 1 : undefined;
console.log(commander_1.program.args[0].split(options.separator, limit));
//# sourceMappingURL=index.js.map