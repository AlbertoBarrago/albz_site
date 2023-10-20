import gulp from 'gulp';
import browserSync from 'browser-sync';
import { exec } from 'child_process';
import rename from 'gulp-rename';
import template from 'gulp-template';
import * as fs from "fs";
import * as del from "del";
import replace from "gulp-replace";

const reload = browserSync.create().reload;

/**
 * Represents a source object.
 * @type {Object} SourceObject
 * @property {string} js - The path to JavaScript files.
 * @property {string} components - The path to component JavaScript files.
 * @property {string} html - The path to HTML files.
 * @property {Object} npm - The npm commands.
 * @property {string} npm.build - The npm build command.
 *
 */
const src = {
    js: 'src/js/*.js',
    components: 'components/*.js',
    html: 'src/*.html',
    css: 'src/css/*.css',
    npm: {
        build: 'npm run build',
    }
};
/**
 * The directory path for publicly accessible files.
 *
 * @type {string}
 * @default './public'
 */
const publicDir = './public';
const srcDir = './src'
const componentDir = './components'
const appjsDir = './src/index.js'

/**
 * Watch for changes in js and update browser
 *
 */
gulp.task('js', function () {
    return gulp.src(src.js)
        .pipe(reload({ stream: true }));
});

/**
 * Watch for changes in html and update browser
 */
gulp.task('html', function () {
    return gulp.src(src.html)
        .pipe(browserSync.reload({ stream: true }));
});

/**
 * Watch for changes in css and update browser
 */
gulp.task('css', function () {
    return gulp.src(src.css)
        .pipe(browserSync.reload({ stream: true }));
})

/**
 * Trough Npm exec Build js file to commonJs inside index.js
 * @property {string} done - Async function
 */
gulp.task('build', function (done) {
    exec(src.npm.build, function (error, stdout, stderr) {
        console.log(stdout);
        console.error(stderr);

        if (!error) {
            browserSync.reload();
        }

        done(error);
    });
});

/**
 * Create Component and add exports
 * @param {string} name - The name of the component.
 * @return {Promise} A promise that resolves when the component is created and exported.
 */
gulp.task('create-component', function (done) {
    const componentName = process.argv[4]; // Get the component name from the command line argument

    if (!componentName) {
        console.error('Please provide a component name using the --name flag.');
        done(); // Signal task completion
        return;
    }

    // Define the source template file
    const templateFile = 'templates/component-template.js';

    // Use gulp-template to replace placeholders in the template with the component name
    gulp.src(templateFile)
        .pipe(template({ componentName })) // Use the component name as a template variable
        .pipe(rename(`${componentName.charAt(0).toLowerCase() + componentName.slice(1)}.js`))
        .pipe(gulp.dest(componentDir));

    // Add the export statement to 'index.js' with the new component name
    const appFile = `${srcDir}/index.js`; // Updated file path to 'index.js'
    const exportStatement = `import ${componentName} from '../components/${componentName.charAt(0).toLowerCase() + componentName.slice(1)}.js';\n`;

    fs.readFile(appFile, 'utf8', function (err, data) {
        if (err) {
            console.error('Error reading index.js file.');
            done();
            return;
        }

        // This made me crazy but now works
        const componentsPosition = data.indexOf('components: {') + 'components: {'.length;
        const updatedAppContent =
            data.slice(0, componentsPosition) +
            `\n    ${componentName.charAt(0).toLowerCase() + componentName.slice(1)}: ${componentName},` +
            data.slice(componentsPosition);

        const contentToPrepend = exportStatement + updatedAppContent;

        fs.writeFileSync(appFile, contentToPrepend);

        done();
    });
});

gulp.task('remove-component', function (done) {
    const filename = process.argv[4];
    const filePath = `${componentDir}/${filename}.js`;

    // Delete the file from the components folder
    del.deleteAsync([filePath], { force: true, allowEmpty: true }).then(function () {
        console.log(`Deleted file: ${filename}.js`);
        console.log(`Deleted path of file: ${filePath}`);
        const compDir = "../components/";
        const appContent = fs.readFileSync(appjsDir, 'utf8');
        const importStatement = `import ${filename} from '${compDir}${filename.charAt(0).toLowerCase() + filename.slice(1)}.js';`;
        console.log('import statement', importStatement);
        const objectProperty = `${filename.charAt(0).toLowerCase() + filename.slice(1)}: ${filename},`;
        const updatedAppContent = appContent.replace(importStatement, '').replace(objectProperty, '');

        fs.writeFileSync(appjsDir, updatedAppContent, 'utf8');

        console.log(`Updated ${appjsDir}`);
        done();
    });

})

/**
 * Launches the serve and watches
 * @param {string} done Async function
 */
gulp.task('serve', function (done) {
    exec(src.npm.build, function (error, stdout, stderr) {
        console.log('build executed successfully');
        console.error(stderr);

        browserSync.init({
            server: {
                baseDir: srcDir,
            },
        });

        gulp.watch(src.html, gulp.series('html'))
        gulp.watch(src.css, gulp.series('css'))
        gulp.watch(src.js, gulp.series('js'));
        gulp.watch(src.components, gulp.series('build'));

        done(error);
    });
});


gulp.task('default', gulp.series('serve'));
