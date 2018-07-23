var childProcess = require("child_process");
var path = require("path");
var http = require('http');

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
        var options = {
            host: 'localhost:3000',
            path: '/test.php'
        };
        http.request(options, function(){
            var str = '';

            //another chunk of data has been recieved, so append it to `str`
            response.on('data', function (chunk) {
                str += chunk;
            });

            //the whole response has been recieved, so we just print it out here
            response.on('end', function () {
                console.log(str);
            });

            console.log("testing done");
            test.done();
        }).end();
    }, 3000);
};
