/*jshint esversion: 6 */

var childProcess = require("child_process");
var path = require("path");
var request = require('request');

exports.testAdding = function(test){  
    var x = 3,
        y = 2;
    test.equals(x+y, 5, "Test add function");

    console.log("starting timeout\n");
    setTimeout(function() {
        console.log('waited 3 seconds\n');
        request('http://127.0.0.1:3000/tests/test.php', function (err, res) {
            if (err) return console.error(err.message);

            console.log(res.body);
            test.done();
        });
    }, 3000);
};
