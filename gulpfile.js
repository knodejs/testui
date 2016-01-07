var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('default', function() {
    gulp.src('public')
        .pipe(webserver({
            livereload: true,
            open: true,
            port: 9099,
            fallback: 'index.html'
        }));
});
