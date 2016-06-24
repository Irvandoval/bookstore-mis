(function() {
  'use strict';
  class ProveedoresController {
    constructor($http, $window, Auth) {
      this.$http = $http;
      this.valor = {};
      this.hoy = new Date();
      this.$window = $window;
      this.Auth = Auth;
    }
    $onInit() {

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

    exportar(){
       let url = '/api/estrategico/proveedores?fechaInicial='+ this.obtenerFecha(this.fecha.inicio);
       url = url +'&fechaFinal=' + this.obtenerFecha(this.fecha.fin);
       url = url + '&user=' + this.Auth.getCurrentUser().name;
       this.$window.open(url,'_blank');
    }
    /* Return a string from a Date Object*/
    obtenerFecha(fecha){
      let mes = Number(fecha.getMonth()) + 1;
      return fecha.getFullYear() + '-' + mes + '-' + fecha.getDate();
    }

  }
  angular.module('libreriaApp')
    .component('proveedores', {
      templateUrl: 'app/estrategico/proveedores/proveedores.html',
      controller: ProveedoresController,
      controllerAs: 'pv'
    });
})();
