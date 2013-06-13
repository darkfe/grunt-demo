'use strict';

module.exports = function(grunt){

    grunt.initConfig({
        config : {
            variables : {
                namespace : '_SDA_'
            }
        },
        jshint : {
             options: {
            asi : true,
             boss : true,
             evil : true,
             forin : true,
             immed : false,
              curly: true,
              eqeqeq: true,
              eqnull: true,
              browser: true,
                lastsemic : true,
                laxbreak : true,
                noarg : false,
                noempty : false,
                nomen : false,
                onevar : false,
                plusplus : false,
                regexp : false,
                undef : false,
                sub : true,
                white : false,
              globals: {
              }
            },
            beforeCombiner : {
                src : ['src/**/*.js','lib/**/*.js']
            },

            afterCombiner : {
                src : 'build/min.js'
            }
        },

        combiner : {
            options : {
                basePath : 'src/'
            },
            build : {
                src : 'src/main.js',
                dest : 'build/source.js'
            }
        },

        uglify : {
            options : {
                beautify : true,
                mangle : false
            },
            checker :  {
                files : {
                    'build/source-format.js' : 'build/source.js'
                }
            }
        },

        'string-replace' : {
            variables : {
                options : {
                    replacements : [
                        {
                            pattern : /{@([\w_]+)}/g,
                            replacement : function($match,$1){
                                return grunt.config.get('config.variables.' + $1);
                            } 
                        }
                    ] 
                },

                files : {
                    'build/source.js': 'build/source.js'
                }
            },
            debugverion : {
                options : {
                    replacements : [
                        {
                            pattern : /\/\*#DEBUG#([\S\s]*?)#DEBUG#\*\//g,
                            replacement : "$1"
                        }
                    ] 
                },

                files : {
                    'build/debug.js' : 'build/source.js'
                }
            }
        },

        min : {
            dist : {
                src : 'build/source.js',
                dest : 'build/min.js'
            }
        },

        packer : {
            build : {
                src : 'build/min.js',
                dest : 'build/pack.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-yui-compressor');
    grunt.loadNpmTasks('grunt-combiner');
    grunt.loadNpmTasks('grunt-jspacker');
    grunt.loadNpmTasks('grunt-string-replace');

    grunt.registerTask('default',[
                       'combiner',
                       'string-replace',
                       'min',
                       'packer'
                       ]);
}
