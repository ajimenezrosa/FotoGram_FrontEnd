
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


# Colocar imagenes en el BackGround del Slide

para esto debemos haremos lo siguiente.123

Creamos este css y lo colocamos en el post.component.css esto por decirlo de algu modo son los estilos que asignaremos a nuestras imagenes.
~~~css
.image-slide {
  width: 100%;
  height: 250px;

  /* Imagen centrada y colocada de forma elegante */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
~~~

luego de esto sustitumos el codigo 
    
    
    Codigo Anterior
    <img src="" alt="/assets/perro-3.jpg'"> 
    ================================================
     Codigo Actual

            <ion-slide class="image-slide"
               style="background-image: url('../../../assets/perro-1.jpg')" >

Nuestro codigo quedaria como se describe a continuacion.

~~~typeScript
   <ion-slides >
        <ion-slide class="image-slide"
               style="background-image: url('../../../assets/perro-1.jpg')" >
        </ion-slide>
        <ion-slide class="image-slide"
               style="background-image: url('../../../assets/perro-2.jpg')" >
        </ion-slide>
        <ion-slide class="image-slide"
               style="background-image: url('../../../assets/perro-3.jpg')" >
        </ion-slide>

    </ion-slides>
~~~


# DomSanitizer Pipe , colocar imagenes en el background del Slide. 

![socialmedioPiterQiut](https://cdn.dribbble.com/users/1528591/screenshots/5276854/artboard_2x_4x.png)

### En este punto colocaremos el nuestras imagenes en el Background de los Slides, pero si intentamos colocarlos directamente nuestra aplicacion los vera como una falla de seguridad, ***En realidad es una falla de seguridad, no debemos hacerlo de forma directa*** .

### a continuacion mostraremos como lo hicimos.

## creacion de Dom-sanitizer.pipe.
### mostramos el codigo a continuacion , es realmente facil , solo tomamos una imagen como un string y lo pasamos por la clase DomSanitizerPipe, metodo bypassSecurityTrustStyle.

~~~typeScript

@Pipe({
  name: 'domSanitizer'
})
export class DomSanitizerPipe implements PipeTransform {


    constructor( private domSanizer: DomSanitizer) {}

  transform( img: string): any {



    const domImg = `background-image: url(${ img })`;

    return this.domSanizer.bypassSecurityTrustStyle( domImg );
  }

}

~~~

## modificaion de nuestros Slide de imagenes.

### Ahora podemos pasar nuestras imagenes a travez de un pipe, para que nuestra aplicacion las muestre como seguras.  modificaremos nuestros post para colocar el pidpe ya creado.


~~~typeScript
     <ion-slide class="image-slide"
               [style]=" img1 | domSanitizer" >
        </ion-slide>
~~~

---


# Infinite-scroll de nuestros POSTs

    colocamos el infinite-scroll en nuestro html , especificamente en nuestro tab1.pages.
![infinite-scroll](https://i.stack.imgur.com/7JRta.gif)

~~~typeScript
  <ion-infinite-scroll threshold="105px" (ionInfinite)="siguientes($event)">
    <ion-infinite-scroll-content>
    </ion-infinite-scroll-content>
  </ion-infinite-scroll>
~~~

creamos un evento para llamar que sea llamado desde nuestro infinite-scroll
el mismo se dentendra al momento que no existan mas posts que cargar.123

para esto cambiamos el estatus al target con la instuccion ***event.target.disabled = true;***
al momento que ya se cargen todos los posts.

~~~typeScript
  siguientes( event? ){
    this.postsServices.getPosts()
            .subscribe( resp => {
              console.log(resp);
              this.posts.push(...resp.posts);
              
              
              if ( event ) {
                event.target.complete();
                    if( resp.posts.length === 0){
                      event.target.disabled = true;
                    }
              }   
            });

  }
~~~
---


# Refresher Cargar todos los POSTs Nuevamente.
|Refresher 1|Refresher 2| Refresher 3|
|--------|----------|----------|
| ![infinite-scroll](https://getcoldturkey.com/blog/wp-content/uploads/2019/02/infinite_scroll.gif) | ![infinite-scroll](https://media.giphy.com/media/NGEthFCIymRGg/giphy.gif) | ![infinite-scroll](https://i1.wp.com/ionicacademy.com/wp-content/uploads/2019/06/ionic-4-infinite-scroll.gif?fit=172%2C300&ssl=1)
|



### La actualización proporciona la funcionalidad de extracción para actualizar en un componente de contenido. El patrón de extracción para actualizar permite al usuario desplegar una lista de datos usando la función táctil para recuperar más datos.

### Los datos deben modificarse durante los eventos de salida del actualizador. Una vez que la operación asíncrona se ha completado y la actualización debe finalizar, llame a complete() en el programa de actualización.

## Uso de Android
### El uso del actualizador de iones nativo de MD requiere establecer la propiedad pullIcon en el contenido del actualizador de iones en el valor de uno de los hilanderos disponibles. Consulte la ***documentación*** de la hilatura iónica para conocer los valores aceptados. pullIcon tiene como valor predeterminado la rueda giratoria circular en MD.


~~~typeScript
  <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
    <ion-refresher-content></ion-refresher-content>
  </ion-refresher>
~~~

### El codigo que colocaremos en tab1.page.ts  se veria de la siguiente forma.

~~~typeScript
  siguientes( event? , pull: boolean = false){

      if(pull){
        this.scrollhabilidado =true;
        this.posts = [];
      }

    this.postsServices.getPosts( pull )
            .subscribe( resp => {
              console.log(resp);
              this.posts.push(...resp.posts);

              if ( event ) {
                     event.target.complete();
                    if( resp.posts.length === 0){
                      this.scrollhabilidado =false;
                    }
              }   
            });

  }

  doRefresh( event ) {
    this.siguientes( event, true);
  }
~~~
 

 ### tambien nos compete hacer modificaciones en nuestro Servicio para que acepte la varible **pull** de tipo *boolean* .


 ---

# Creacion de pantalla de Login de la aplicacion

|Refresher 1|Refresher 2| Refresher 3|
|--------|----------|----------|
| ![infinite-scroll](https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSGS-6IOKl1tw7S6HENgjMcoofo-JSEfx4wAbyaNkeYt5FdkQ8I) | ![infinite-scroll](https://camo.githubusercontent.com/267be5faf0bb30730516cd0047cbc2ddc7a627b1/687474703a2f2f7777772e616e64726f69647475746f7269616c736875622e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f31312f62373736626639652d363537632d346331662d623435322d6437653761323936363630305f6e65772e706e67) | ![infinite-scroll](https://androidsubway.files.wordpress.com/2016/04/login-design6.png?w=958)
|
----

### A continuacion  mostraremos las clases utilizadas para crear nuestra pantalla de login.

### esta pantalla continene ademas de un login una seccion de registro en la cual el usuario registrara nuevas cuentas utilizando su correo electronico como llave primaria.



Anexo el codigo que contiene nuestra pantalla de login. el mismo tiene.
~~~typeScript
<ion-content>


  <ion-slides class="mainSlide">
    
    <ion-slide>

      <form ngSubmit= "Login( flogin )" #flogin="ngForm">
        <ion-grid fixed>

          <ion-row>
            <ion-col>
              <img src="/assets/avatars/av-1.png">
            </ion-col>
          </ion-row>
        
          <ion-row>
            <ion-col>
              
                <ion-list>
                  
                  <ion-item>
                    <ion-label>Email</ion-label>
                    <ion-input name="email"
                                type="email"
                                required></ion-input>
                  </ion-item>

                  <ion-item>
                    <ion-label>Password</ion-label>
                    <ion-input name="password"
                                type="password"
                                required></ion-input>
                  </ion-item>

                </ion-list>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col>
              <ion-button type="submit"
                          color="tertiary"
                          shape="round">
                Login
              </ion-button>
            </ion-col>
          </ion-row>

        </ion-grid>
      </form>
    


    </ion-slide>

    <ion-slide>

      
      <ion-grid fixed>

            <ion-row>
            <ion-col>
                <h3>Seleccione Avatar</h3>
            </ion-col>
            </ion-row>

            <ion-row>
            <ion-col>
                <ion-slides  [options]="avatarSlide">
                <ion-slide *ngFor="let Avatar of avatars">
                    <ion-img class="pick-avatar" 
                            src="/assets/avatars/{{ Avatar.img }}"
                                  [ngClass]=" {'pick-avatar-seleccionado': Avatar.seleccionado}"
                                  (click)="seleccionarAvatar( Avatar )"></ion-img>

                </ion-slide>
                
                  <ion-slide style="background-image: url(/../../www/img/fondo.png)">
                    <h2>End</h2>
                  </ion-slide>
                </ion-slides>
            </ion-col>
            </ion-row>
        
            <form ngSubmit= "registro( fregistro )" #fregistro="ngForm">
                <ion-row>
                    <ion-col>
                        
                        <ion-list>
                            
                            <ion-item>
                            <ion-label>Email***</ion-label>
                            <ion-input name="email" 
                                        type="email"
                                        required></ion-input>
                            </ion-item>

                            <ion-item>
                            <ion-label>Nombre</ion-label>
                            <ion-input name="nombre"
                                        type="text"
                                        required></ion-input>
                            </ion-item>

                            <ion-item>
                            <ion-label>Password</ion-label>
                            <ion-input name="password"
                                        type="password"
                                        required></ion-input>
                            </ion-item>

                        </ion-list>
                    </ion-col>
                </ion-row>
                
                <ion-row>
                <ion-col>
                    <ion-button type="submit"
                                color="tertiary"
                                shape="round">
                        Crear usuario
                    </ion-button>
                </ion-col>
            </ion-row>
            
            </form>
        </ion-grid>
  
  
      </ion-slide>


  </ion-slides>



</ion-content>


<ion-footer no-border>
  <ion-toolbar>
    
    <ion-row>

      <ion-col>
          <ion-button shape="round"
                      expand="full"
                      size="small"
                      fill="outline"
                      color="tertiary">
            Ingresar
          </ion-button>
      </ion-col>

      <ion-col>
        <ion-button shape="round"
                    expand="full"
                    size="small"
                    fill="outline"
                    color="tertiary">
          Registrarme
        </ion-button>
      </ion-col>

    </ion-row>



  </ion-toolbar>
</ion-footer>
~~~


anexamos los css colocados en nuestra pagine de login



### Nuestro inicio de sesión contiene más estilo.
### Esto se declarará en la hoja de estilo.

### Echa un vistazo al código.
~~~css


.mainSlide, .mainSlide ion-slide {
  width: 100%;
  height: 100%;
}

img {
  width: 120px;
}

.pick-avatar {
  width: 80px;
  opacity: 0.3;
}

.pick-avatar-seleccionado {
  transition: opacity 0.5s linear;
  opacity: 1 !important;
}
~~~
---

# Aplicación de diseño de bloqueo y movimiento.


Por el momento debemos hacer que nuestras diapositivas se comporten como si fueran dos pantallas independientes.

Esto es más que nada para un aspecto visual y estético, para esto aplicaremos el siguiente código en nuestro *** login.page.ts ***
~~~typescript
  @ViewChild('slidePrincipal', { static: true})  slides: IonSlides;
~~~


También debemos crear los siguientes eventos para activar el Slide a nuestra voluntad.

~~~typescript

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

~~~

