// * Модули * // 
// ?src - взять
// ?dest - положить
// ?watch - слежка за изменениями в файлах
// ?parallel - позволяет запускать параллельно какие-нибудь таски (обновление браузера и слежка за файлами)

const { src, dest, watch, parallel } = require('gulp'),                            // Gulp

scss                                   = require('gulp-sass')(require('sass')),    // sass
concat                                 = require('gulp-concat'),                   // concat - соеденить скрипты
browserSync                            = require('browser-sync').create(),         // browserSync - слежка за страницей
uglify                                 = require('gulp-uglify-es').default,        // gulp-uglify-es - работа с js файлами
autoprefixer                           = require('gulp-autoprefixer');             // gulp-autoprefixer - префиксы для браузеров
fileinclude                            = require('gulp-file-include');             // gulp-file-include - для импорта html в html

const dir = {
    app: "app/",
    dist: "dist/",
    distCss: "dist/assets/css",
    distJs: "dist/assets/js",
}

function browsersync () {
    browserSync.init({
        server: {
            baseDir: 'dist/',
        }
    });
}

function styles() {
    return src('app/assets/scss/style.scss')
        .pipe(scss())
        .pipe(concat('style.min.css'))
        //.pipe(autoprefixer({
            //overrideBrowserslist: ['last 10 version']
        //}))
        .pipe(dest(`${dir.distCss}`))
        .pipe(browserSync.stream())
}

function scripts() {
    return src('app/assets/js/main.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest(`${dir.distJs}`))
    .pipe(browserSync.stream())
}

function html() {
    return src('app/*.html')
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(dest(`${dir.dist}`))
    .pipe(browserSync.stream())
}

function watching() {
    watch(['app/assets/scss/**/*.scss'], styles);
    watch(['app/assets/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch(['app/**/*.html']).on('change', html);
}

function build() {
    return src([
        'app/assets/scss/**/*.scss',
        'app/assets/fonts/**/*',
        'app/assets/img/**/*',
        'app/**/*.html'
    ], {base: 'app'})
    .pipe(dest(`${dir.dist}`))
}

exports.styles = styles;
exports.html = html;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.build = build;

exports.default = parallel(build, html, scripts, styles, browsersync, watching);