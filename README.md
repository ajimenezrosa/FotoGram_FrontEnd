
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

---------

### Este es el Modulo de components.module.ts en el mismo presentamos los componentes que fueron declarados y exportados para que nuestro modulo pudiera funcionar.123

~~~typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    PostsComponent,
    PostComponent
  ],
  exports: [
    PostsComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }

~~~

# postComponents.html Disenos Multicolumnas.

~~~typescript
<ion-grid>
      <ion-row >
            <ion-col  size="12" size-lg="3" size-md="4" size-sm="6" size-xs="12"
            *ngFor="let post of posts">
            <app-post 
                  [post]="post" ></app-post>
            
            </ion-col>
      </ion-row>
</ion-grid>
~~~

Este codigo nos permite hacer un componente adaptable a los diferentes tipos de pantallas

lo cual permite que nuestra aplicacion se adapte a los diferentes componentes.

-------

# PostComponents HTML de un post

procedremos disenar el html de nuestro post
esto lo haremos en nuestro Post.components.html 
agregaremos los componentes para que nuestro pos se mire tal cual queremos

~~~typeScript


<div class="post">

<ion-item line="none" >

  <ion-avatar slot="start">
      <img src="../../../assets/avatars/{{post.usuario.avatar}}" alt="AvatarImg">
  </ion-avatar>

    <ion-label>
        <h2> {{ post.usuario.nombre }}</h2>
        <h4>{{ post.usuario.email }}</h4>
    </ion-label>

</ion-item>

    <ion-slides>
        <ion-slide>
            <img src="../../../assets/perro-1.jpg" alt="">
        </ion-slide>
        <ion-slide>
            <img src="../../../assets/perro-2.jpg" alt="">
        </ion-slide>
        <ion-slide>
            <img src="../../../assets/perro-3.jpg" alt="">
        </ion-slide>
    </ion-slides>

  <!--mapas-->

  <ion-item line="none">
      
        <ion-icon slot="start" name="heart-outline"></ion-icon>
        <ion-icon slot="end" name="bookmark"></ion-icon>
  </ion-item>


    <ion-item line="none">
        <ion-label text-wrap>
            {{ post.mensaje }}   
        </ion-label>
    </ion-item>


</div>
~~~

### Como podran notar el componente que carga nuestras imagenes aun esta fijo con, es decir no carga imagenes desde nuestro servico.

### Ya nos ocuparemos de esto en mas adelante. por ahora lo que nos compete hacer configurar nuesta post.comsponent.html para hacer que nuestro vista sea un poco mas agradable al usuario.

---
![imagenredes1](https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBVM9lW.img?h=0&w=720&m=6&q=60&u=t&o=f&l=f)
# 
