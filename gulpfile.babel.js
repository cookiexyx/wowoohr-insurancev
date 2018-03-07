'use strict';

import gulp from 'gulp';
import rename from 'gulp-rename';
var beautify_html = require('js-beautify').html;
import through from 'through2';
import gutil from 'gulp-util';
const PluginError = gutil.PluginError;
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var gulpsync = require('gulp-sync')(gulp);
var minifyCss = require('gulp-minify-css');
var browserSync = require('browser-sync').create();
var jsonHandle = require('./jsonMiddleware.js')
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var htmlreplace = require('gulp-html-replace');
var es = require('event-stream');
var version = require('gulp-version-number');
var htmlminify = require("gulp-html-minify");

const versionConfig = {
  'value': '%MDS%',
  'append': {
    'key': 'ver=v',
    'to': ['css', 'js'],
  },
};


var config = {  
    src:"src/**.html",
    css:"src/styles/*.css",
    js:"src/scripts/**",
    data:"src/data/*.*",
    views:"src/views/**",
    viewcss:"src/styles/views/*.css",
    controllers:"src/controllers/**"
}

gulp.task('build', function() {
    return gulp.src(config.src)    
    .pipe(htmlminify())
    .pipe(version({
      'value': '%MDS%',
      'append': {
        'key': 'ver',
        'to': ['css', 'js'],
        'cover' : 1
      }
}))
    .pipe(gulp.dest('dist/'))
});

gulp.task('favicon', function() {
    return gulp.src('src/favicon.ico')
    .pipe(gulp.dest('dist/'))
});


gulp.task('clean', function () {
    return gulp.src('./dist', {read: false})
        .pipe(clean());
});

gulp.task('minify-css', function() {
  return gulp.src('src/styles/*.css')
    .pipe(sourcemaps.init())
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write())
    .pipe(rename({
            suffix: '.min'
        }))
    .pipe(gulp.dest('src/css/'))
	.pipe(browserSync.reload({stream:true}));
});

