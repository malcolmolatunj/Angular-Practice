import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requisition-lines',
  templateUrl: './requisition-lines.component.html',
  styleUrls: ['./requisition-lines.component.css']
})
export class RequisitionLinesComponent implements OnInit {

  columnsToDisplay: string[] = [
    'Item Category',
    'Item Description',
    'Funding Source',
    'UOM',
    'Quantity',
    'Estimated Unit Price',
    'Extended Price'
  ]

  constructor() { }

  ngOnInit() {
  }

}