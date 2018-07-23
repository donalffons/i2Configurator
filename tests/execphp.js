/*jshint esversion: 6 */

class ExecPHP {
    constructor() {
    }
    
    parseFile(fileName,callback) {
            var realFileName = fileName;

            console.log('parsing file: ' + realFileName);

            var exec = require('child_process').exec;
            var cmd = 'php ' + realFileName;

            exec(cmd, function(error, stdout, stderr) {
                    callback(stdout);
            });
    }
}
module.exports = function() {
    return new ExecPHP();
};
