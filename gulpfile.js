import gulp from 'gulp';
import browserSync from 'browser-sync';
import { exec } from 'child_process';

const reload = browserSync.create().reload;

// Define the source and destination paths
const src = {
    js: 'public/js/*.js',
    components: 'public/js/components/*.js',
};

const publicDir = './public';

// Define a task to watch and reload JavaScript files
gulp.task('js', function () {
    return gulp.src(src.js)
        .pipe(reload({ stream: true }));
});

// Define a task to run 'npm run build' on component file changes
gulp.task('build', function (done) {
    exec('npm run build', function (error, stdout, stderr) {
        console.log(stdout);
        console.log('Build finished successfully 🎈')
        console.error(stderr);

        if (!error) {
            // Trigger BrowserSync reload upon successful build
            browserSync.reload();
        }

        done(error)
    });
});

// Initialize BrowserSync and watch for changes
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: publicDir, // Use the variable for the root directory
        }
    });

    // Watch JavaScript files
    gulp.watch(src.js, gulp.series('js'));

    // Watch component files and trigger the build task
    gulp.watch(src.components, gulp.series('build'));
});

// Create a default task that starts the development server
gulp.task('default', gulp.series('serve'));
