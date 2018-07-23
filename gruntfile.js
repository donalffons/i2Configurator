module.exports = function(grunt) {
  grunt.initConfig({
    //jshint: {
    //  all: ['gruntfile.js', 'tests/**/*.js']
    //},
    nodeunit: {
      all: ['tests/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['jshint', 'nodeunit']);
};
