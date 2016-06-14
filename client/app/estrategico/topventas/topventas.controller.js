(function() {
  'use strict';
  class TopVentasController {
    constructor($http) {
      this.$http = $http;
      this.valor = {};
      this.hoy = new Date();
    }
    $onInit() {
      console.log('hola a todos');
    }

    procesar() {
      // if models are no undefined and inicio is less than fin are valid
      if (this.fecha.inicio && this.fecha.fin && this.fecha.inicio < this.fecha.fin) {
        let url = '/api/estrategico/topventas';
        let total = 0;
        this.$http({
            url: url,
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST',
            data: {
              fechaInicial: this.fecha.inicio,
              fechaFinal: this.fecha.fin,
              limit: this.limit
            }
          })
          .then(response => {
            this.proveedores = response.data;
            for(let i = 0; i< this.proveedores.length; i++){
             total = total + this.proveedores[i].monto;
            }
            this.valor.total = total;
          });


      }

    }

  }
  angular.module('libreriaApp')
    .component('topventas', {
      templateUrl: 'app/estrategico/topventas/topventas.html',
      controller: TopVentasController,
      controllerAs: 'pv'
    });
})();
