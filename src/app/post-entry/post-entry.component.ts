import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PostsService } from '../service/posts.service';

@Component({
  selector: 'app-post-entry',
  templateUrl: './post-entry.component.html',
  styleUrls: ['./post-entry.component.css'],
})
export class PostEntryComponent implements OnInit {
  postForm: FormGroup;
  postId: number;

  constructor(
    private fb: FormBuilder,
    private ps: PostsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.postForm = this.fb.group(
      {
        title: [null, Validators.required],
        body: [null, Validators.required],
        userId: [1],
      },
      { updateOn: 'submit' }
    );
  }

  get title(): AbstractControl {
    return this.postForm.get('title');
  }

  get body(): AbstractControl {
    return this.postForm.get('body');
  }

  onClear(): void {
    this.postForm.reset({
      userId: 1,
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      this.ps.savePost(this.postForm.value).subscribe((post) => {
        this.router.navigate(['/posts/', 1])
      });
    }
  }
}
