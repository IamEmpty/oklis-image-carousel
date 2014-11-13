module.exports = function(grunt){

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
					'css/oklis-image-carousel.css': 'css/oklis-image-carousel.scss'
				}
			}
		},
		haml: {
			dist: {
				files: {
					'build/index.html': 'index.haml'
				}
			}
		},
		watch: {
			css: {
				files: 'css/*.scss',
				tasks: ['sass']
			},
            haml: {
                files: '*.haml',
                tasks: ['haml']
            },
            min: {
        		files: 'js/*.js',
        		tasks: ['min']
            },
            cssmin: {
            	files: 'css/*.css',
            	tasks: ['cssmin']
            }
		},
		min: {
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
		}
	});


	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-haml');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-yui-compressor');


	grunt.registerTask('default', [
		'watch'
	]);
 

 	// Compile production files

	grunt.registerTask('build', [
		'haml',
		'sass',
		'cssmin',
		'min'
	]);
};