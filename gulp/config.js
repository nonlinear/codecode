var config = {
  sass: {
    src: './app/sass/style.sass',
    dest: './dist/css',
    error: 'Error Running SASS'
  },
  todo: {
    src: ['./app/**/*.+(js|html|sass|scss)', '!./app/sass/vendors/**/*.*', '!./app/js/vendors/**/*.*'],
    dest: './'
  },
  uncss: {
    src: './dist/css/style.css',
    dest: './dist/css',
    html: ['./dist/**/*.html'],
    ignore: [/.chosen/, /.popover/, /.calendar/]
  },
  nunjucks: {
    src: './app/pages/**/*.*',
    dest: './dist',
    error: 'Error Running Nunjucks',
    template: './app/templates/',
    watch: './app/templates/**/*',
    data: './app/data/generated/data.json'
  },
  ghPages: {
    src: './dist/**/*'
  },
  browserSync: {
    baseDir: './dist/'
  },
  svgSprites: {
    src: './app/svg/*.svg',
    dest: './dist',
    cssFile: 'svg.scss',
    generated: './app/sass/generated',
    filter: '**/*.svg'
  },
  imagemin: {
     src: './app/images/**/*.+(png|jpg|jpeg|gif|svg)',
    dest: './dist/images'
  },
  js: {
    src: ['./app/js/vendors/jquery.js', './app/js/vendors/bootstrap.js', './app/js/vendors/modernizr.js', './app/js/vendors/detectizr.js', './app/js/vendors/flexslider.js', './app/js/vendors/chosen.js', './app/js/scripts.js'],
    dest: './dist/js',
    title: 'main.js'
  },
  json: {
    src: './app/data/*.json',
    dest: './app/data/generated',
    error: 'Error Running JSON extend',
    file: 'data.json'
  }
};

// Exporting config
module.exports = config;
