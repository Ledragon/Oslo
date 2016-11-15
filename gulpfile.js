var gulp = require('gulp');
var concat = require('gulp-concat');
var templatecache = require('gulp-angular-templatecache'); 

let appFiles = ['src/app.js',
    'src/**/*.controller.js',
    'src/**/*.directive.js',
    'src/**/*.route.js',
    'src/**/*.service.js',
];

gulp.task('scripts', function () {
    return gulp.src(appFiles)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./public/'));
});

gulp.task('templates', function () {
    gulp.src(['src/**/*.html', '!src/index.html'])
        .pipe(templatecache('templates.js',{module:'app'}))
        .pipe(gulp.dest('./public'));
});