
![fotogram](https://www.panamaamerica.com.pa/sites/default/files/imagenes/2016/04/10/041016-PA-99-1-01.jpg)
# FotoGram Aplication.

# Creacion de Servicio para consumir datos del BackEnd

procederemos a realizar la creacion de Servicio
~~~javascript
  ionic g service services/posts
~~~

anexo el servicio configurado
~~~javascript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const url = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts = 0;

  constructor(private http: HttpClient) { }

  getPosts() {
    this.paginaPosts++;
    return this.http.get(`${ url }/post/?pagina=${ this.paginaPosts }`);
  }
}
~~~