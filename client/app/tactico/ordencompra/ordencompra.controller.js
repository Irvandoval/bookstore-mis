(function() {
  'use strict';
  class OrdenCompraController {
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
      if (this.opcion && this.limit) {
        console.log(this.opcion);
        let url = '/api/tactico/ordencompra';
        let total = 0;
        this.$http({
            url: url,
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST',
            data: {
              opcion: this.opcion,
              limit: this.limit
            }
          })
          .then(response => {
            this.proveedores = response.data;
            for (let i = 0; i < this.proveedores.length; i++) {
              total = total + this.proveedores[i].cantidad;
            }
            this.valor.total = total;
          });


      }

    }

    exportar(){
      console.log('entra');
      let url = '/api/tactico/ordencompra?opcion=' + this.opcion;
      url += '&limit=' + this.limit;
      url = url + '&user=' + this.Auth.getCurrentUser().name;
      this.$window.open(url,'_blank');
    }

    getMonth(m) {
      let mes = '';
      switch (m) {
        case 1:
          mes = 'enero';
          break;
        case 2:
          mes = 'febrero';
          break;
        case 3:
          mes = 'marzo';
          break;
        case 4:
          mes = 'abril';
          break;
        case 5:
          mes = 'mayo';
          break;
        case 6:
          mes = 'junio';
          break;
        case 7:
          mes = 'julio';
          break;
        case 8:
          mes = 'agosto';
          break;
        case 9:
          mes = 'septiembre';
          break;
        case 10:
          mes = 'octubre';
          break;
        case 11:
          mes = 'noviembre';
          break;
        case 12:
          mes = 'diciembre';
          break;

        default:
          mes = '';

      }

      return mes;
    }
    getTrimestre(t){
      if (t) {
       return t + 'º trimestre';
      }
      else {
       return '';
      }
    }

  }
  angular.module('libreriaApp')
    .component('ordencompra', {
      templateUrl: 'app/tactico/ordencompra/ordencompra.html',
      controller: OrdenCompraController,
      controllerAs: 'pv'
    });
})();
