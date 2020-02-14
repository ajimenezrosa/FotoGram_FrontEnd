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
