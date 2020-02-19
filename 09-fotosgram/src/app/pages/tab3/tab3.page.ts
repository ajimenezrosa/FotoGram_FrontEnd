import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {


  private usuario: Usuario = {};

  constructor(private usuarioService: UsuarioService) {}


  ngOnInit() {
      this.usuario = this.usuarioService.getUsuario();
      console.log(this.usuario);
  }




  logout() {

  }



}
