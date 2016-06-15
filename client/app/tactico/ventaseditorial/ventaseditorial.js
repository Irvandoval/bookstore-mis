'use strict';

angular.module('libreriaApp')
  .config(function($stateProvider) {
    $stateProvider.state('ventaseditorial', {
      url: '/tactico/ventaseditorial',
      template: '<ventaseditorial></ventaseditorial>'
    });
  });
