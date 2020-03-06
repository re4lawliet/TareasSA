var gulp = require('gulp');
var tar = require('gulp-tar');
var gzip = require('gulp-gzip');

gulp.task('runUploader', async function () {
    gulp.src('./src/**')
        .pipe(tar('Tarea3.tar'))
        .pipe(gzip())
        .pipe(gulp.dest('./dist'))        
});
