const mix = require("laravel-mix");

mix.setPublicPath('./src/resources/dist');

// Inspector JS
mix.js('src/resources/js/inspector/main.js', '/js/stackr-inspector.js')
  .react();

// Inspector CSS
mix.postCss('src/resources/css/inspector.css', '/css/stackr-inspector.css', [
  require('postcss-import'),
  require('postcss-nested'),
  require('tailwindcss'),
]);

// Host
mix.js('src/resources/js/host.js', '/js/host.js');
mix.postCss('src/resources/css/host.css', '/css/');