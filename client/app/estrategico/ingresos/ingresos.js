'use strict';

angular.module('libreriaApp')
  .config(function($stateProvider) {
    $stateProvider.state('ingresos', {
      url: '/estrategico/ingresos',
      template: '<ingresos></ingresos>'
    });
  });
