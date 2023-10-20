import gulp from 'gulp';
import browserSync from 'browser-sync';
import { exec } from 'child_process';
import rename from 'gulp-rename';
import template from 'gulp-template';

const reload = browserSync.create().reload;


// Define the source and destination paths
const src = {
    js: 'public/js/*.js',
    components: 'public/js/components/*.js',
    html: 'public/*.html'
};

const publicDir = './public';

// Define a task to watch and reload JavaScript files
gulp.task('js', function () {
    return gulp.src(src.js)
        .pipe(reload({ stream: true }));
});

gulp.task('html', function () {
    return gulp.src(src.html)
        .pipe(browserSync.reload({ stream: true }));
});

// Define a task to run 'npm run build' and reload when build is complete
gulp.task('build', function (done) {
    exec('npm run build', function (error, stdout, stderr) {
        console.log(stdout);
        console.error(stderr);

        if (!error) {
            browserSync.reload();
        }

        done(error);
    });
});

// Task to create a new web component
gulp.task('create-component', function () {
    const componentName = process.argv[4]; // Get the component name from the command line argument

    if (!componentName) {
        console.error('Please provide a component name using the --name flag.');
        return;
    }

    return gulp.src('templates/component-template.js')
        .pipe(template({ componentName }))
        .pipe(rename(`${componentName}.js`))
        .pipe(gulp.dest(`${publicDir}/js/components`));
});

// Initialize BrowserSync and watch for changes
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: publicDir,
        },
    });

    gulp.watch(src.html, gulp.series('html'))
    gulp.watch(src.js, gulp.series('js'));
    gulp.watch(src.components, gulp.series('build'));
});

gulp.task('default', gulp.series('serve'));
