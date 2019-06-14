'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var csso = require('gulp-csso');
var gulpMerge = require('merge2');
var cssComb = require('gulp-csscomb');
var spritesmith = require('gulp.spritesmith');
var imagemin = require('gulp-imagemin');
var run = require('run-sequence');
var del = require('del');
var rename = require('gulp-rename');
var ghPages = require('gulp-gh-pages');

gulp.task('style', function(){ // Создаем таск Sass
    return
      gulp.src('sass/style.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(postcss([
        autoprefixer({browsers: [
          'last 2 versions'
          ]})
        ]))
      .pipe(cssComb())
      .pipe(gulp.dest('build/css'))
      .pipe(csso())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('build/css'))
      .pipe(server.stream()); // Обновляем CSS на странице при изменении
});

gulp.task('serve', function() {
  server.init({
    server: 'build',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
});
gulp.task('copyJS', function(){
  return gulp.src(['js/*.js'])
    .pipe(gulp.dest('build/js'));
});

gulp.task('clean', function(){
  return del('build/img');
});

gulp.task('copyHtml', function(){
  return gulp.src(['*.html'], {base: '.'})
    .pipe(gulp.dest('build'));
});
gulp.task('copy', function(){
  return gulp.src([
    'fonts/**/*.{eot,svg,ttf,woff,woff2}',
    'js/**',
    'img/*.svg',
    '*.html'
  ], {
    base: '.'
  })
    .pipe(gulp.dest('build'));
});
gulp.task('images', function() {
  return gulp.src('img/**/*.{jpg,png,gif}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('copyBootstrapJS', function(){
  return gulp.src(['node_modules/bootstrap-sass/assets/javascripts/*.js'])
    .pipe(gulp.dest('build/js'));
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('watch', function() {
    gulp.watch('sass/**/*.{scss,sass}', gulp.parallel('style')); // Наблюдение за sass файлами
    gulp.watch('*.html', gulp.parallel('copyHtml'));
    gulp.watch('js/*.js', gulp.parallel('copyJS'));
    gulp.watch('build/*.html').on('change', server.reload);
    gulp.watch('build/js/*.js').on('change', server.reload);
});
gulp.task('build', gulp.parallel('clean', 'copy', 'copyBootstrapJS', 'images', 'style'));

gulp.task('server', gulp.parallel('build', 'serve', 'watch'));

gulp.task('default', gulp.parallel('style', 'serve', 'watch'));
