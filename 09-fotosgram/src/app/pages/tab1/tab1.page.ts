import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[] =[] ;

  scrollhabilidado = true;

  constructor( private postsServices: PostsService) {}


  ngOnInit() {
      this.siguientes();
  }


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


}
