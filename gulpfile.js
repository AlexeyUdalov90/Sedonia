'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var minify = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');

gulp.task('style', function () {
  gulp.src('sass/style.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(postcss([autoprefixer()]))
      .pipe(gulp.dest('css'))
      .pipe(server.stream())
      .pipe(minify())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('css'));
});

gulp.task('images', function () {
  return gulp.src('img/**/*.{png,jpg,svg}')
      .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.jpegtran({progressive: true}),
        imagemin.svgo()
      ]))
      .pipe(gulp.dest('img'));
});

gulp.task('serve', ['style'], function () {
  server.init({
    server: '.',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('sass/**/*.{scss,sass}', ['style']);
  gulp.watch('*.html').on('change', server.reload);
});
