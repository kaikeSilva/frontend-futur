import { HttpClient } from '@angular/common/http';
import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: any

  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) {}
  
  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    var url = environment.apiUrl + '/api/users'
    this._http.get(url, {headers: {authorization: "Bearer "+localStorage.getItem('token')}}).subscribe(
      (res: any) => {
        this.user = res
        console.log(this.user);
      },
      (err: any) => {console.log(err)}
    )
  }
}
