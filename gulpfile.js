var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),
    jsmin = require('gulp-jsmin'),
    plumber = require('gulp-plumber'),
    connect = require('gulp-connect'),
    htmlmin = require('gulp-html-minifier2'),
    smushit = require('gulp-smushit'),
    livereload = require('gulp-livereload');
    
livereload({start:true})

gulp.task('connect', function(done){
    connect.server({
        root: './',
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

gulp.task('jsmin', function() {
return  gulp.src('./js/**/*.js')
        .pipe(connect.reload())
        .pipe(plumber())
        .pipe(jsmin())
        .pipe(gulp.dest('./jsmin'))
        .pipe(livereload({start:true}));
}); 

gulp.task('html', function() {
return  gulp.src('./html/**/*.html')
        .pipe(connect.reload())
        .pipe(plumber())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./'));
}); 

gulp.task('imgopt', function() {
return  gulp.src('./images/**/*.{jpg,png}')
        .pipe(connect.reload())
        .pipe(plumber())
        .pipe(smushit())
        .pipe(gulp.dest('./imagesopt'));
}); 

gulp.task('watch', function () {
  livereload.listen()
    gulp.watch(('./sass/**/*.scss'), gulp.series('sass')),
    gulp.watch(('./js/**/*.js'), gulp.series('jsmin')),
    gulp.watch(('./html/**/*.html'), gulp.series('html')),
    gulp.watch(('./images/**/*.{jpg,png}'), gulp.series('imgopt'));
    
});

gulp.task('default',  gulp.series(['sass','jsmin','html','imgopt','watch']));
