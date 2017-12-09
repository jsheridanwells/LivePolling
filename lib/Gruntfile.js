/*Configured to lint, update css, compile to built.js and refresh the browser*/

module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      '../dist/built.js' : ['../app/**/*.js']
    },
    jshint: {
      options: {
        predef: [ "document", "console", "d3", "firebase", "$"],
        esnext: true,
        globalstrict: true,
        globals: {"angular": true, "app": true},
        reporter: require('jshint-stylish')
      },
      files: ['../app/**/*.js']
    },
    sass: {
      dist: {
        files: {
          '../css/main.css': '../sass/styles.scss'
        }
      }
    },
    connect: {
      server: {
        options: {
          base: '../',
          hostname: 'localhost',
          port: 8000,
          livereload: true,
          open: true
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      javascripts: {
        files: ['../app/**/*.js'],
        tasks: ['jshint', 'concat']
      },
      sass: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
      },
      browserify: {
        files: ['../app/**/*.js'],
        tasks: ['browserify']
      },
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'browserify', 'sass', 'connect', 'watch']);
};
