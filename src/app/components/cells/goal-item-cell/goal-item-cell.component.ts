import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { GoalItem } from 'src/app/models/goal-item';

@Component({
  selector: 'app-goal-item-cell',
  templateUrl: './goal-item-cell.component.html',
  styleUrls: ['./goal-item-cell.component.scss']
})
export class GoalItemCellComponent implements OnInit {

  @Input() goalItem!: GoalItem

  constructor() { }

  ngOnInit(): void {
  }

  done() {
    console.log("prontp");
  }
}
