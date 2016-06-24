'use strict';

angular.module('libreriaApp')
  .config(function($stateProvider) {
    $stateProvider.state('inventario', {
      url: '/tactico/inventario',
      template: '<inventario></inventario>',
      authenticate: 'tactico'
    });
  });
