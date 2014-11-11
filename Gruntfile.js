module.exports = function(grunt){

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
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-haml');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['watch', 'haml']);
};