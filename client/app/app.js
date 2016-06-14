'use strict';

angular.module('libreriaApp', ['libreriaApp.auth', 'libreriaApp.admin', 'libreriaApp.constants',
    'ngCookies', 'ngResource', 'ngSanitize', 'ui.router', 'validation.match'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
