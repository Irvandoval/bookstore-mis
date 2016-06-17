'use strict';

angular.module('libreriaApp')
  .config(function($stateProvider) {
    $stateProvider.state('ventasproveedor', {
      url: '/tactico/ventasproveedor',
      template: '<ventasproveedor></ventasproveedor>'
    });
  });
