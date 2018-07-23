var childProcess = require("child_process");
var path = require("path");
var request = require('request');

exports.testAdding = function(test){  
    var x = 3,
        y = 2;
    test.equals(x+y, 5, "Test add function");

    var cp = childProcess.fork(path.join(__dirname, "/webserver.js"));
    cp.on("exit", function (code, signal) {
        console.log("Exited", {code: code, signal: signal});
    });
    cp.on("error", console.error.bind(console));

    console.log("starting timeout");
    setTimeout(function() {
        console.log('waited 3 seconds');
        request('http://127.0.0.1:3000/test.php', function (err, res) {
            if (err) return console.error(err.message);

            console.log(res.body);
            cp.kill('SIGINT');
            test.done();
        });
    }, 3000);
};
