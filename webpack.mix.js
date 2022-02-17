const mix = require("laravel-mix");

mix.setPublicPath('./src/resources/dist');

// Inspector
mix.js('src/resources/js/main.js', '/js/stackr.js')
  .react();


mix.postCss('src/resources/css/stackr.css', '/css/', [
  require('postcss-import'),
  require('postcss-nested'),
  require('tailwindcss'),
]);

// Host
mix.js('src/resources/js/host.js', '/js/host.js');
mix.postCss('src/resources/css/host.css', '/css/');