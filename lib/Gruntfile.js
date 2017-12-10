/*Configured to lint, update css, compile to built.js and refresh the browser*/

module.exports = function(grunt) {

  grunt.initConfig({
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
    concat: {
      js: {
              files: {'../dist/built.js': '../app/**/*.js' }
          }
    },
    connect: {
      server: {
        options: {
          base: '../',
          hostname: 'localhost',
          port: 3000,
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
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'sass', 'concat', 'connect', 'watch']);
};
