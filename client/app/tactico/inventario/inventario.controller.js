(function() {
  'use strict';
  class InventarioController {
    constructor($http, Auth, $window) {
      this.$http = $http;
      this.valor = {};
      this.hoy = new Date();
      this.fecha = {};
      this.Auth = Auth;
      this.$window = $window;
    }
    $onInit() {
      console.log('hola a todos');
    }

    procesar() {
     console.log('entra');
      // if models are no undefined and inicio is less than fin are valid
      if (this.fecha.inicio  && this.limit && this.fecha.inicio <= new Date()) {
        let url = '/api/tactico/inventario';
        let total = 0;
        this.$http({
            url: url,
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST',
            data: {
              fecha: this.fecha.inicio,
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

    exportar(){
       let url = '/api/tactico/inventario?fecha='+ this.obtenerFecha(this.fecha.inicio);
       url = url + '&user=' + this.Auth.getCurrentUser().name;
       url += '&limit=' + this.limit;
       this.$window.open(url,'_blank');
    }
    /* Return a string from a Date Object*/
    obtenerFecha(fecha){
      let mes = Number(fecha.getMonth()) + 1;
      return fecha.getFullYear() + '-' + mes + '-' + fecha.getDate();
    }


  }
  angular.module('libreriaApp')
    .component('inventario', {
      templateUrl: 'app/tactico/inventario/inventario.html',
      controller: InventarioController,
      controllerAs: 'pv'
    });
})();
