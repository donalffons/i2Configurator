/*jshint esversion: 6 */

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

grunt.registerTask('server', ['php']);
console.log("Started PHP webserver on port 3000.\n")