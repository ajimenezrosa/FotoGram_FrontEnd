import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


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


  constructor() { }

  ngOnInit() {
  }


  Login( flogin: NgForm ) {
      console.log(flogin.valid);
  }


  registro( fregistro: NgForm ) {
    console.log(fregistro.valid);
  }


  seleccionarAvatar( avatar ) {
      this.avatars.forEach( av => av.seleccionado = false);
      avatar.seleccionado = true;    
  }

}
