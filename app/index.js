// Edit main.scss to require the rest of scss.
require('./assets/scss/main.scss');

// Require all JS in Angular
var reqJS = require.context("./angular", true, /^(.*\.(js$))[^.]*$/igm);
reqJS.keys().forEach(function(key){
    reqJS(key);
});

// Require App
require('./app');
