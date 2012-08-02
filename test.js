#!/usr/bin/env phantomjs

console.log('Loading a web page');
var page = require('webpage').create();

page.onConsoleMessage = function (msg) {
  console.log(msg);
};

page.onError = function (msg, trace) {
  console.log(msg);
  trace.forEach(function(item) {
    console.log('  ', item.file, ':', item.line);
  });
  phantom.exit(1);
};

page.onLoadFinished = function (status) {
  if (status !== "success") {
    console.log("page.open failed");
    phantom.exit(2);
  }
  console.log("All tests passed!");
  phantom.exit();
};

page.open("./index.html");
