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

var reload = browserSync.reload;

var paths = {
    appFolder: "./angular",
    assetsJsFolder: "./app/assets/js",
    assetsCssFolder: "./app/assets/css",
    distFolder: "./app/assets/dist",
    jspFolder: "./app"
};

var server = 'intshop-admin.dev:8080',
    page = '/shop-details.jsp',
    env = 'development'; // development or production (will change angular configs)

/*
 |--------------------------------------------------------------------------
 | Compile js
 |--------------------------------------------------------------------------
 */
gulp.task('app', function () {

    gulp.src([
            paths.appFolder + "/app.js",
            paths.appFolder + "/env/" + env + ".js",
            paths.appFolder + "/components/**/*.js",
            paths.appFolder + "/shared/**/*.js"
        ])
        //.pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        //.pipe(uglify())
        //.pipe(sourcemaps.write())
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
            paths.assetsCssFolder + "/vendor/bootstrap.min.css",
            paths.assetsCssFolder + "/vendor/jquery.dataTables.min.css",
            paths.assetsCssFolder + "/vendor/angular-datatables.min.css",
            paths.assetsCssFolder + "/vendor/sweetalert.css",
            paths.assetsCssFolder + "/style.css",
            paths.assetsCssFolder + "/custom.css",
            paths.assetsCssFolder + "/responsive.css"
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
            paths.assetsJsFolder + "/vendor/jquery.min.js",
            paths.assetsJsFolder + "/vendor/jquery.dataTables.min.js",
            paths.assetsJsFolder + "/vendor/bootstrap.min.js",
            paths.assetsJsFolder + "/vendor/angular.min.js",
            paths.assetsJsFolder + "/vendor/lodash.min.js",
            paths.assetsJsFolder + "/vendor/restangular.min.js",
            paths.assetsJsFolder + "/vendor/angular-datatables.min.js",
            paths.assetsJsFolder + "/vendor/ng-google-chart.min.js",
            paths.assetsJsFolder + "/vendor/jquery.sticky.js",
            paths.assetsJsFolder + "/vendor/star-rating.min.js",
            paths.assetsJsFolder + "/vendor/sweetalert.min.js",
            paths.assetsJsFolder + "/main.js"

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
    gulp.watch([paths.assetsJsFolder + "/**/*.js"], ['scripts']);
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