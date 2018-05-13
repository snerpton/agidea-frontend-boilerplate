# Read Me

# How this project was set up

## Summary
1. Install Node, npm, and gulp
2. Configure `gulpfile.js`
3. Configure `package.json`
4. Restore packages

## Details

**1. Install Node, npm, and gulp**

 Run following commands, as per [Gulp website](https://gulpjs.com):
```
$ ~~npm install gulp-cli -g~~ (already installed on my machine?)
$ npm install gulp -D
$ touch gulpfile.js
$ gulp --help
```

**2. Configure `gulpfile.js`**

Add following code to `gulpfile.js`:

```javascript
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
```

**3. Configure `packages.json`**

Create `package.json` and add the following content:

```javascript
{
  "name": "agidea-frontend-boilerplate-kit",
  "version": "0.0.1",
  "description": "Project for Agidea frontend design build.",
  "dependencies": {},
  "devDependencies": {
    "del": "^2.2.2",
    "gulp": "^3.9.1",
    "gulp-concat": "^2.6.1",
    "gulp-cssnano": "^2.1.2",
    "gulp-imagemin": "^3.2.0",
    "gulp-sass": "^3.1.0",
    "gulp-twig": "^0.7.0",
    "gulp-uglify": "^2.1.2",
    "gulp-watch": "^4.3.11",
    "bootstrap": "^4.1.1",
    "jquery": "^3.2.1"
  },
  "scripts": {},
  "author": "Chris Ashton (Agidea)"
}
```

**4. Restore packages**

Run the command `npm install` to estore the packages listed in `package.json`.