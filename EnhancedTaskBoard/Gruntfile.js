module.exports = function (grunt) {
    grunt.initConfig({
        ts: {
            options: {
                compile: true,
                removeComments: true,
                target: 'es5',
                module: 'amd',
                sourceMap: false,
                sourceRoot: '',
                mapRoot: '',
                declaration: false
            },
            build: {
                src: ['TWAExtensions.EnhancedTaskBoard.debug.ts']
            }
        },
        uglify: {
            build: {
                files: [
                    { src: 'TWAExtensions.EnhancedTaskBoard.debug.js', dest: 'TWAExtensions.EnhancedTaskBoard.min.js' }
                ]
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            build: {
                src: ['Scripts/amplify.min.js'],
                dest: 'Scripts/bundle.js'
            }
        },
        less: {
            build: {
                files: [
                    { src: 'Content/style.less', dest: 'Content/style.css' }
                ]
            },
            minify: {
                options: {
                    cleancss: true
                },
                files: [
                    { src: 'Content/style.less', dest: 'Content/style.min.css' }
                ]
            }
        },
        compress: {
            build: {
                options: {
                    archive: 'output/EnhancedTaskBoard.zip'
                },
                files: [
                    { src: ['TWAExtensions.EnhancedTaskBoard.*.js', 'manifest.xml'] },
                    { expand: true, flatten: true, src: ['Scripts/bundle.js', 'Content/style.min.css'] }
                ]
            }
        },
        watch: {
            ts: {
                files: ['TWAExtensions.EnhancedTaskBoard.debug.ts'],
                tasks: ['ts:build']
            },
            less: {
                files: ['Content/style.less'],
                tasks: ['less:build']
            }
        },
        clean: {
            build: {
                src: [
                    'TWAExtensions.EnhancedTaskBoard.debug.js',
                    'TWAExtensions.EnhancedTaskBoard.min.js',
                    'tscommand.tmp.txt',
                    'Scripts/bundle.js',
                    'Content/style.css',
                    'Content/style.min.css',
                    'output/*'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['clean', 'ts', 'less:build']);
    grunt.registerTask('dist', ['clean', 'ts', 'uglify', 'concat', 'less', 'compress']);
};