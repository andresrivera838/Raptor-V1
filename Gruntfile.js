module.exports = function(grunt) {
    var path,
        devPath,
        buildPath,
        jsIncludePath;


    path = require('path');
    devPath = '_dev/';
    buildPath = './build/';
    jsIncludePath = devPath + '/js/includeJS.json';

    grunt.initConfig({
        meta: {
            srcPath: devPath + 'js/com'
        },
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            game:{
                src: devPath + 'js/game/**/*.js',
                dest: devPath + 'js/distGame.js'
            },
            js: {
                src: grunt.file.readJSON(jsIncludePath)['includes'],
                dest: devPath + 'js/minions.js'
            },
            extras: {
                src: [devPath + 'js/vendor/*.js'],
                dest: devPath +'js/vendor.js'
            }
        },
        injector: {
            options: {
                ignorePath: devPath,
                addRootSlash: false
            },
            local_dependencies: {
                files: {
                    './_dev/index.html': [devPath + 'js/vendor/*.js', devPath + 'css/vendor/*.css', devPath + 'css/main.css'],
                    './_dev/desafio-2.html': [devPath + 'js/vendor/*.js', devPath + 'css/vendor/*.css', devPath + 'css/main.css']
                }
            }
        },
        compass: {
            dist: {
                options: {
                    config: 'config.rb'
                }
            }
        }, 
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: {
                    '_dev/js/minions.min.js': devPath + 'js/minions.js',
                    '_dev/js/vendor.min.js': devPath + 'js/vendor.js'
                }
            }
        },
        watch: {
            myJsFiles: {
                files: [ devPath + 'js/com/**/*.js', devPath + 'js/main.js'],
                tasks: ['concat']
            },
            mySassFiles: {
                files: [devPath + 'sass/**/*.scss',devPath + 'sass/**/*.sass', '_dev/sprites/**/*.png'],
                tasks: ['compass']
            },
            injectorTask: {
                files: [devPath + 'js/vendor/**/*.js', devPath + 'css/**/*.css'],
                options: {
                    event: ['added', 'deleted'],
                },
                tasks: ['injector']
            }
        },

        cssmin: {
            main: {
                /*src: ['_development/css/main.css'],
                dest: ['_development/css/main.min.css']*/
                files: {
                    "build/css/main.min.css": [devPath + "css/main.css"]
                }
            }
        },

        copy: {
            main: {
                files: [{
                        cwd: devPath,
                        expand: true,
                        src: ['php/**/*.php'],
                        dest: buildPath
                    }, {
                        cwd: devPath,
                        expand: true,
                        src: ['img/**'],
                        dest: buildPath
                    },
                    {
                        cwd: devPath,
                        expand: true,
                        src: ['fonts/**'],
                        dest: buildPath
                    },
                    // {
                    //     cwd: devPath + 'js/',
                    //     expand: true,
                    //     src: ['vendor/vendor.min.js'],
                    //     dest: buildPath + 'js/'
                    // },
                    {
                        cwd: devPath + 'js/',
                        expand: true,
                        src: ['vendor.min.js'],
                        dest: buildPath + 'js/'
                    },
                    {
                        cwd: devPath + 'js/',
                        expand: true,
                        src: ['minions.min.js'],
                        dest: buildPath + 'js/'
                    },
                    {
                        cwd: devPath + 'css/',
                        expand: true,
                        src: ['vendor/jquery-ui.min.css'],
                        dest: buildPath + 'css/'
                    },
                    {
                        cwd: devPath + 'css/',
                        expand: true,
                        src: ['vendor/bootstrap.min.css'],
                        dest: buildPath + 'css/'
                    }, 
                    {
                        cwd: devPath + 'css/',
                        expand: true,
                        src: ['main.min.css'],
                        dest: buildPath + 'css/'
                    },
                    {
                        cwd: devPath,
                        expand: true,
                        src: ['humans.txt'],
                        dest: buildPath
                    }, {
                        cwd: devPath,
                        expand: true,
                        src: ['**/*.html'],
                        dest: buildPath
                    }

                ]
            }
        },
        clean: {
            build: {
                src: ["build/img/sprites/"]
            }
        },
        useref: {
            // specify which files contain the build blocks
            html: 'build/**/*.html',
            // explicitly specify the temp directory you are working in
            temp: 'temp'
        }

    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-useref');
    grunt.loadNpmTasks('grunt-injector');
    // grunt.registerTask('bower', ['bower']);

    grunt.registerTask('default', ['clean','concat', 'uglify', 'cssmin', 'cp','useref',]);
    // grunt.registerTask('default', ['clean','cp', 'useref', 'concat', 'uglify', 'cssmin']);
    grunt.registerTask('cp', ['copy']);
    // grunt.registerTask('mia', ['cp', 'useref', 'concat', 'uglify', 'cssmin']);
    grunt.registerTask('live', 'watch');
};

//src: grunt.file.readJSON('includeJS.json')['includes'],
