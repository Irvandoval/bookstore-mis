(function() {
  'use strict';
  class VentasProveedorController {
    constructor($http, Auth, $window) {
      this.$http = $http;
      this.valor = {};
      this.hoy = new Date();
      this.Auth = Auth;
      this.$window = $window;
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

    exportar(){
     console.log('entra');
       let url = '/api/tactico/ventasproveedor?fechaInicial='+ this.obtenerFecha(this.fecha.inicio);
       url = url +'&fechaFinal=' + this.obtenerFecha(this.fecha.fin);
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
    .component('ventasproveedor', {
      templateUrl: 'app/tactico/ventasproveedor/ventasproveedor.html',
      controller: VentasProveedorController,
      controllerAs: 'pv'
    });
})();
