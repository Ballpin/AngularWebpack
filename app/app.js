var req = require.context("./angular", true, /^(.*\.(js$))[^.]*$/igm);
req.keys().forEach(function(key){
    req(key);
});


var app = angular.module('app', ['controllers']);