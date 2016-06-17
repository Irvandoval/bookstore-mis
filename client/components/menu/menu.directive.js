(function(){
 'use strict';

 angular.module('libreriaApp')
   .directive('menu', () => ({
     templateUrl: 'components/menu/menu.html',
     restrict: 'E',
     controller: 'MenuController',
     controllerAs: 'mn'
   }));

})();
