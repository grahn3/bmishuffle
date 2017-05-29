module.exports = function(grunt) {

    grunt.registerTask('watch', [ 'watch' ]);
    grunt.registerTask('default', ['bowercopy','concat','uglify','sass']);

    grunt.initConfig({
        bowercopy: {
            libs: {
                files: {
                    'private/styles/_normalize.scss': 'normalize-scss/_normalize.scss',
                    'private/styles/_reset.scss': 'reset-scss/_reset-src.scss',
                    'private/scripts/jplayer.playlist.js': 'jplayer/dist/add-on/jplayer.playlist.js',
                    'private/scripts/jquery.jplayer.js': 'jplayer/dist/jplayer/jquery.jplayer.js',
                    'public/support/jquery.min.js': 'jquery/dist/jquery.min.js'
                }
            }
    	},
        concat: { // Package Javascript files and prepare them for compression
            options: {
                separator: ';',
                process: function(src, filename) {
                  return '\n// Source: ' + filename + '\n' + src;
                }
            },
            basic: { // Compile application scripts
                src: ['private/scripts/*.js',
                      '!private/scripts/playlist.js'],
                dest: 'public/support/scripts.min.js',
            },
            plugins: { // Compile support scripts
                src: ['node_modules/underscore/underscore.js',
                      'node_modules/async/lib/async.js',
                      'node_modules/dustjs-linkedin/dist/dust-full.js',
                      'node_modules/dustjs-helpers/dist/dust-helpers.js',
                      'bower_components/fastclick/lib/fastclick.js',
                      'bower_components/inobounce/inobounce.js'],
                dest: 'public/support/plugins.min.js',
            }
        },
        uglify: { // Compress Javascript files
            options: { mangle: true },
            js: {
                files: {
                    'public/support/playlist.min.js': ['private/scripts/playlist.js'],
                    'public/support/scripts.min.js': ['public/support/scripts.min.js'],
                    'public/support/plugins.min.js': ['public/support/plugins.min.js']
                }
            }
        },
        sass: { // Compile and compress Sass files
            dist: {
                options: { style: 'compressed', sourcemap: 'none' },
                files: { 'public/support/styles.min.css': 'private/styles/core.scss' }
            }
        },
        watch: {
            js: { // Watch for changes in the Javascript directory
                files: ['private/scripts/*.js'],
                tasks: ['concat', 'uglify'],
                options: { livereload: true  }
            },
            css: { //  Watch for changes in the Sass directory
                files: ['private/styles/*.scss'],
                tasks: ['sass'],
                options: { livereload: true }
            }
        }
    });

    require('load-grunt-tasks')(grunt); // Autoload Grunt modules
};
