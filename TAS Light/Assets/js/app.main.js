'use strict';
var app = angular.module('tasLightApp', ['tasLightApp-m1']);

//initialize when app is running
app.run(['$rootScope',
    function ($rootScope) {
        alert('running app.main.js');
    }]);

//application configurations goes here
//app.config();

//application factories goes here
//app.factory();

//application directives goes here
//app.directive();

//application filters goes here
//app.filter();