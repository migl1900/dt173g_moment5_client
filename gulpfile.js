const {src, dest, watch, series, parallel } = require("gulp");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify-es").default;
const cleanCSS = require("gulp-clean-css");
const image = require("gulp-image");

// Paths
const files = {
    htmlPath: "src/**/*.html",
    cssPath: "src/**/*.css",
    jsPath: "src/**/*.js",
    imagePath: "src/images/*"
}

// Copy html files
function copyHTML() {
    return src(files.htmlPath)
        .pipe(dest("pub"));
}

// Concat and minify js files
function jsTask() {
    return src(files.jsPath)
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(rename("main.min.js"))
        .pipe(dest("pub/js"));
}

// Concat and minify css files
function cssTask() {
    return src(files.cssPath)
        .pipe(concat("main.css"))
        .pipe(cleanCSS())
        .pipe(rename("main.min.css"))
        .pipe(dest("pub/css"));
}

// Compress and copy images
function imageTask() {
    return src(files.imagePath)
        .pipe(image())
        .pipe(dest("pub/images"));
}

// Watcher
function watchTask() {
    watch([files.htmlPath, files.jsPath, files.cssPath, files.imagePath], 
        parallel(copyHTML, jsTask, cssTask, imageTask));
}


// Default tasks
exports.default = series(
    parallel(copyHTML, jsTask, cssTask, imageTask),
    watchTask
);