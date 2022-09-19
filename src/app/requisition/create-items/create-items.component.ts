import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-items',
  templateUrl: './create-items.component.html',
  styleUrls: ['./create-items.component.css'],
})
export class CreateItemsComponent implements OnInit {
  @Input() parentForm: FormGroup;
  
  item: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.item = this.fb.group({
      itemCategoryId: [null, Validators.required],
      uomId: [null, Validators.required],
      qty: [0, [Validators.min(0), Validators.required]],
      description: [null, Validators.required],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      isInKind: [false],
      notes: [],
    });
  }

  onSaveAndCreateNew(): void {
    console.log('clicked Save and Create New', this.item.value)
  }
}
