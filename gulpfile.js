const browserSync = require('browser-sync');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require("gulp-imagemin");
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');


const paths = {
  'src': {
    'scss': 'src/scss/**/*.scss',
    'img': 'src/images/**/*.+(jpg|jpeg|png)',
  },
  'dist': {
    'css': 'dist/css/',
    'img': 'dist/images/',
  },
  'html': 'index.html',
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
    'server': './'
  });
  doneBsInit();
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
  gulp.watch(paths.html, gulp.series(
    gulp.parallel('bs-reload')
  ));
}));


// ========================================
// build: build for deployment
// ========================================

gulp.task('build', gulp.series(
  gulp.parallel('sass', 'image')
));