gulp.task('minify-css-product', function() {
  return gulp.src('src/styles/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(concat('main.css'))
    .pipe(rename({
            suffix: '.min'
        }))
    .pipe(gulp.dest('src/css/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('contact-css', ['minify-css'], function() {
  return gulp.src(['src/libs/*.css','src/css/main.min.css'])
    .pipe(concat('style.css'))
    .pipe(rename({
            suffix: '.min'
        }))
    .pipe(gulp.dest('dist/css/'))
	.pipe(browserSync.reload({stream:true}));
});

gulp.task('contact-css-product', function() {
  return gulp.src('src/styles/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(concat('style.css'))
    .pipe(rename({
            suffix: '.min'
        }))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('contact-js', function() {
  return gulp.src(['src/libs/jquery/jquery.min.js','src/libs/angular/*.js','src/libs/angular-route/*.js','src/libs/angular-resource/*.js', 'src/libs/angular-touch/*.js', 'src/libs/*.js'])
    .pipe(concat('lib.js'))
    // .pipe(uglify({mangle: false}))
    .pipe(rename({
            suffix: '.min'
        }))    
    .pipe(gulp.dest('dist/scripts/'))
	.pipe(browserSync.reload({stream:true}));
});




function fixConfigFile() {
    return es.map(function(file, cb) {
        var fileContent = file.contents.toString().replace('environment = "local"', 'environment = "public"');
        file.contents = new Buffer(fileContent);
        cb(null, file);
    });
}

function fixConfigFilePrototype() {
    return es.map(function(file, cb) {
        var fileContent = file.contents.toString().replace('environment = "local"', 'environment = "mock"');
        file.contents = new Buffer(fileContent);
        cb(null, file);
    });
}


gulp.task("updated-envir", function(){
    return gulp.src('src/scripts/services/config.js')
    .pipe(fixConfigFile())
    .pipe(rename({
            suffix: '.public'
        }))
    .pipe(gulp.dest('src/scripts/services/'))
});


gulp.task("updated-prototype", function(){
    return gulp.src('src/scripts/services/config.js')
    .pipe(fixConfigFilePrototype())
    .pipe(rename({
            suffix: '.prototype'
        }))
    .pipe(gulp.dest('src/scripts/services/'))
});


gulp.task('minify-js', function() {
  return gulp.src(['src/scripts/**', '!src/scripts/services/config.js', '!src/scripts/services/config.prototype.js'])
    .pipe(concat('index.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(browserSync.reload({stream:true}));
});


gulp.task("copy-scripts", function(){
    return gulp.src(['src/scripts/**', '!src/scripts/services/config.public.js', '!src/scripts/services/config.prototype.js'])
    .pipe(concat('index.js'))
    .pipe(gulp.dest('dist/scripts'))
	.pipe(browserSync.reload({stream:true}));
});

gulp.task("copy-scripts-prototype", function(){
    return gulp.src(['src/scripts/**', '!src/scripts/services/config.js', '!src/scripts/services/config.public.js'])
    .pipe(concat('index.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(browserSync.reload({stream:true}));
});


gulp.task("copy-public-scripts", function(){
    return gulp.src(['src/scripts/**', '!src/scripts/services/config.js', '!src/scripts/services/config.prototype.js'])
    .pipe(concat('index.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(browserSync.reload({stream:true}));
});


gulp.task("copy-font", function(){
    return gulp.src('src/font/**/*')
    .pipe(gulp.dest('dist/css/fonts/'))
	.pipe(browserSync.reload({stream:true}));
});

gulp.task("copy-images", function(){
    return gulp.src('src/images/*')
    .pipe(gulp.dest('dist/images/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task("copy-data", function(){
    return gulp.src(config.data)
    .pipe(gulp.dest('dist/data/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task("views", function(){
    return gulp.src(config.views)
    .pipe(gulp.dest('dist/views/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task("viewcss", function(){
    return gulp.src(config.viewcss)
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(concat('views-style.css'))
    .pipe(rename({
            suffix: '.min'
        }))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({stream:true}));
});


gulp.task("controllers", function(){
    return gulp.src(config.controllers)
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('dist/scripts/controllers/'))
    .pipe(browserSync.reload({stream:true}));
});


gulp.task('serve', function() {
    browserSync.init({
        server: "./dist",
        middleware: [{        
            route: "/data",
            handle: function (req, res, next) {
                jsonHandle(req, res)
            }
        }]        
    });

    gulp.watch([config.src], ['build']);
    gulp.watch([config.css,'src/libs/*.css'], ['contact-css']);
    gulp.watch([config.js,'src/libs/*.js'], ['contact-js','copy-scripts']);
    gulp.watch(['src/images/*'], ['copy-images']);
    gulp.watch([config.data], ['copy-data']);
    gulp.watch([config.views], ['views']);
    gulp.watch([config.viewcss], ['viewcss']);
    gulp.watch([config.controllers], ['controllers']);
});


gulp.task('default', gulpsync.sync(['clean', 'contact-css','contact-js', 'copy-scripts', 'build', 'serve','copy-images', 'copy-data','copy-font',"views", "viewcss", "controllers"]));

gulp.task('prod', gulpsync.sync(['clean', 'contact-css-product','contact-js', 'updated-envir', 'minify-js', 'build', 'favicon', 'copy-images', 'copy-font',"views", "viewcss", "controllers"]));

gulp.task('demo', gulpsync.sync(['clean', 'contact-css','contact-js', 'copy-scripts', 'build', 'copy-images', 'copy-data','copy-font',"views", "viewcss", "controllers"]));

gulp.task('prototype', gulpsync.sync(['clean', 'contact-css','contact-js', 'updated-prototype', 'copy-scripts-prototype', 'build', 'copy-images', 'copy-font',"views", "viewcss", "controllers"]));

