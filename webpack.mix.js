const mix = require("laravel-mix");

mix.setPublicPath('./src/resources/dist');

mix.js('src/resources/js/main.js', '/js/stackr.js')
  .react();

mix.postCss('src/resources/css/stackr.css', '/css/', [
  require('postcss-import'),
  require('postcss-nested'),
  require('tailwindcss'),
]);