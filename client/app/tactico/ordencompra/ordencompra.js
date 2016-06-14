'use strict';

angular.module('libreriaApp')
  .config(function($stateProvider) {
    $stateProvider.state('ordencompra', {
      url: '/tactico/ordencompra',
      template: '<ordencompra></ordencompra>'
    });
  });
