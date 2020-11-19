const gulp = require("gulp");
const sass = require('@selfisekai/gulp-sass');
const cssnano = require("gulp-cssnano");
const autoprefixer = require("gulp-autoprefixer");

gulp.task("css", function () {
  return gulp
    .src("./assets/css/main.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssnano())
    .on("error", sass.logError)
    .pipe(gulp.dest("./assets/css"));
});

gulp.task("watch", function () {
  gulp.watch("./assets/css/**/*.scss", gulp.parallel("css"));
  gulp.watch("._sass/**/*.scss", gulp.parallel("css"));
});

gulp.task("build", gulp.parallel("css"));