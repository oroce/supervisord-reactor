#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2), {
  string: ['event']
});
var listener = require('supervisord-eventlistener');
var execSync = require('child_process').execSync;
var events = Array.isArray(argv.event) ? argv.event : [argv.event];


events.forEach(listen);

function listen(evt) {
  listener.on(evt, executeCmds);
}

function executeCmds() {
  argv._.forEach(execute);
}

function execute(cmd) {
  execSync(cmd);
}

listener.listen(process.stdin, process.stdout);
