module.exports = function(grunt) {
  grunt.initConfig({
    nodeunit: {
      all: ['tests/**/*.js']
    },
    php: {
        test: {
            options: {
                port: 3000,
                keepalive: false
            }
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-php');

  grunt.registerTask('test', ['php:test', 'nodeunit']);
};
