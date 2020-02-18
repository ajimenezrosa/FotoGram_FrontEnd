import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { resolve } from 'url';

 const url = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  Token: string = null;

  constructor( private http: HttpClient,
               private storage: Storage) { }


    login(email: string, password: string){
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



   async guardarToken(token: string) {
      this.Token = token;
      await this.storage.set('token', token);
    }


}
