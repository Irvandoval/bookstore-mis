'use strict';

angular.module('libreriaApp.auth', ['libreriaApp.constants', 'libreriaApp.util', 'ngCookies',
    'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
