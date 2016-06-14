'use strict';

angular.module('libreriaApp')
  .config(function($stateProvider) {
    $stateProvider.state('topventas', {
      url: '/estrategico/topventas',
      template: '<topventas></topventas>'
    });
  });
