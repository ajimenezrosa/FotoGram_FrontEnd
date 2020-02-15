import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaPosts } from '../interfaces/interfaces';

const url = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts = 0;

  constructor(private http: HttpClient) { }


  getPosts( pull?: boolean = false) {

    if ( pull )
    {  this.paginaPosts = 0;  }

    this.paginaPosts++;
    return this.http.get<RespuestaPosts>(`${ url }/post/?pagina=${ this.paginaPosts }`);
  }


}
