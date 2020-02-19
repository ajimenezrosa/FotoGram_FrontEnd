import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiserviceService } from '../../services/uiservice.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  @ViewChild('slidePrincipal', { static: true})  slides: IonSlides;



  loginuser = {
    email: 'Hector.ortiz@INABIMA.GOB.DO',
    password: '123456'
  };


  registerUser: Usuario = {
      email: 'jimenezrosa@gmail.com',
      password: '123456',
      nombre: 'Jimenezrosa',
      avatar: 'av-1.png'
  };

  constructor( private usuarioService: UsuarioService,
               private navCtrl: NavController,
               private alertCtrl: UiserviceService) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }


 async Login( flogin: NgForm ) {

    if (flogin.invalid ) { return; }

    const valido = await  this.usuarioService.login( this.loginuser.email, this.loginuser.password );

    if (valido) {
        // navegar al tabs
        this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true } );
      } else {
        // Mostrar alerta de usuario y contrasena no correctos
        this.alertCtrl.AlertaInformativa('Usuario y Contraseña no son correctas.');
      }

  }


    async  registro( fregistro: NgForm ) {

    if ( fregistro.invalid) { return ;}

    const valido = await this.usuarioService.registro(this.registerUser);

    if (valido) {
      // navegar al tabs
      this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true } );
    } else {
      // Mostrar alerta de usuario y contrasena no correctos
      this.alertCtrl.AlertaInformativa('Ese correo electronico ya existe.');
    }

  }


 



  mostrarRegistro() {

      this.slides.lockSwipes(false);
      this.slides.slideTo(1);
      this.slides.lockSwipes(true);
    }
    
    mostrarLogin() {
      this.slides.lockSwipes(false);
      this.slides.slideTo(0);
      this.slides.lockSwipes(true);
   }


}
