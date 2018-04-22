"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var yargs_1 = require("yargs");
var chalk_1 = require("chalk");
var fs = require("fs");
var TOKEN = 'token';
var CONTEXT = 'context';
var URL = 'url';
var FILE = 'file';
var APP_NAME = 'appName';
if (!yargs_1.argv[TOKEN]) {
    throw new Error(chalk_1.default.red('TOKEN MISSING:') + " please be sure to pass a token provided by config hub " + exampleErrorText(TOKEN));
}
if (!yargs_1.argv[CONTEXT]) {
    throw new Error(chalk_1.default.red('CONTEXT MISSING:') + " please be sure to pass a context you created for the file " + exampleErrorText(CONTEXT));
}
if (!yargs_1.argv[URL]) {
    throw new Error(chalk_1.default.red('URL MISSING:') + " please be sure to pass a url for the hosted config hub instance " + exampleErrorText(URL));
}
if (!yargs_1.argv[FILE]) {
    throw new Error(chalk_1.default.red('FILE MISSING:') + " please be sure to pass a file name " + exampleErrorText(FILE));
}
if (!yargs_1.argv[APP_NAME]) {
    throw new Error(chalk_1.default.red('APPLICATION NAME MISSING:') + " please be sure to pass a config hub application name " + exampleErrorText(APP_NAME));
}
var client = axios_1.default.create({
    headers: {
        'Client-Token': yargs_1.argv[TOKEN],
        Context: yargs_1.argv[CONTEXT],
        File: yargs_1.argv[FILE],
        'Application-name': yargs_1.argv[APP_NAME]
    }
});
client.get(yargs_1.argv[URL]).then(function (res) {
    fs.writeFile(yargs_1.argv[FILE], res.data, function (err) {
        if (err)
            throw err;
        console.log("" + chalk_1.default.greenBright('SUCCESS!'));
        console.log("\"" + yargs_1.argv[CONTEXT] + "\" config details written to file in the project root -> " + chalk_1.default.cyanBright(yargs_1.argv[FILE]));
    });
});
function exampleErrorText(argType) {
    return "e.g. " + chalk_1.default.cyanBright("config-hub-helper --" + argType + "=<" + argType + " here>");
}
