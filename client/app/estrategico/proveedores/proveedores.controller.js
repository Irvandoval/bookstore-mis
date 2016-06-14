(function() {
  'use strict';
  class ProveedoresController {
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
        let url = '/api/estrategico/proveedores';
        let total = 0;
        this.$http({
            url: url,
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST',
            data: {
              fechaInicial: this.fecha.inicio,
              fechaFinal: this.fecha.fin
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
    .component('proveedores', {
      templateUrl: 'app/estrategico/proveedores/proveedores.html',
      controller: ProveedoresController,
      controllerAs: 'pv'
    });
})();
