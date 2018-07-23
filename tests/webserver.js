/*jshint esversion: 6 */

var express = require('express');
var app = express();

var execPHP = require('./execphp.js')();

app.use('*.php',function(request,response,next) {
        execPHP.parseFile(request.originalUrl,function(phpResult) {
                response.write(phpResult);
                response.end();
        });
});

app.listen(3000, function () {
        console.log('Node server listening on port 3000!\n');
});
