import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Post } from '../models';

@Injectable()
export class PostsService {
  postUrl = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) {}

  savePost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postUrl, post).pipe(
      catchError((err) => {
        console.warn(err);
        return EMPTY;
      })
    );
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.postUrl}/${id}`).pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }
}
