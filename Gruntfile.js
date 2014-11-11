module.exports = function(grunt){

    grunt.initConfig({
	  sass: {                              // Task
	    dist: {                            // Target
	      options: {                       // Target options
	        style: 'expanded'
	      },
	      files: {							// Dictionary of files
	        'css/oklis-image-carousel.css': 'css/oklis-image-carousel.scss'			// 'destination': 'source'
	      }
	    }
	  },
	  haml: {                              // Task
	    dist: {                            // Target
	      files: {                         // Dictionary of files
	        'index.html': 'index.haml'     // 'destination': 'source'
	      }
	    }
	  }
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-haml');

	grunt.registerTask('default', ['sass', 'haml']);
};