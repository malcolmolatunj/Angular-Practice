import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService } from '../service/posts.service';

@Component({
  selector: 'app-post-entry',
  templateUrl: './post-entry.component.html',
  styleUrls: ['./post-entry.component.css'],
})
export class PostEntryComponent implements OnInit, OnDestroy {
  postForm: FormGroup;
  postId: number;
  selectorForm: FormGroup;
  selectionSubscription: Subscription;
  forms: { [key: string]: { [key: string]: any } } = {
    A: {
      title: [null, Validators.required],
      userId: [1],
    },
    B: {
      title: [null, Validators.required],
      body: [null, Validators.required],
      userId: [1],
    },
  };

  constructor(
    private fb: FormBuilder,
    private ps: PostsService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.selectionSubscription.unsubscribe();
  }

  ngOnInit() {
    this.selectorForm = this.fb.group({
      formId: [],
    });
    this.selectionSubscription = this.selectorForm.get('formId').valueChanges.subscribe(
      (id) => {
        this.postForm = this.fb.group(this.forms[id], { updateOn: 'submit' });
      }
    );
  }

  isFormPristine(): boolean {
    return this.postForm.pristine;
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
    this.postForm.markAllAsTouched();
    if (this.postForm.valid) {
      console.log(this.postForm.value);
      // this.ps.savePost(this.postForm.value).subscribe((post) => {
      //   this.router.navigate(['/posts/', 1]);
      // });
    }
  }
}
