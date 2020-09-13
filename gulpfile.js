"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
// var jsmin = require("gulp-jsmin");
// var htmlmin = require("gulp-htmlmin");
// var imagemin = require("gulp-imagemin");
// var webp = require("gulp-webp");
var rename = require("gulp-rename");
var svgstore = require("gulp-svgstore");
var del = require("del");
var browserSync = require('browser-sync').create();

function clean(done) {
  del(['source/styles/css/*']);
  done();
}

function style(done) {
  gulp.src("source/styles/**/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
      })
    ]))
    .pipe(gulp.dest("source/styles/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("source/styles/css"))
    .pipe(browserSync.stream());

  done();
}

function sprite(done) {
  gulp.src("source/img/icons/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("source/img"));

  done();
}

gulp.task("del", clean);
gulp.task("style", style);
gulp.task("sprite", sprite);

gulp.task("watch", function (done) {
  browserSync.init({
    server: {
      baseDir: "source/"
    },
    port: 3000
  });

  gulp.watch("source/styles/**/*.less", style).on('change', browserSync.reload);
  gulp.watch("source/*.html").on('change', browserSync.reload);

  done();
});

gulp.task("ds", gulp.series("del", "style"));
gulp.task("build", gulp.series("ds", "sprite"));
gulp.task("start", gulp.series("build", "watch"));