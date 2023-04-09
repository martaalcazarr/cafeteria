const {src, dest, watch, series, parallel} = require('gulp');

//css y sass
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

//imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done){
    //compilar sass
    //paso 1. identificar archivo con src()
    //2.compilar con pipe(sass())
    //3. guardar pipe(dest es para darle un destino donde guardar)
    src('src/scss/app.scss')
    .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css'))
    done()
}

function imagenes(){
    return src('src/img/**/*')
        .pipe(imagemin({optimizationLevel: 3}))
        .pipe(dest('build/img'))
}

function versionWebp(){
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
}

function versionAvif(){
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
}

function dev(){
    //toma dos valores, primero a que archivo tiene que estar atento si pasan cambios
    //y segundo, que funcion ejecutar en ese archivo cuando hay cambios
    watch('src/scss/**/*.scss', css)
    watch('src/img/**/*', imagenes)
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif
exports.default = series(imagenes, versionWebp, versionAvif, css, dev);

//series : inicia una tarea y al finalizar inicia la siguiente
//parallel: inicia las tareas en paralelo