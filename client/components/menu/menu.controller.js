'use strict';

class MenuController {
  //end-non-standard

  //start-non-standard
  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.isEstrategico = Auth.isEstrategico;
    this.isTactico = Auth.isTactico;
    this.getCurrentUser = Auth.getCurrentUser;
    this.getCurrentUser = Auth.getCurrentUser;

  }

  $onInit(){
   console.log(this.getCurrentUser());
  }

}

angular.module('libreriaApp')
  .controller('MenuController', MenuController);
