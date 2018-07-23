/*jshint esversion: 6 */

class ExecPHP {
    constructor() {
    }
    
    parseFile(fileName,callback) {
            var realFileName = fileName;

            console.log('parsing file: ' + realFileName + '\n');

            var exec = require('child_process').exec;
            var cmd = 'php ' + realFileName;

            exec(cmd, function(error, stdout, stderr) {
                console.log('done parsing: ' + realFileName + '\n');
                callback(stdout);
            });
    }
}
module.exports = function() {
    return new ExecPHP();
};
