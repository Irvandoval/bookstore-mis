'use strict';

angular.module('libreriaApp')
  .config(function($stateProvider) {
    $stateProvider.state('librosvendidos', {
      url: '/tactico/librosvendidos',
      template: '<librosvendidos></librosvendidos>',
      authenticate: 'tactico'
    });
  });
