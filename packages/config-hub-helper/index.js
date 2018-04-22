const axios = require('axios');
const fs = require('fs');
const argv = require('yargs').argv;
const chalk = require('chalk');

const TOKEN = 'token';
const CONTEXT = 'context';
const URL = 'url';
const FILE = 'file';
const APP_NAME = 'appName';

if (!argv[TOKEN]) {
  throw new Error(
    `${chalk.red(
      'TOKEN MISSING:'
    )} please be sure to pass a token provided by config hub ${exampleErrorText(
      TOKEN
    )}`
  );
}

if (!argv[CONTEXT]) {
  throw new Error(
    `${chalk.red(
      'CONTEXT MISSING:'
    )} please be sure to pass a context you created for the file ${exampleErrorText(
      CONTEXT
    )}`
  );
}

if (!argv[URL]) {
  throw new Error(
    `${chalk.red(
      'URL MISSING:'
    )} please be sure to pass a url for the hosted config hub instance ${exampleErrorText(
      URL
    )}`
  );
}

if (!argv[FILE]) {
  throw new Error(
    `${chalk.red(
      'FILE MISSING:'
    )} please be sure to pass a file name ${exampleErrorText(FILE)}`
  );
}

if (!argv[APP_NAME]) {
  throw new Error(
    `${chalk.red(
      'APPLICATION NAME MISSING:'
    )} please be sure to pass a config hub application name ${exampleErrorText(
      APP_NAME
    )}`
  );
}

const client = axios.create({
  headers: {
    'Client-Token': argv[TOKEN],
    Context: argv[CONTEXT],
    File: argv[FILE],
    'Application-name': argv[APP_NAME]
  }
});

client.get(argv[URL]).then(res => {
  fs.writeFile(argv[FILE], res.data, err => {
    if (err) throw err;
    console.log(`${chalk.greenBright('SUCCESS!')}`);
    console.log(
      `"${
        argv[CONTEXT]
      }" config details written to file in the project root -> ${chalk.cyanBright(
        argv[FILE]
      )}`
    );
  });
});

function exampleErrorText(argType) {
  return `e.g. ${chalk.cyanBright(
    `config-hub-helper --${argType}=<${argType} here>`
  )}`;
}
