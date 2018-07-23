module.exports = function(grunt) {
  grunt.initConfig({
    nodeunit: {
      all: ['tests/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['nodeunit']);
};
