

//Global configuration
var imageFolder = 'img/';
var imageSrcFolder = 'img_src/';
var cssFolder = 'css/';
var jsFolder = 'js/';
var libFolder = 'lib/';

//Application folder structure
var application_path = 'app/';
var app_img_src = application_path + imageSrcFolder;
var app_img = application_path + imageFolder;
var app_css = application_path + cssFolder;
var app_css_lib = application_path + cssFolder + libFolder;
var app_js = application_path + jsFolder;
var app_js_lib = application_path + jsFolder + libFolder;
//Distributive folder structure
var dist_path = 'dist/';
var dist_img = dist_path + imageFolder;
var dist_css = dist_path + cssFolder;
var dist_css_lib = dist_path + cssFolder + libFolder;
var dist_js = dist_path + jsFolder;
var dist_js_lib = dist_path + jsFolder + libFolder;
var dist_components = dist_path + "components";

var node_modules = 'node_modules/';
var bower_components = 'bower_components/';

var port = 8080;
var ngrok = require('ngrok');

//Project images sizes
var projectImageSizes = [
    {
        width: 358,
        height: 190,
        aspectRatio: false
    },
    {
        width: 259,
        height: 150,
        aspectRatio: false
    },
    {
        width: 333,
        height: 190,
        aspectRatio: false
    },
    {
        width: 690,
        height: 421,
        aspectRatio: false
    },
    {
        width: 273,
        height: 161,
        aspectRatio: false
    }
   ];

//Main images sizes
var mainImageSizes = [
    {
        width: 1134,
        height: 500,
        aspectRatio: false
    },
    {
        width: 836,
        height: 450,
        aspectRatio: false
    },
    {
        width: 696,
        height: 350,
        aspectRatio: false
    }
];

//Icon images sizes
var iconsImageSizes = [
    {
        width: 30,
        height: 30,
        quality: 80
    },
    {
        width: 50,
        height: 50,
        quality: 80
    }
];


module.exports = function (grunt) {
  'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Copy fresh css, js from npm modules directory to dev folders
        copy: {
            mainlibs: {
                files: [ {
                    src: node_modules + 'normalize.css/normalize.css',
                    dest: app_css_lib + 'normalize/normalize.css'
                }, {
                    src: node_modules + 'jquery/dist/jquery.js',
                    dest: app_js_lib + 'jquery/jquery.js'
                }, {
                    expand:true,
                    cwd: bower_components,
                    src:  ['**'],
                    dest: dist_components
                },{
                  expand: true,
                  cwd: app_img,
                  src:  ['**'],
                  dest: dist_img
                }]
            }
        },

        //Process .html file
        processhtml: {
            dist: {
                files: [{
                    dest: dist_path + 'index.html',
                    src: [application_path + 'index.html']
                }]
            }
        },

        // Remove distributive directory
        clean: {
            dev: {
                src: [dist_path]
            }
        },

        // Create distributive directory
        mkdir: {
            dev: {
                options: {
                    create: [dist_path, dist_img, dist_js, dist_css]
                }
            }
        },

        // Uglify .js files
        uglify: {
            build_helper: {
                src: app_js + 'helper.js',
                dest: dist_js + 'helper.js'
            },
            build_resumebuilder: {
                src: app_js + 'resumeBuilder.js',
                dest: dist_js + 'resumeBuilder.js'
            },
            build_jquery: {
                src: app_js_lib + 'jquery/jquery.js',
                dest: dist_js_lib + 'jquery/jquery.js'
            }
        },

        // Minify .css files
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: app_css,
                    src: ['**/*.css', '!*.min.css'],
                    dest: dist_css
                    }]
            }
        },

        // Minify .html file
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: dist_path,
                    dest: dist_path,
                    src: ['*.html']
                }]
            }
        },

        // Create responsive images
        responsive_images: {
            dev_project: {
                options: {
                    sizes: projectImageSizes
                },
                files: [{
                    expand: true,
                    src: ['*.{jpg,gif,png}'],
                    cwd: app_img_src,
                    dest: dist_img
                }]
            },

            dev_main: {
                options: {
                    sizes: mainImageSizes
                },
                files: [{
                    expand: true,
                    src: ['*.{jpg,gif,png}'],
                    cwd: app_img_src + 'main',
                    dest: dist_img + 'main'
                }]
            },

            dev_icons: {
                options: {
                    sizes: iconsImageSizes
                },
                files: [{
                    expand: true,
                    src: ['*.{jpg,gif,png}'],
                    cwd: app_img_src + 'icons',
                    dest: dist_img + 'icons'
                }]
            },

        },

        // Minify images
        imagemin: {
            target: {
                files: [{
                    expand: true,
                    cwd: dist_img,
                    src: ['**/*.{png,jpg,gif}'],
                    dest: dist_img
             }]
            }
        },

        // Run web server
        express: {
            options: {
                port: 8080,
                delay: 10
            },
            dev: {
                options: {
                    script: 'server.js'
                }
            }
        },

        // Run pagespeed tests
        pagespeed: {
            options: {
                nokey: true,
                locale: "en_GB",
                threshold: 40
            },
            local: {
                options: {
                    strategy: "desktop"
                }
            },
            mobile: {
                options: {
                    strategy: "mobile"
                }
            }
        }
    });

    // Load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('default', ['clean', 'copy:mainlibs', 'mkdir', 'uglify', 'cssmin', 'processhtml',  'htmlmin']);
};
