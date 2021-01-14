import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-goal-header',
  templateUrl: './goal-header.component.html',
  styleUrls: ['./goal-header.component.scss']
})
export class GoalHeaderComponent implements OnInit {

  percentageComplete!: number 

  @Input('goalInput') goal: any

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.percentageComplete = this.goal?.percentage_complete
  }

}
