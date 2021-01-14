import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Goal } from 'src/app/models/goal';
import { GoalItem } from 'src/app/models/goal-item';
import { GoalItemService } from '../goal-item.service';
import { GoalsService } from '../goals.service';

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.scss']
})
export class GoalDetailsComponent implements OnInit {

  id!: number
  goal!: Goal
  items: GoalItem[] = new Array<GoalItem>();
  displayedColumns: Array<string> = [ 'day', 'items']

  constructor(
    private _router: ActivatedRoute,
    private _goalService: GoalsService,
    private _goalItemService: GoalItemService
  ) { }

  ngOnInit(): void {
    this._router.params.subscribe(
      (params) => {
        this.id = +[params['id']]
        this.loadGoal()
      }
    )
  }

  loadGoal() {
    this._goalService.show(this.id).subscribe(
      res => {
        this.goal = res
        this.items = this.goal.goal_items_per_day
      }
    )
  }

  changeStatus(goalItem: any) {
    this._goalItemService.update(goalItem.id).subscribe(
      (response) => {
        this.loadGoal()
      },
      (error) => { console.log(error)}
    )
  }
}
