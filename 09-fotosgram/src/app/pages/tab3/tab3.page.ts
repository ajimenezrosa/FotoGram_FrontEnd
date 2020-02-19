import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiserviceService } from '../../services/uiservice.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {


  private usuario: Usuario = {};

  constructor(private usuarioService: UsuarioService,
            private uiserviceService: UiserviceService) {}


  ngOnInit() {
      this.usuario = this.usuarioService.getUsuario();
      console.log(this.usuario);
  }



 async actualizar( fActulizar: NgForm) {
    if (fActulizar.invalid) { return ; }



   const actualizado =  await  this.usuarioService.actualizarUsuario(this.usuario);
 
    if ( actualizado){
          //toast con el mensaje
          this.uiserviceService.presentToast('Registro Actualizado.');
        }
        else {
          //Toast con el Error
          this.uiserviceService.presentToast('No se Pudo Actualizar.');
        }

  }

  logout() {

  }



}
