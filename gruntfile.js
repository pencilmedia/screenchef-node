module.exports = function(grunt) {


  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-include-replace');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  require('load-grunt-tasks')(grunt);

  var optionsContext = grunt.option('context') || '';
  var optionsDev = grunt.option('dev') || false; 

  grunt.initConfig({
    includereplace: {
      your_target: {
        options: {
          globals: {
            // GLOBAL VARIABLES

            // Foundations
            titleHmpg: 'screenchef.com',
            companyTitle: 'Ralph Adrian Garcia',
            companyDescription: 'Interaction Designer and Prototyper',

            // Use them as e.g. @@context
            context: optionsContext,  

          }
          
        },
        // Files to perform replacements and includes with
        src: './app/**/*.html',
        // Destination directory to copy files to
        dest: 'dist/'
      }
    },
    copy: {
      main: {
        files: [{
            src: './app/**/*',
            dest: './dist/'
          }

        ],
      },
    },
    clean: {
      build: {
        src: ["./dist/**/*"]
      }
    },
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          update: true, // Update changes made only
          noCache: true,
          sourcemap: 'auto',
          style: 'nested' // we don't want to compress it
        },
        files: {                         // Dictionary of files
           'app/assets/css/main.css': 'app/assets/scss/main.scss'  // 'destination': 'source'
        },
        dist: {
          files: {
             'app/assets/css/main.css': 'app/assets/scss/main.scss'  // 'destination': 'source'
          }
        }
      }
    },
    watch: {
      scripts: {
        files: ['./app/**/*.html', './app/**/*.scss', './app/**/*.js', './app/**/*.tpl'],
        tasks: ['build'],
        options: {
          livereload: true,
          nospawn: true,
        },
      },
      sass: {
        // We watch and compile sass files as normal but don't live reload here
        files: ['./app/**/*.scss'],
        tasks: ['sass'],
      },

    },
    connect: {
      server: {
        options: {
          port: 9908,
          base: './dist/app',
          hostname: 'localhost'
        }
      }
    }
  });

  grunt.registerTask('build', ['clean', 'copy', 'includereplace', 'sass']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);
};
