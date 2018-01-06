/*Configured to lint, update css, compile to built.js and refresh the browser*/

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        predef: [ "document", "console", "d3", "firebase", "$", "window", "alert", "ActionCable", "require", "module", "gapi"],
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
    // concat: {
    //   js: {
    //           files: {'../dist/built.js': '../app/**/*.js' }
    //       }
    // },
    browserify: {
      js: {
        src: ['../app/**/*.js'],
        dest: '../dist/built.js'
      },
      options: {
        paths: ["./node_modules"]
      }
    },
    connect: {
      server: {
        options: {
          base: '../',
          hostname: 'localhost',
          port: 8080,
          livereload: true,
          open: true
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      html: {
        files: ["../index.html","../views/*.html"]
      },
      javascripts: {
        files: ['../app/**/*.js'],
        tasks: ['jshint', 'browserify']
      },
      sass: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'sass', 'browserify', 'connect', 'watch']);
};
