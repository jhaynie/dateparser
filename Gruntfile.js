module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			dist: {
				options: {
					banner: '/*! <%= pkg.name %>@<%= pkg.version %> by <%= pkg.author %> Copyright (c) <%= grunt.template.today("yyyy")%>. Licensed under the Apache-2.0 */\n'
				},
				files: {
					'dist/dateparser.min.js': ['index.js']
				}
			}
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'spec'
				},
				src: ['test/**/*.js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-mocha-test');

	grunt.registerTask('test', ['mochaTest']);
	grunt.registerTask('default', ['mochaTest', 'uglify']);
};
