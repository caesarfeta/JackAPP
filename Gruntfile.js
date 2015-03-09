module.exports = function( grunt ) {
	
	grunt.initConfig({
		
		// Grab config
		
		pkg: grunt.file.readJSON( 'bower.json' ),
		
		// Concatenate Javascript files
		
		concat: {
			options: {
				separator: "\n\n\n"
			},
			dist: {
				src: [
					'control/**/*.js',
					'dev/**/*.js',
					'jackson/**/*.js',
					'sparql/**/*.js',
					'ui/**/*.js',
					'app.js'
				],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		
		// Minify Javascript
		
		uglify: {
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		
		// Watch for changes and then rebuild
		
		watch: {
		  files: ['<%= concat.dist.src %>', 'scss/**/*.scss'],
		  tasks: ['concat', 'uglify', 'compass']
		},
		
		// Compass builds css from SCSS
		
		compass: {
		  dist: {
		    options: {
		      config: 'compass.rb'
		    }
		  }
		}
		
	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.registerTask('default',[ 'concat','uglify','compass']);
}