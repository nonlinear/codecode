var config = {
  sass: {
    src: './app/sass/style.sass',
    dest: './dist/css',
    error: 'Error Running SASS'
  },
  todo: {
    src: './app/**/*.+(js|html|sass|scss)',
    dest: './'
  },
  uncss: {
    src: './dist/css/style.css',
    dest: './dist/css',
    html: ['./dist/**/*.html'],
    ignore: [/.chosen/, /.flex/]
  },
  nunjucks: {
    src: './app/pages/**/*.*',
    dest: './dist',
    error: 'Error Running Nunjucks',
    template: './app/templates/',
    data: './app/data/data.json'
  },
  ghPages: {
    src: './dist/**/*'
  },
  imagemin: {
     src: './app/images/**/*.+(png|jpg|jpeg|gif|svg)',
    dest: './dist/images'
  }
};

// Exporting config
module.exports = config;
