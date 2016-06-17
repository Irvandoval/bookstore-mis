'use strict';

angular.module('libreriaApp')
  .config(function($stateProvider) {
    $stateProvider.state('main', {
      url: '/',
      template: '<main></main>',
      authenticate: 'tactico'
    });
  });
