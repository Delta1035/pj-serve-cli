#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
commander_1.program
    .option('--first')
    .option('-s, --separator <char>')
    .argument('<string>');
commander_1.program.parse();
const options = commander_1.program.opts();
const limit = options.first ? 1 : undefined;
console.log(commander_1.program.args[0].split(options.separator, limit));
