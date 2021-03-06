module.exports = function(grunt) {
    grunt.initConfig({
        // Import package manifest
        pkg: grunt.file.readJSON("package.json"),
        // Banner definitions
        meta: {
            banner: "/*\n" + " *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" + " *  <%= pkg.description %>\n" + " *\n" + " *  Made by <%= pkg.author.name %>\n" + " *  Under <%= pkg.license %> License\n" + " */\n"
        },
        // Concat definitions
        concat: {
            options: {
                banner: "<%= meta.banner %>"
            },
            dist: {
                src: ["src/jquery.subscribe2.js"],
                dest: "dist/jquery.subscribe2.js"
            }
        },
        // Lint definitions
        jshint: {
            files: ["src/jquery.subscribe2.js", "test/**/*"],
            options: {
                jshintrc: ".jshintrc"
            }
        },
        // Minify definitions
        uglify: {
            my_target: {
                src: ["dist/jquery.subscribe2.js"],
                dest: "dist/jquery.subscribe2.min.js"
            },
            options: {
                banner: "<%= meta.banner %>"
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: "src",
                    src: ["jquery.subscribe2.css"],
                    dest: "dist",
                    ext: ".subscribe2.min.css"
                }]
            }
        },
        // karma test runner
        karma: {
            unit: {
                configFile: "karma.conf.js",
                background: true,
                singleRun: false,
                browsers: ["PhantomJS", "Firefox"]
            },
            //continuous integration mode: run tests once in PhantomJS browser.
            travis: {
                configFile: "karma.conf.js",
                singleRun: true,
                browsers: ["PhantomJS"]
            },
        },
        // watch for changes to source
        // Better than calling grunt a million times
        // (call 'grunt watch')
        watch: {
            files: ["src/*", "test/**/*"],
            tasks: ["default"]
        }
    });
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks("grunt-contrib-coffee");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-karma");
    grunt.registerTask("travis", ["jshint", "karma:travis"]);
    grunt.registerTask("build", ["concat", "uglify", "cssmin"]);
    grunt.registerTask("default", ["jshint", "build", "karma:unit:run"]);
};