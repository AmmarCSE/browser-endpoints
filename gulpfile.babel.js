import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import webpack from 'webpack-stream';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('default', () => {
  return gulp.src('src/grid/App.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/'));
});

gulp.task('scripts', () => {
  return gulp.src('src/grid/App.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/'))
    .pipe(reload({stream: true}));
  return gulp.src('app/scripts-es6/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.babel({presets: ["es2015", "react"]}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('app/scripts'))
    .pipe(reload({stream: true}));
});

gulp.task('serve', [ 'scripts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'index.html'
  ]).on('change', reload);

  gulp.watch('src/**/*.js', ['scripts']);
});

