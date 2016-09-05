module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // Start web server
  // Compile developer friendly environment
  // $ grunt serve

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'dist/css/oklis-image-carousel.css': 'stylesheets/oklis-image-carousel.scss'
        }
      }
    },
    pug: {
      dist: {
        options: {
          pretty: true
        },
        files: {
          'dist/index.html': 'examples/index.pug'
        }
      }
    },
    watch: {
      css: {
        files: 'stylesheets/*.scss',
        tasks: [ 'sass' ]
      },
      html: {
        files: 'examples/*.pug',
        tasks: [ 'pug' ]
      }
      /*min: {
      files: 'js/*.js',
      tasks: ['min']
      },*/
      /*cssmin: {
        files: 'css/*.css',
        tasks: ['cssmin']
      }*/
    },
    copy: {
      main: {
        expand: true,
        cwd: 'js/',
        src: '*.js',
        dest: 'dist/js/',
        flatten: true,
        filter: 'isFile'
      },
      vendor: {
        expand: true,
        cwd: 'bower_components/jquery/dist/',
        src: 'jquery.min.js',
        dest: 'dist/js/',
        flatten: true,
        filter: 'isFile'
      },
      css: {
        expand: true,
        cwd: 'stylesheets/',
        src: '*.css',
        dest: 'dist/css/',
        flatten: true,
        filter: 'isFile'
      }
    }
    /*min: {
        'dist': {
            'src': ['js/oklis-image-carousel.js', 'js/base.js'],
            'dest': 'build/all-own.min.js'
        }
    },
    cssmin: {
        'dist': {
            'src': ['css/oklis-image-carousel.css'],
            'dest': 'build/oklis-image-carousel.min.css'
        }
    }*/
  });


  // Compile production files
  grunt.registerTask('dist', [
    'pug',
    'sass',
    'copy'
  ]);

  grunt.registerTask('default', [
    'dist',
    'watch'
  ]);

};
