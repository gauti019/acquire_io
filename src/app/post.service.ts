import { Injectable } from '@angular/core';
import { BaseApiService } from '../app/base-api.service';
import { Config } from './app.config';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private config: Config = new Config;
  private uri: string = this.config.baseUrlLocal+'/data/';

  constructor(private baseApiService: BaseApiService) {
  }

  public post(obj: any, name: string): any {
    name = name ? name : 'default_user';
    return this.baseApiService.savePost(obj, this.uri + 'post/' + name);
  }

  public fetchAllPosts() {
    return this.baseApiService.fetchAllPostsEnd(this.uri + 'posts')
  }

  public increaseLikesCount(id: any) {
    return this.baseApiService.increaseLikesCountEnd(this.uri + 'post/' +id+ '/like');
  }

}
