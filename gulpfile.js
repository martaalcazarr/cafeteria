const {src, dest, watch, series, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

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

function dev(){
    //toma dos valores, primero a que archivo tiene que estar atento si pasan cambios
    //y segundo, que funcion ejecutar en ese archivo cuando hay cambios
    watch('src/scss/**/*.scss', css)
}

exports.css = css;
exports.dev = dev;
exports.default = series(css, dev)

//series : inicia una tarea y al finalizar inicia la siguiente
//parallel: inicia las tareas en paralelo