import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models';
import { PostsService } from '../service/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts$: Observable<Post[]>
  constructor(private ps: PostsService) { }

  ngOnInit() {
    this.posts$ = this.ps.getPosts();
  }

  trackByFn(index: number, item: Post): string {
    return item.title;
  }

}