const browserSync = require('browser-sync');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');


const paths = {
  'src': {
    'scss': 'src/scss/**/*.scss',
  },
  'dist': {
    'css': 'dist/css/',
  },
  'html': 'index.html'
};


// ========================================
// sass: compile sass(scss) to css
// ========================================

gulp.task('sass', done => {
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
  done();
});


// ========================================
// bs-init & bs-reload: browser sync
// ========================================

gulp.task('bs-init', done => {
  browserSync.init({
    'server': './'
  });
  done();
});

gulp.task('bs-reload', done => {
  browserSync.reload();
  done();
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
