import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];

  post = {
    mensaje: '',
    coords: null,
    posicion: false
  };


  constructor( private postsService: PostsService,
               private route: Router) {}


 async crearPost() {
      // console.log(this.post);
     const creado = await this.postsService.crearPost( this.post );

     // Inicializamos el Objeto vacio
     this.post = {
      mensaje: '',
      coords: null,
      posicion: false
    };

    // navegamos a tab1 este es a nuestra pantalla de post
     if (creado) {

       this.postsService.getPosts();
      this.route.navigateByUrl('/main/tabs/tab1');
    }


  }
}
