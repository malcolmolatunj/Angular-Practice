import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Post } from '../models';

@Injectable()
export class PostsService {
  postUrl = 'https://jsonplaceholder.typicode.com/posts';
  posts: Post[] = [
    {
      id: 1,
      title: 'Title 1',
      body: 'Body 1',
      userId: 1,
    },
    {
      id: 2,
      title: 'Title 2',
      body: null,
      userId: 1,
    },
  ];
  constructor(private http: HttpClient) {}

  savePost(post: Post): Observable<Post> {
    this.posts.push(post);
    return of(post);
    // return this.http.post<Post>(this.postUrl, post).pipe(
    //   catchError((err) => {
    //     console.warn(err);
    //     return EMPTY;
    //   })
    // );
  }

  getPosts(): Observable<Post[]> {
    return of(this.posts);
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
