'use strict';

angular.module('libreriaApp')
  .config(function($stateProvider) {
    $stateProvider.state('ventasmes', {
      url: '/tactico/ventasmes',
      template: '<ventasmes></ventasmes>',
      authenticate: 'tactico'
    });
  });
