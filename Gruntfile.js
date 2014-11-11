module.exports = function(grunt){

    // Start web server
    // Compile production files
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
					'index.html': 'index.haml'
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
            }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-haml');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['watch']);
};