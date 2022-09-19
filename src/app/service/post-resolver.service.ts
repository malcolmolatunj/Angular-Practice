import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../models';
import { PostsService } from './posts.service';

@Injectable()
export class PostResolver implements Resolve<Post> {
  constructor(private service: PostsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Post | Observable<Post> | Promise<Post> {
    const postId = Number(route.paramMap.get('id'));
    return this.service.getPostById(postId);
  }
}