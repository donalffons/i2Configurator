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
        request('http://127.0.0.1:3000/tests/testbasicphp.php', function (err, res) {
            if (err) {
                console.error(err.message);
                test.ok(false);
                test.done();
            }
            if (res.statusCode >= 400) {
                console.error("Server status code " + res.statusCode); 
                test.ok(false);
                test.done();
            }

            console.log(res.body);
            test.done();
        });
    }, 3000);
};
