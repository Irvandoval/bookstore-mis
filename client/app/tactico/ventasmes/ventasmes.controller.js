(function() {
  'use strict';
  class VentasMesController {
    constructor($http, Auth, $window) {
      this.$http = $http;
      this.valor = {};
      this.hoy = new Date();
      this.Auth = Auth;
      this.$window = $window;
    }

    $onInit() {
     this.$http({
         url: '/api/compartido/aniosventas',
         method: 'GET'
       })
        .then(anios =>{
          this.anios = anios.data;
        });
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

    procesar() {
      // if models are no undefined and inicio is less than fin are valid
      if (this.mes && this.anio) {
        let url = '/api/tactico/ventaspormes';
        let total = 0;
        this.$http({
            url: url,
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST',
            data: {
              mes: this.mes,
              anio: this.anio
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

    export() {
      let url = '/api/tactico/ventaspormes?mes='+ this.mes;
      url = url +'&anio=' + this.anio;
      url = url + '&user=' + this.Auth.getCurrentUser().name;
      url += '&limit=' + this.limit;
      this.$window.open(url,'_blank');
    }

  }
  angular.module('libreriaApp')
    .component('ventasmes', {
      templateUrl: 'app/tactico/ventasmes/ventasmes.html',
      controller: VentasMesController,
      controllerAs: 'pv'
    });
})();
