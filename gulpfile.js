var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var del = require('del');
var cleanCSS = require('gulp-clean-css');
var jshint = require('gulp-jshint');
var minify = require('gulp-minify');
var imagemin = require('gulp-imagemin');
var request = require('request-promise');
var file = require('gulp-file');

gulp.task('clean', function() {
  del.sync(['dist/', '!dist/data']);
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

  gulp.src('bower_components/font-awesome/css/font-awesome.min.css')
  .pipe(gulp.dest('dist/css'));

  gulp.src('bower_components/font-awesome/fonts/*')
  .pipe(gulp.dest('dist/fonts'));
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
    },
    noSource: true
  }))
  .pipe(gulp.dest('dist/js'));
});

gulp.task('process-images', function() {
  gulp.src('src/resources/images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'));
});

gulp.task('get-data', function() {
  var requestOptions = {
    headers: {
      'User-Agent': 'fabiosn.github.io',
      'Authorization': `token ${process.env.ACCESS_TOKEN}`,
    },
    json: true,
  };

  //get user data
  requestOptions.uri = 'https://api.github.com/users/fabiosn';

  request(requestOptions)
  .then(function(userData) {
    file('user.json', JSON.stringify(userData), { src: true })
    .pipe(gulp.dest('dist/data'));
  })
  .catch(function(err) {
    console.log(err);
  });

  //get repos data
  requestOptions.uri = 'https://api.github.com/users/fabiosn/repos';

  request(requestOptions)
  .then(function(reposData) {
    return reposData;
  })
  .then(function(reposData) {
    var requestPromises = [];

    reposData.map(function(repo) {
      requestOptions.uri = repo.contents_url.replace(/{.*}/, 'dist/images/thumbnail.png');

      requestPromises.push(
        request(requestOptions)
        .then(function(thumbnailData) {
          repo.thumbnail = thumbnailData;
        })
        .catch(function(err) {
          console.log(err);
        })
      );
    });

    return Promise.all(requestPromises)
    .then(function() {
      return reposData;
    });
  })
  .then(function(reposData) {
    file('repos.json', JSON.stringify(reposData), { src: true })
    .pipe(gulp.dest('dist/data'));
  })
  .catch(function(err) {
    console.log(err);
  });

  //just checking the rate_limit
  requestOptions.uri = 'https://api.github.com/rate_limit';

  request(requestOptions)
  .then(function(response) {
    console.log('Remaining requests: ' + response.rate.remaining);
  })
  .catch(function(err) {
    console.log(err);
  });
});

gulp.task('default', ['move-bower-components', 'minify-css', 'process-js', 'process-images'], function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('./index.html').on('change', browserSync.reload);
  gulp.watch('./dist/**/*').on('change', browserSync.reload);

  gulp.watch('src/resources/css/*.css', ['minify-css']);
  gulp.watch('src/scripts/*.js', ['process-js']);
  gulp.watch('src/images/', ['process-images']);
});
