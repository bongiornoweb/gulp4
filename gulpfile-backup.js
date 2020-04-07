var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload');
    
livereload({start:true})

gulp.task('connect', function(done){
    connect.server({
        root: 'build',
        livereload:true
    });
    done();
});

sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(connect.reload())
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./css'))
    .pipe(livereload({start:true}));
});
 
gulp.task('watch', function () {
  livereload.listen();
    gulp.watch('./sass/**/*.scss', gulp.series(['sass']));
    
});
gulp.task('default', gulp.series('connect', 'sass', 'watch'));
