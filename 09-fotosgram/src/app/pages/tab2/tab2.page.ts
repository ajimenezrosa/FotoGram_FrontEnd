import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { Post } from '../../interfaces/interfaces';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];
  cargandoGeo = false;
  post =   {
    mensaje: '',
    coords: null,
    posicion: false

  };


  constructor( private postsService: PostsService,
               private route: Router,
               private geolocation: Geolocation,
               private camera: Camera ) {}


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


  getGeo() {


    // this.cargandoGeo = !this.cargandoGeo;
    if (!this.post.posicion) {
        this.post.coords = null;
        return;
    }

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.cargandoGeo = false;
      const coords2 = `${resp.coords.latitude} , ${resp.coords.longitude}`;
      console.log(coords2);
      this.post.coords = coords2;
     }).catch((error) => {
       console.log('Error getting location', error);
       this.post.coords =false;
     });

  }


  camara() {


    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):

      const img = window.Ionic.WebView.convertFilesSrc( imageData )
      console.log(img);

      this.tempImages.push ( img );

    }, (err) => {
     // Handle error
    });

  }




}
