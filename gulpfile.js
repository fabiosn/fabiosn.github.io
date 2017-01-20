var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');

gulp.task('minify-css', function() {
  return gulp.src('src/resources/css/*css')
  .pipe(cleanCSS({ compatibility: 'ie8' }))
  .pipe(gulp.dest('dist/css'));
});

gulp.task('move-bower-components', function() {
  gulp.src('bower_components/bootstrap/dist/css/bootstrap.min.css')
  .pipe(gulp.dest('dist/css'));
});

gulp.task('default', function() {
  console.log('running gulp task');
});
