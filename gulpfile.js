'use strict';
 
var path = require('path');
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var swig = require('gulp-swig');
 
gulp.task('sass', function () {
 return gulp.src('./src/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./build'));
});

gulp.task('compress', function() {
  return gulp.src('./src/**/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build'));
});

gulp.task('templates', function() {
  // Assume all partials start with an underscore 
  // You could also put them in a folder such as source/templates/partials/*.hbs 
  var partials = gulp.src(['src/**/_*.hbs'])
    .pipe(handlebars({
    	handlebars: require('handlebars')
    }))
    .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
      imports: {
        processPartialName: function(fileName) {
          // Strip the extension and the underscore 
          // Escape the output with JSON.stringify 
          return JSON.stringify(path.basename(fileName, '.js').substr(1));
        }
      }
    }));

    var templates =  gulp.src('./src/**/*.hbs')
    .pipe(handlebars({
    	handlebars: require('handlebars')
    }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'Myauction',
      noRedeclare: true, // Avoid duplicate declarations 
    }))

    //Output both the partials and the templates as build/js/templates.js
    return merge(partials, temlates)
    .pipe(concat('temlates.js'))
    .pipe(gulp.dest('build/'));
});

gulp.task('swig', function() {
  gulp.src('./src/index.html')
    .pipe(swig({defaults: { cache: false }}))
    .pipe(gulp.dest('build/'))
});
 
gulp.task('watch', function () {
  gulp.watch('./src/**/*.scss', ['sass']);
  gulp.watch('./src/**/*.js', ['compress']);
  gulp.watch('./src/**/*.hbs', ['templates']);
  gulp.watch('./src/**/*.html', ['swig']);

});

gulp.task('default', ['sass', 'compress', 'templates', 'swig' 'watch']);