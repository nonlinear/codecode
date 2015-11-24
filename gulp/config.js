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
    html: './dist/**/*.html',
    ignore: [/.chosen/, /.flex/]
  },
  ghPages: {
    src: './dist/**/*'
  }
};

// Exporting config
module.exports = config;
