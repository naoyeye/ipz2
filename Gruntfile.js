module.exports = function(grunt) {

	grunt.initConfig({
		watch: {
			jade: {
				files: [
					'client/views/admin/*.jade',
					'client/views/admin/includes/*.jade',
					'client/views/admin/pages/*.jade',
					'client/views/website/*.jade',
					'client/views/website/includes/*.jade',
					'client/views/website/pages/*.jade'
				],
				options: {
					livereload: true
				}
			},
			compass: {
				files: ['client/public/src/css/*.{scss,sass}'],
				task: ['compass:dev']
			}
		},
		compass: {
			dev: {
				options: {
					sassDir: ['client/public/src/css'],
					cssDir: ['client/public/css'],
					environment: 'development'
				}
			},
			prod: {
				options: {
					sassDir: ['client/public/src/css'],
					cssDir: ['client/public/css'],
					environment: 'production'
				}
			}
		},
		nodemon: {
			dev: {
				script: 'app.js',
				options: {
					args: [],
					ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
					watchedExtensions: ['js'],
					watchedFolders: ['client', 'server'],
					debug: true,
					delayTime: 1,
					env: {
						PORT: 3000
					},
					cwd: __dirname
				}
			}
		},
		concurrent: {
			task: ['nodemon', 'watch', 'compass:dev'],
			options: {
				logConcurrentOutput: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.option('force', true);
	grunt.registerTask('default', ['concurrent']);

};