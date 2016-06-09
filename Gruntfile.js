module.exports = function (grunt) {
    grunt.initConfig({
        connect: {
            options: {
                port: 1337,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: 'app'
                }
            }
        },
        watch: {
            files: ['**/*.ts', '**/*.html'],
            tasks: [ 'ts' ],
            options: {
                livereload: true
            }
        },
        ts: {
            options: {
                fast: 'never',
            },
            default: {
                tsconfig: true
            }
        },
        bowercopy: {
            libs: {
                options: {
                    destPrefix: "app/js/vendor/",
                    clean: true
                },
                files: {
                    requirejs: "requirejs/require.js",
                    threejs: "three.js/three.js",
                    rxjs: "rxjs/dist/rx.all.js"
                }
            }
        }
    });
    
    grunt.loadNpmTasks("grunt-bowercopy")
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('server', function () {
        grunt.task.run([
            'connect:livereload',
            'watch'
        ]);
    });
    
    grunt.registerTask("default", ['bowercopy', 'ts', 'server']);
    grunt.registerTask("nobower", ['ts', 'server']);
};