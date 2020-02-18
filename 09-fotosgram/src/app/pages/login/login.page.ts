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

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
];


avatarSlide = {
  slidesPerView: 3.5
};


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


  seleccionarAvatar( avatar ) {
      this.avatars.forEach( av => av.seleccionado = false);
      avatar.seleccionado = true;
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
