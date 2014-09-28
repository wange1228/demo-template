module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        css_combo: {
            options: {},
            target: {
                files: {
                    'dest/home.css': ['src/home.css']
                }
            }
        },

        sprite: {
            allslice: {
                files: [{
                    expand: true,
                    cwd: 'dest',
                    src: ['*.css'],
                    dest: './',
                    ext: '.css'
                }],
                options: {
                    engine: 'gm',
                    algorithm: 'binary-tree',
                    imagestamp: false,
                    cssstamp: true,
                    newsprite: false
                }
            }
        },

        cssmin: {
            compress: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },

        copy: {
            main: {
                expand: true,
                cwd: 'dist',
                src: '*.js',
                dest: 'js/<%= pkg.family %>/<%= pkg.name %>/<%= pkg.version %>',
                filter: 'isFile'
            }
        },
        shell: {
            spmBuild: {
                command: 'spm build',
                options: {
                    stdout: true
                }
            }
        },

        watch: {
            combo: {
                files: 'src/*.css',
                tasks: ['css_combo']
            },
            sprite: {
                files: 'dest/*.css',
                tasks: ['sprite']
            },
            cssmin: {
                files: 'css/*css',
                tasks: ['cssmin']
            },
            scripts: {
                files: 'src/*.js',
                tasks: ['shell', 'copy']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-css-combo');
    grunt.loadNpmTasks('grunt-sprite');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('default', ['watch']);
}
