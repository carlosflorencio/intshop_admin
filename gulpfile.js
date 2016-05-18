/*
 |--------------------------------------------------------------------------
 | Dependencies
 |--------------------------------------------------------------------------
 */
var gulp = require('gulp'),
    notify = require("gulp-notify"),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    browserSync = require('browser-sync').create();

var reload  = browserSync.reload;

var paths = {
    appFolder: "./angular",
    assetsJsFolder: "./app/assets/js",
    assetsCssFolder: "./app/assets/css",
    distFolder: "./app/assets/dist",
    jspFolder: "./app"
};

var server = 'intshop-admin.dev:8080',
    page = '/index.jsp';

/*
 |--------------------------------------------------------------------------
 | Compile js
 |--------------------------------------------------------------------------
 */
gulp.task('app', function () {

    gulp.src([
            paths.appFolder + "/app.js",
            paths.appFolder + "/**/*.js"
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(notify({message: 'App Compiled'}))
        .pipe(gulp.dest(paths.distFolder));
});


/*
 |--------------------------------------------------------------------------
 | Compile CSS
 |--------------------------------------------------------------------------
 */
gulp.task('styles', function () {
    return gulp.src([
            //paths.assetsCssFolder + "/owl.carousel.css",
            //paths.assetsCssFolder + "/owl.theme.css",
            //paths.assetsCssFolder + "/style.css",
            //paths.assetsCssFolder + "/responsive.css"
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('all.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.distFolder))
        .pipe(browserSync.stream())
        .pipe(notify({message: 'CSS Compiled'}));
});


/*
 |--------------------------------------------------------------------------
 | Compile Scripts
 |--------------------------------------------------------------------------
 */
gulp.task('scripts', function () {
    return gulp.src([
            //paths.assetsJsFolder + "/vendors/owl.carousel.min.js",
            //paths.assetsJsFolder + "/vendors/svgcolor.js",
            //paths.assetsJsFolder + "/vendors/jquery.sticky.js",
            //paths.assetsJsFolder + "/vendors/jquery.scrollToTop.min.js",
            //paths.assetsJsFolder + "/vendors/scrollingplugin.js",
            //paths.assetsJsFolder + "/main.js"

        ])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(paths.distFolder))
        .pipe(notify({message: 'JS Compiled'}));
});

/*
 |--------------------------------------------------------------------------
 | Watch
 |--------------------------------------------------------------------------
 */
gulp.task('watch', ['styles', 'scripts', 'app'], function () {

    browserSync.init({
        proxy: server,
        open: true,
        notify: true,
        startPath: page
    });

    gulp.watch([paths.assetsCssFolder + "/*.css"], ['styles']);
    gulp.watch([paths.appFolder + "/**/*.js"], ['app']);

    gulp.watch(paths.jspFolder + "/**/*.jsp").on('change', reload);
    gulp.watch(paths.distFolder + "/*.js").on('change', reload);
});


/*
 |--------------------------------------------------------------------------
 | Default
 |--------------------------------------------------------------------------
 */
gulp.task('default', ['watch']);