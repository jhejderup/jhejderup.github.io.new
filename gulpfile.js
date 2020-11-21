const gulp = require("gulp");
const sass = require('@selfisekai/gulp-sass');
const cssnano = require("gulp-cssnano");
const autoprefixer = require("gulp-autoprefixer");

const through = require('through2');
const bibtexParse = require('bibtex-parse-js');


const bib2json = () => {
  return through.obj(function (vinylFile, encoding, callback) {
    let transformedFile = vinylFile.clone();
    let bibobj = bibtexParse.toJSON(transformedFile.contents.toString());
    transformedFile.contents = Buffer.from(JSON.stringify(bibobj));
    transformedFile.extname = ".json";
    callback(null, transformedFile);
  });
}

gulp.task("css", () => {
  return gulp
    .src("./assets/css/main.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssnano())
    .on("error", sass.logError)
    .pipe(gulp.dest("./assets/css"));
});

gulp.task("bib", () => {
  return gulp
    .src("./_bibliography/**/*.bib")
    .pipe(bib2json())
    .pipe(gulp.dest("./_data/bib"))

});

gulp.task("watch", () => {
  gulp.watch("./assets/css/**/*.scss", gulp.parallel("css"));
  gulp.watch("._sass/**/*.scss", gulp.parallel("css"));
});

gulp.task("build", gulp.parallel("css","bib"));