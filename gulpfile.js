var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var del = require('del');
var templateCache = require('gulp-angular-templatecache');
gulp.task('clean', function() {
    return del(['public']);
});
gulp.task('scripts', function() {
    return gulp.src([
            '!superScoreboardApp/**/*.spec.js',
            'superScoreboardApp/auth/auth.module.js',
            'superScoreboardApp/auth/auth.factory.js',
            'superScoreboardApp/**/*.module.js',
            'superScoreboardApp/**/*.controller.js',
            'superScoreboardApp/**/*.js',
            'superScoreboardApp/app.js'
        ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('public/javascripts'))
        .pipe(rename({
            suffix: '.min'
        })).pipe(uglify())
        .pipe(gulp.dest('public/javascripts'));
});
gulp.task('template_cache', function() {
    return gulp.src('superScoreboardApp/**/*.html')
        .pipe(templateCache({
            module: 'superScoreboardApp.templates',
            standalone: true
        }))
        .pipe(gulp.dest('public/javascripts'));
});
gulp.task('bower_js', function() {
    return gulp.src(
            [
                'bower_components/angular/angular.js',
                'bower_components/angular-ui-router/release/angular-ui-router.js',
                'bower_components/lodash/lodash.js',
                'bower_components/restangular/dist/restangular.js',
                'bower_components/angular-loading-bar/build/loading-bar.js',
                'bower_components/angular-bootstrap/ui-bootstrap.js',
                'bower_components/angular-touch/angular-touch.js',
                'bower_components/angular-carousel/dist/angular-carousel.js'
            ])
        .pipe(concat('bower.js'))
        .pipe(gulp.dest('public/javascripts'));
});
gulp.task('bower_css', function() {
    return gulp.src(
            [
                'bower_components/bootstrap/dist/css/bootstrap.css',
                'bower_components/angular-loading-bar/build/loading-bar.css',
                'bower_components/angular-bootstrap/ui-bootstrap-csp.css',
                'bower_components/angular-carousel/dist/angular-carousel.css'
            ])
        .pipe(concat('bower.css'))
        .pipe(gulp.dest('public/stylesheets'));
});
gulp.task('bower_css_map', function() {
    return gulp.src(
            [
                'bower_components/bootstrap/dist/css/bootstrap.css.map',
                'bower_components/angular-carousel/dist/angular-carousel.css.map'
            ])
        .pipe(gulp.dest('public/stylesheets'));
});
gulp.task('bower_components', ['bower_js', 'bower_css', 'bower_css_map']);
gulp.task('watch', function() {
    // Watch .js files
    gulp.watch('superScoreboardApp/**/*.js', ['scripts']);
    gulp.watch('superScoreboardApp/**/*.html', ['template_cache']);
    gulp.watch('bower_components/**', ['bower_components']);
    // Create LiveReload server
    livereload.listen();
    // Watch any files in dist/, reload on change
    gulp.watch(['public/**']).on('change', livereload.changed);
    gulp.watch(['views/**']).on('change', livereload.changed);
});
gulp.task('build', ['bower_components', 'scripts', 'template_cache']);
gulp.task('default', ['watch', 'build']);
gulp.task('heroku:production', ['build']);
