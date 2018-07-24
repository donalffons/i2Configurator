/*jshint esversion: 6 */

module.exports = function(grunt) {
    grunt.initConfig({
        php: {
            test: {
                options: {
                    port: 3000,
                    keepalive: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-php');
    grunt.registerTask('server', ['php']);
    console.log("Started PHP webserver on port 3000.\n");
}