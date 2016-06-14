'use strict';

angular.module('libreriaApp')
  .config(function($stateProvider) {
    $stateProvider.state('proveedores', {
      url: '/estrategico/proveedores',
      template: '<proveedores></proveedores>'
    });
  });
