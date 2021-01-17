import { HttpClient } from '@angular/common/http';
import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';
import { Component, ElementRef, OnInit, ViewChild, AfterContentInit, AfterViewInit, AfterViewChecked, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from 'protractor';
import { environment } from 'src/environments/environment';
import { GoalsService } from '../goals/goals.service';
import { Goal } from '../models/goal';
import { User } from '../models/user';
import { UserService } from './user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: User = new User()
  _goal!: Goal
  date: Date = new Date()

  set goal(goal: Goal) {
    this._goal = goal
  }

  get goal(): Goal {
    return this._goal
  }

  @ViewChildren("buttonGoal") buttons!: QueryList<ElementRef<HTMLButtonElement>>

  constructor(
    private _userService: UserService,
    private _goalService: GoalsService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.getUser()
  }

  dateChangeEventHandle(event: any) {
    this.date = new Date(event.date)
    this.getUser()
  }

  ngAfterViewInit(): void {
    this.buttons.changes.subscribe(
      (res) => {
        this.setWithinFocus(res," after change")
    })
    this.setWithinFocus(this.buttons," after init")
  }


  setWithinFocus(c: QueryList<ElementRef>, call: string) {
    if (
      this.buttons?.first &&
      this.goal.id &&
      +this.buttons.first.nativeElement.id == this.goal.id) {
      this.buttons.first.nativeElement.classList.add('focus')
    } else this.goalCliked(this.goal)
  }

  goalItemChange(event: number) {
    this.getUser(event)
  }

  getUser(goalId: number = 0) {
    
    let data = this.formatDate(this.date) 

    this._userService.getUser(data).subscribe(
      (res: any) => {
        this.user = res
        if(goalId) {
          this.user.goals.forEach((goal) => {
            if(goalId == goal.id) this.goal = goal
          })
        } else {
          this.goal = this.user.goals[0]
        }
      },
      (err: any) => {console.log(err)}
    )
  }

  goalCliked(goal: Goal) {
    this.buttons.forEach( btn => {
      if (+btn.nativeElement.id == goal.id) {
          btn.nativeElement.classList.add('focus')
      } else {
        btn.nativeElement.classList.remove('focus')
      }
    })

    this.goal = goal
  }

  formatDate(date: Date = new Date()) {
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let day = date.getDate();
    return day+'-'+month + '-' + year;
  }
}
