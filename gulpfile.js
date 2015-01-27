var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(reload({stream:true}));
});

gulp.task('js', function() {
  gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
});

// Default task to be run with `gulp`
gulp.task('watch', ['sass', 'js', 'browser-sync'], function () {
  gulp.watch("src/scss/*.scss", ['sass']);
});

gulp.task('build', function() {
	/// Build task to clean and minify
});