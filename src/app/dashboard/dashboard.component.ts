import { HttpClient } from '@angular/common/http';
import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { UserService } from './user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user!: User

  constructor(
    private _userService: UserService,
    private _router: Router,
  ) {}
  
  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this._userService.getUser().subscribe(
      (res: any) => {
        this.user = res
        console.log(this.user);
      },
      (err: any) => {console.log(err)}
    )
  }
}
