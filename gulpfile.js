var gulp = require('gulp');
var del = require('del');
var cleanCSS = require('gulp-clean-css');
var jshint = require('gulp-jshint');
var minify = require('gulp-minify');

gulp.task('clean', function() {
  del.sync('dist/');
});

gulp.task('move-bower-components', ['clean'], function() {
  gulp.src('bower_components/bootstrap/dist/css/bootstrap.min.css')
  .pipe(gulp.dest('dist/css'));

  gulp.src('bower_components/bootstrap/dist/js/bootstrap.min.js')
  .pipe(gulp.dest('dist/js'));

  gulp.src('bower_components/jquery/dist/jquery.min.js')
  .pipe(gulp.dest('dist/js'));

  gulp.src('bower_components/angular/angular.min.js')
  .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-css', function() {
  return gulp.src('src/resources/css/*css')
  .pipe(cleanCSS({ compatibility: 'ie8' }))
  .pipe(gulp.dest('dist/css'));
});

gulp.task('process-js', function() {
  gulp.src('src/scripts/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(minify({
    ext: {
      min: '.min.js'
    }
  }))
  .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['move-bower-components', 'minify-css', 'process-js'], function() {
  gulp.watch('src/scripts/*.js', ['process-js']);
  gulp.watch('src/resources/css/*.css', ['minify-css']);
});
