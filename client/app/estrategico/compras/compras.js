'use strict';

angular.module('libreriaApp')
  .config(function($stateProvider) {
    $stateProvider.state('compras', {
      url: '/estrategico/compras',
      template: '<compras></compras>'
    });
  });
