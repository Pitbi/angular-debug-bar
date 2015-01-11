'use strict';

var gulp = require('gulp'),
    bump = require('gulp-bump'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat-util'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    meta = require('./package.json');

var bumpFiles = ['./bower.json', './package.json'],
    paths = {
        output: {
            js: 'dist/js',
            css: 'dist/css',
            font: 'dist/font'
        },
        js: 'src/js/' + meta.name + '.js',
        scss: 'src/scss/' + meta.name + '.scss',
        font: 'src/font/*'
    },
    description = {
        top: '// ' + meta.title + ' - ' + meta.author.name + '\n' +
        '// ' + meta.repository.url + ' - MIT License\n'
    };

gulp.task('bump', function () {
    return gulp.src(bumpFiles)
        .pipe(bump({type: 'minor'}))
        .pipe(gulp.dest('./'));
});

gulp.task('lint', function () {
    return gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('js', ['lint'], function () {
    return gulp.src(paths.js)
        .pipe(concat.header(description.top))
        .pipe(gulp.dest(paths.output.js))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.output.js));
});

gulp.task('scss', function () {
    return gulp.src(paths.scss)
        .pipe(concat.header(description.top))
        .pipe(sass())
        .pipe(gulp.dest(paths.output.css));
});

gulp.task('css', ['scss'], function () {
    return gulp.src(paths.output.css + '/' + meta.name + '.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.output.css));
});

gulp.task('font', function () {
    return gulp.src(paths.font)
        .pipe(gulp.dest(paths.output.font));
});

gulp.task('default', ['js', 'css', 'font']);
