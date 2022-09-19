import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tasks: any[];
  statuses: any[];

  constructor() {}

  ngOnInit() {
    this.tasks = [{ name: 'Task 1' }, { name: 'Task 2' }, { name: 'Task 3' }];
    this.statuses = [
      { name: 'My Planned Requisitions' },
      { name: 'My Requisitions' },
      { name: 'My Solicitations' },
      { name: 'My Contracts' },
    ];
  }
}
