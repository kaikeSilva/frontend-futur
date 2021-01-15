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

  user!: User
  goal!: Goal

  @ViewChildren("buttonGoal") buttons!: QueryList<ElementRef<HTMLButtonElement>>

  constructor(
    private _userService: UserService,
    private _goalService: GoalsService,
    private _router: Router,
  ) {}
  
  ngOnInit(): void {
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
    if (this.buttons?.first) {
      this.buttons.first.nativeElement.classList.add('focus')
    }
  }

  getUser() {
    this._userService.getUser().subscribe(
      (res: any) => {
        this.user = res
        this.goal = this.user.goals[0]
        console.log(this.goal);

      },
      (err: any) => {console.log(err)}
    )
  }

  goalCliked(goal: any) {
    this.buttons.forEach( btn => {
      if (+btn.nativeElement.id == this.goal.id && this.goal.id != goal.id) {
        btn.nativeElement.classList.remove('focus')
      } else if (+btn.nativeElement.id == goal.id) {
        btn.nativeElement.classList.add('focus')
      }
    })
    this.goal = goal
    
    console.log(this.goal);
  }
}
