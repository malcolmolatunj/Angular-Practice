import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Contract } from '../../models';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-contract-generation',
  templateUrl: './contract-generation.component.html',
  styleUrls: ['./contract-generation.component.css'],
})
export class ContractGenerationComponent implements OnInit, OnDestroy {
  contractForm: FormGroup;
  contract!: Contract;
  routeSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private contractService: ContractService
  ) {}

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params
      .pipe(
        map((p) => +p.id),
        switchMap((id) => this.contractService.getContractById(id))
      )
      .subscribe((result) => {
        this.contract = result;
      });

    this.contractForm = this.fb.group({
      header: this.fb.group({
        title: [],
        vendor: [],
        type: [null, Validators.required],
        startDate: [],
        endDate: [],
        office: [null, Validators.required],
        manager: [null, Validators.required],
        location: [],
        currency: [null, Validators.required],
        amount: [],
        amountUSD: [],
        language: [null, Validators.required],
        programPOC: [],
        collaborators: this.fb.array([]),
        isAutoRenewed: [false],
        isVendorTemplateUsed: [false],
      }),
      lineItems: this.fb.group({}),
      paymentTerms: this.fb.group({}),
      contactDetails: this.fb.group({}),
      option: this.fb.group({}),
      additionalInfo: this.fb.group({}),
      reportingRequirements: this.fb.group({}),
      attachments: this.fb.group({}),
      discussion: this.fb.group({}),
      changeLog: this.fb.group({}),
    });
  }

  onSubmit() {
    console.log(this.contractForm.value);
  }

  onClear() {
    this.contractForm.reset();
  }
}
