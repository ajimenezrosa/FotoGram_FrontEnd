import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { resolve } from 'url';
import { Usuario } from '../interfaces/interfaces';
import { promise } from 'protractor';
import { NavController } from '@ionic/angular';

const url = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  Token: string = null;
  usuario: Usuario = {};

  constructor( private http: HttpClient,
               private storage: Storage,
               private navCtrl: NavController) { }


    login(email: string, password: string) {
        const data = { email, password } ;

        return new Promise( resolve => {
        this.http.post(`${url}/user/login`, data)
                .subscribe( resp => {
                  console.log(resp);

                  if (resp['ok'] ) {
                    this.guardarToken( resp['token']  );
                    resolve(true) ;
                  } else {
                    this.Token = null;
                    this.storage.clear();
                    resolve(false);
                  }

                });
      });


    }


    registro( usuario: Usuario )  {

      return new Promise( resolve => {
        this.http.post(`${url}/user/create`, usuario )
              .subscribe( resp => {
                console.log(resp);

                if (resp['ok'] ) {
                  this.guardarToken( resp['token']  );
                  resolve(true) ;
                } else {
                  this.Token = null;
                  this.storage.clear();
                  resolve(false);
                }


              });
      });

    }


   async guardarToken(token: string) {
      this.Token = token;
      await this.storage.set('token', token);
    }



    getUsuario() {
      if (!this.usuario._id) {
        this.validaToken();
      }
      return { ...this.usuario } ;
    }

     async cargarToken() {
          this.Token = await this.storage.get('token')
      }



    async validaToken(): Promise<boolean> {

     await this.cargarToken();

     if (!this.Token) {
       this.navCtrl.navigateRoot('/login');
       return Promise.resolve(false); }

     return new Promise( resolve => {

        const headers = new HttpHeaders({
           'x-token': this.Token
        });

        this.http.get(`${url}/user/` ,  { headers})
        .subscribe( resp => {
          
          if ( resp['ok']) {
            this.usuario = resp['usuario'];
            resolve(true);

                      }
                      else {
                        this.navCtrl.navigateRoot('/login');
                        resolve(false);
                      }
                    });
      });


    }


}
