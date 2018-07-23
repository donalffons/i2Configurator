var childProcess = require("child_process");
var path = require("path");
var curl = require('node-curl');

exports.testAdding = function(test){  
    var x = 3,
        y = 2;
    test.equals(x+y, 5, "Test add function");

    var cp = childProcess.fork(path.join(__dirname, "/tests/webserver.js"));
    cp.on("exit", function (code, signal) {
        console.log("Exited", {code: code, signal: signal});
    });
    cp.on("error", console.error.bind(console));
    setTimeout(function() {
        console.log('waited 3 seconds');
        curl('localhost:3000/test.php', function(err) {
            console.info(this.status);
            console.info('-----');
            console.info(this.body);
            console.info('-----');
            console.info(this.info('SIZE_DOWNLOAD'));
          });
    }, 3000);

    test.done();
};
