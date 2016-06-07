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
        }
    });
    
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('server', function () {
        grunt.task.run([
            'connect:livereload',
            'watch'
        ]);
    });
    
    grunt.registerTask("default", ['ts', 'server']);
    //grunt.registerTask("default", ['ts']);
};