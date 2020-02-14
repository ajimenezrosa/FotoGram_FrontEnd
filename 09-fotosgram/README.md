
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

en este servicio podemos ver que llamamos el BackEnd que realizamos anteriormente.

esto retornara un archivo .json el cual consumiremos en nuestra aplicacion de FrontEnd

---

# Debemos hacer la implementacion de las Interfaces.

### las interfaces que mostramos a continuacion son creadas a partir de las respuestas a nuestro servico de BackEnd


~~~typescript
export interface RespuestaPosts {
  ok: boolean;
  pagina: number;
  posts: Post[];
}

export interface Post {
  imgs?: string[];
  _id?: string;
  mensaje?: string;
  coords?: string;
  usuario?: Usuario;
  created?: string;
}

export interface Usuario {
  avatar?: string;
  _id?: string;
  nombre?: string;
  email?: string;
 }
~~~

modificamos el servicos e hicimos que el objeto que nos retorna sea de tipos respuesta

~~~typescript
return this.http.get<RespuestaPosts>(`${ url }/post/?pagina=${ this.paginaPosts }`);
~~~
como podemos notar el objeto que retorna sera de tipo ***RespuestaPosts***

esto para poder monejar los objetos que retorna de una forma mas facil y segura.123

