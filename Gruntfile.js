module.exports = function (grunt) {
    grunt.initConfig({
        connect: {
            localdev: {
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
            clouddev: {
                options: {
                    port: 8080,
                    livereload: 35729,
                    hostname: '0.0.0.0'
                },
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
                    rxjs: "rxjs/dist/rx.all.js",
                    gsap: "gsap/src/minified/TweenMax.min.js"
                }
            }
        }
    });
    
    grunt.loadNpmTasks("grunt-bowercopy")
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('localserver', function () {
        grunt.task.run([
            'connect:localdev:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('cloudserver', function () {
        grunt.task.run([
            'connect:clouddev',
            'watch'
        ]);
    });
    
    grunt.registerTask("default", ['bowercopy', 'ts', 'localserver']);
    grunt.registerTask("cloud", ['bowercopy', 'ts', 'cloudserver']);
    grunt.registerTask("nobower", ['ts', 'server']);
};