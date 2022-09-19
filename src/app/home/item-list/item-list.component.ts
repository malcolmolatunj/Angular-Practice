import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  @Input() listTitle: string;
  @Input() icon: string;
  @Input() iconColor: string;
  @Input() items: any[];


  constructor() { }

  ngOnInit() {
  }

}