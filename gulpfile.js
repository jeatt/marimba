var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var sass        = require('gulp-sass');

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
	/// JS task
});

// Default task to be run with `gulp`
gulp.task('watch', ['sass', 'browser-sync'], function () {
    gulp.watch("src/scss/*.scss", ['sass']);
});

gulp.task('build', function() {
	/// Build task to clean and minify
});