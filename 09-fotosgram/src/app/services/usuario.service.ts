import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';

 const url = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;

  constructor( private http: HttpClient,
               private storage: Storage) { }


    login(email: string, password: string){
        const data = { email, password } ;
        this.http.post(`${url}/user/login`, data)
                .subscribe( resp => {
                  console.log(resp);
                });
    }


}
