'use strict';

angular.module('libreriaApp')
  .config(function($stateProvider) {
    $stateProvider.state('ventacategoria', {
      url: '/estrategico/ventacategoria',
      template: '<ventacategoria></ventacategoria>'
    });
  });
