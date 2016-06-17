(function() {
  'use strict';
  class VentasProveedorController {
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
      if (this.fecha.inicio && this.fecha.fin && this.fecha.inicio < this.fecha.fin && this.limit) {
        let url = '/api/tactico/ventasproveedor';
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
             total = total + this.proveedores[i].cantidad;
            }
            this.valor.total = total;
          });

      }

    }

  }
  angular.module('libreriaApp')
    .component('ventasproveedor', {
      templateUrl: 'app/tactico/ventasproveedor/ventasproveedor.html',
      controller: VentasProveedorController,
      controllerAs: 'pv'
    });
})();
