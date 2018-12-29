const browserSync = require('browser-sync');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const connect = require('gulp-connect-php');
const imagemin = require("gulp-imagemin");
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');


const paths = {
  'src': {
    'scss': 'src/scss/**/*.scss',
    'js': 'src/js/**/*.js',
    'img': 'src/images/**/*.+(jpg|jpeg|png)',
  },
  'dist': {
    'css': 'dist/css/',
    'js': 'dist/js/',
    'img': 'dist/images/',
  },
  'html': 'dist/**/*.html',
  'php': 'dist/**/*.php',
};


// ========================================
// sass: compile sass(scss) to css
// ========================================

gulp.task('sass', doneSass => {
  gulp.src(paths.src.scss)
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(paths.dist.css))
  .pipe(cleanCSS({
    'compatibility': {
      'properties': {
        'colors': false,
      }
    }
  }))
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulp.dest(paths.dist.css));
  doneSass();
});


// ========================================
// js: compile es6 to es5
// ========================================

gulp.task('js', doneJs => {
  gulp.src(paths.src.js)
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(paths.dist.js))
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulp.dest(paths.dist.js));
  doneJs();
});


// ========================================
// image: compress images
// ========================================

gulp.task('image', doneImage => {
  gulp.src(paths.src.img)
  .pipe(imagemin([
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 3}),
  ]))
  .pipe(gulp.dest(paths.dist.img));
  doneImage();
});


// ========================================
// bs-init & bs-reload: browser sync
// ========================================

gulp.task('bs-init', doneBsInit => {
  browserSync.init({
    'server': './dist/'
  });
  doneBsInit();
});

gulp.task('bs-init-php', doneBsInitPhp => {
  connect.server({
    base: './dist/',
  }, () => {
    browserSync({
      proxy: '127.0.0.1:8000'
    });
  });
  doneBsInitPhp();
});

gulp.task('bs-reload', doneReload => {
  browserSync.reload();
  doneReload();
});



// ========================================
// dev: sass and bs-reload after bs-init
// ========================================

gulp.task('dev', gulp.series(gulp.parallel('bs-init'), () => {
  gulp.watch(paths.src.scss, gulp.series(
    gulp.parallel('sass', 'bs-reload')
  ));
  gulp.watch(paths.src.js, gulp.series(
    gulp.parallel('js', 'bs-reload')
  ));
  gulp.watch(paths.html, gulp.series(
    gulp.parallel('bs-reload')
  ));
}));


// ========================================
// dev: sass and bs-reload after bs-init
// ========================================

gulp.task('wrap', gulp.series(gulp.parallel('bs-init-php'), () => {
  gulp.watch(paths.src.scss, gulp.series(
    gulp.parallel('sass', 'bs-reload')
  ));
  gulp.watch(paths.src.js, gulp.series(
    gulp.parallel('js', 'bs-reload')
  ));
  gulp.watch(paths.html, gulp.series(
    gulp.parallel('bs-reload')
  ));
  gulp.watch(paths.php, gulp.series(
    gulp.parallel('bs-reload')
  ));
}));


// ========================================
// build: build for deployment
// ========================================

gulp.task('build', gulp.series(
  gulp.parallel('sass', 'js', 'image')
));