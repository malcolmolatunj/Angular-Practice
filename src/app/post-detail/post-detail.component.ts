import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models';
import { PostsService } from '../service/posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  postForm: FormGroup;
  post: Post;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private ps: PostsService
  ) {}

  ngOnInit() {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.ps.getPostById(postId).subscribe((post) => (this.post = post));
    this.postForm = this.fb.group({
      id: [1],
      title: ['t'],
      body: ['b'],
      userId: [1],
    });
  }

  get title(): AbstractControl {
    return this.postForm.get('title');
  }

  get body(): AbstractControl {
    return this.postForm.get('body');
  }

  onSubmit(): void {}

  onClear(): void {}
}
