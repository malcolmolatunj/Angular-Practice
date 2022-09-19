import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { blankAfterTrim } from '../../custom-validators';
import { CreateItemsComponent } from '../create-items/create-items.component';

@Component({
  selector: 'app-requisition-entry',
  templateUrl: './requisition-entry.component.html',
  styleUrls: ['./requisition-entry.component.css'],
})
export class RequisitionEntryComponent implements OnInit {
  reqForm: FormGroup;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.reqForm = this.fb.group({
      reqHeaderForm: this.fb.group({
        id: [{ value: null, disabled: true }],
        title: [null, [Validators.required, blankAfterTrim]],
        currency: [null, Validators.required],
        requiredDate: [null, Validators.required],
        requestedBy: [{ value: 'Malcolm Olatunji', disabled: true }],
        requestedFor: [1, Validators.required],
        office: [null, Validators.required],
        selectionMethod: [],
        dept: [],
        status: [{ value: 'Requisition in Draft', disabled: true }],
      }),
      reqLines: this.fb.array([]),
    });
  }

  isFormPristine(): boolean {
    return this.reqForm.pristine;
  }

  onSave(): void {
    this.reqForm.markAllAsTouched();
    if (this.reqForm.valid) {
      console.log(this.reqForm.get('reqHeaderForm').value);
    }
  }

  onClear(): void {
    this.reqForm.reset({
      reqHeaderForm: {
        requestedFor: 'Malcolm Olatunji',
        requestedBy: 1,
        status: 'Requisition in Draft',
      },
    });
  }

  openCreateItemsDialog(): void {
    const dialogRef = this.dialog.open(CreateItemsComponent);
  }
}
