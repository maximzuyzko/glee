const {src, dest, watch, parallel, series}  = require('gulp');
const scss = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const fileInclude = require('gulp-file-include');
const svgSprite = require('gulp-svg-sprite');
const replace = require('gulp-replace');
const cheerio = require('gulp-cheerio');
const del = require('del');
const browserSync = require('browser-sync').create();

const svgSprites = () => {
    return src(['docs/images/icons/**.svg'])
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(replace('&gt', '>'))
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg'
                }
            },
        }))
        .pipe(dest('docs/images'));
}

const htmlInclude = () => {
    return src(['docs/html/*.html'])
        .pipe(fileInclude ({
            prefix: '@',
            basepath: '@file',
        }))
        .pipe(dest('docs'))
        .pipe(browserSync.stream());
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'docs/'
        },
        notify: false,
    })
}

function styles() {
    return src('docs/scss/style.scss')
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'],
            grid: true
        }))
        .pipe(dest('docs/css'))
        .pipe(browserSync.stream())
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/mixitup/dist/mixitup.min.js',
        'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
        'node_modules/rateyo/src/jquery.rateyo.js',
        'docs/js/main.js'
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('docs/js'))
        .pipe(browserSync.stream())
}

function images() {
    return src('docs/images/**/*.*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest('dist/images'))
}

function build() {
    return src([
        'docs/**/*.html',
        'docs/css/style.min.css',
        'docs/js/main.min.js'
    ], {base: 'app'})
        .pipe(dest('dist'))
}

function cleanDist() {
    return del('dist')
}

function watching() {
    watch(['docs/scss/**/*.scss'], styles);
    watch(['docs/js/**/*.js', '!docs/js/main.min.js'], scripts);
    watch(['docs/*.html']).on('change', browserSync.reload);
    watch(['docs/html/**/*.html'], htmlInclude);
    watch(['docs/images/icons/**.svg'], svgSprites);
    watch(['docs/scss/**/*.scss']).on('change', browserSync.reload);
}

exports.svgSprites = svgSprites;
exports.htmlInclude = htmlInclude;
exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, images, build);

exports.default = parallel(styles, htmlInclude, svgSprites, scripts, browsersync, watching);

