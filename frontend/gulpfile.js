const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const runSequence = require('run-sequence');
const sassdoc = require('sassdoc');
const cleanCSS = require('gulp-clean-css');
// const svgstore = require('gulp-svgstore')
// const svgmin = require('gulp-svgmin')
const rename = require('gulp-rename')
const browserSync = require('browser-sync');

//////////////////////////////////////////
// BROWSERSYNC
//////////////////////////////////////////
gulp.task('browserSync', function() {
    browserSync ({
        proxy: {
          target: "http://localhost:3000"
        },
        ui: {
         port: 5000,
         weinre: {
             port: 9090
           }
        }
    });
});


//////////////////////////////////////////
// SASS
//////////////////////////////////////////
const autoprefixerOptions = {
    browsers: ['last 2 versions','ie >= 9', '> 5%', 'Firefox ESR']
};

gulp.task('sass', () => {
    return gulp.src(['scss/**/*.scss','src/Admin/**/*.scss','src/Portfolio/**/*.scss','src/GlobalComponents/**/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(sass({errLogToConsole: true}))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({
        stream: true
        }));
});


gulp.task('watch', () => {
    gulp.watch(['scss/**/*.scss','src/Admin/**/*.scss','src/Portfolio/**/*.scss','src/GlobalComponents/**/*.scss'], ['sass']);
});

gulp.task('default', (callback) => {
    runSequence(['sass','watch','browserSync'],
        callback
    )
});
