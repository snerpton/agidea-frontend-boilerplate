var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var cssNano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var twig = require('gulp-twig');

var paths = {
    styles: {
        src: 'src/styles/main.scss',
        dest: 'dist/styles/'
    },
    scripts: {
        src: [
            'node_modules/jquery/dist/jquery.js',
            'src/scripts/**/*.js'
        ],
        dest: 'dist/scripts/'
    },
    images: {
        src: 'src/images/**/*.*',
        dest: 'dist/images/'
    },
    templates: {
        src: 'src/templates/*.twig',
        dest: 'dist/'
    }
};

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('styles', function () {
    return gulp.src(paths.styles.src)
        .pipe(sass({
            includePaths: ['./node_modules']
        }).on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(concat('styles.min.css'))
        .pipe(cssNano())
        .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('scripts', function () {
    return gulp.src(paths.scripts.src)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('images', function () {
    return gulp.src(paths.images.src)
        .pipe(imagemin([
            imagemin.jpegtran({ progressive: true }),
            imagemin.gifsicle({ interlaced: true }),
            imagemin.optipng({ optimizationLevel: 5 })
        ]))
        .pipe(gulp.dest(paths.images.dest));
});

gulp.task('templates', function () {
    return gulp.src(paths.templates.src)
        .pipe(twig())
        .pipe(gulp.dest(paths.templates.dest));
});

gulp.task('watch', function () {
    gulp.watch(['src/styles/**/*'], ['styles']);
    gulp.watch(['src/scripts/**/*'], ['scripts']);
    gulp.watch(['src/images/**/*'], ['images']);
    gulp.watch(['src/templates/**/*'], ['templates']);
});

gulp.task('build', ['styles', 'scripts', 'images', 'templates']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});