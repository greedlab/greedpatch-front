// npm install

const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const changed = require('gulp-changed');
// const changedInPlace = require('gulp-changed-in-place');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const del = require('del');
const plumber = require('gulp-plumber');
const cleanCSS = require('gulp-clean-css');
const react = require('gulp-react');
const glob = require("glob");
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
const htmlmin = require('gulp-htmlmin');

// const exec = require('child_process').exec;

const dist_dir = 'dist';
const dist_assets_dir = dist_dir + '/assets';

const src_sync_files = ['src/**/*.ico','src/**/*.html'];
const dist_sync_dir = dist_dir;

const src_assets_image_files = 'src/assets/**/*.{jpg,jpeg,png,gif}';
const dist_assets_image_dir = dist_assets_dir;

const src_assets_jsx_files = 'src/assets/**/*.jsx';
const dist_assets_jsx_dir = dist_assets_dir;

const src_assets_js_files = 'src/assets/**/*.{js,es6}';
const dist_assets_js_dir = dist_assets_dir;

const src_js_files = ['src/!(assets)/**/*.{js,es6}', 'src/*.{js,es6}'];
const dist_js_dir = dist_dir;

const src_assets_css_files = 'src/assets/**/*.scss';
const dist_assets_css_dir = dist_assets_dir;

// 静态资源文件
const dist_assets_files = 'dist/assets/**/*.{js,jsx,css,jpg,jpeg,png,gif}';

// 代码里引用了静态资源的文件
const dist_assets_reference_files = 'dist/**/*.{js,jsx,css,html}';
const dist_assets_reference_dir = dist_dir;

gulp.task('clean', () => {
    return del(dist_dir);
});

gulp.task('sync', () => {
    return gulp.src(src_sync_files)
        .pipe(plumber())
        .pipe(changed(dist_sync_dir))
        .pipe(gulp.dest(dist_sync_dir));
});

gulp.task('build-js', () => {
    return gulp.src(src_js_files)
        .pipe(plumber())
        .pipe(changed(dist_js_dir))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(rename({
            extname: '.js'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist_js_dir));
});

gulp.task('build-assets-js', () => {
    return gulp.src(src_assets_js_files)
        .pipe(plumber())
        .pipe(changed(dist_assets_js_dir))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(rename({
            extname: '.js'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist_assets_js_dir));

});

gulp.task('uglify-assets-js', () => {
    return gulp.src(src_assets_js_files)
        .pipe(plumber())
        .pipe(changed(dist_assets_js_dir))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist_assets_js_dir));
});

gulp.task('build-assets-jsx', () => {
    return gulp.src(src_assets_jsx_files)
        .pipe(plumber())
        .pipe(changed(dist_assets_jsx_dir))
        .pipe(sourcemaps.init())
        .pipe(react())
        .pipe(rename({
            extname: '.jsx'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist_assets_jsx_dir));
});

gulp.task('uglify-assets-jsx', () => {
    return gulp.src(src_assets_jsx_files)
        .pipe(plumber())
        .pipe(changed(dist_assets_jsx_dir))
        .pipe(sourcemaps.init())
        .pipe(react())
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.jsx'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist_assets_jsx_dir));
});

gulp.task('build-assets-css', () => {
    return gulp.src(src_assets_css_files)
        .pipe(plumber())
        .pipe(changed(dist_assets_css_dir))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(rename({
            extname: '.css'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist_assets_css_dir));
});

gulp.task('uglify-assets-css', () => {
    return gulp.src(src_assets_css_files)
        .pipe(plumber())
        .pipe(changed(dist_assets_css_dir))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist_assets_css_dir));
});

gulp.task('min-assets-image', () => {
    return gulp.src(src_assets_image_files)
        .pipe(plumber())
        .pipe(changed(dist_assets_image_dir))
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(dist_assets_image_dir));
});

/**
 * 静态资源加指纹
 */
gulp.task('fingerprint-assets', () => {
    return gulp.src(dist_assets_files)
        .pipe(plumber())
        .pipe(changed(dist_assets_dir))
        .pipe(rev())
        .pipe(gulp.dest(dist_assets_dir))
        .pipe(rev.manifest({
            merge: true
        }))
        .pipe(gulp.dest(dist_assets_dir));
});

/**
 * 修改静态资源引用
 */
gulp.task('fingerprint-code', () => {
    return gulp.src(['dist/assets/rev-*.json',dist_assets_reference_files])
        .pipe(plumber())
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest(dist_assets_reference_dir));
});

gulp.task('watch', () => {
    gulp.watch(src_sync_files, ['sync']);
    gulp.watch(src_js_files, ['build-js']);
    // gulp.watch(src_assets_image_files, runSequence('min-assets-image'));
    gulp.watch(src_assets_image_files, ['min-assets-image']);
    // gulp.watch(src_assets_js_files, runSequence('build-assets-js','uglify-assets-js'));
    gulp.watch(src_assets_js_files, ['build-assets-js']);
    // gulp.watch(src_assets_jsx_files, runSequence('build-assets-jsx','uglify-assets-jsx'));
    gulp.watch(src_assets_jsx_files, ['build-assets-jsx']);
    // gulp.watch(src_assets_css_files, runSequence('build-assets-css','uglify-assets-css'));
    gulp.watch(src_assets_css_files, ['build-assets-css']);
});

gulp.task('build', () => {
    return runSequence(['sync','min-assets-image','build-js', 'build-assets-js','build-assets-css', 'build-assets-jsx'],['uglify-assets-js'
        ,'uglify-assets-css', 'uglify-assets-jsx']);
});

gulp.task('rebuild', () => {
    return runSequence('clean','build');
});

gulp.task('release', () => {
    return runSequence('build','fingerprint-assets','fingerprint-code');
});
