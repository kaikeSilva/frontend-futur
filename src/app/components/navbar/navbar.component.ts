import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/public/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input()
  public: boolean = true;

  constructor(
    private _authService: AuthenticationService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this._authService.logout(null).subscribe(
      (result: any) => {
      console.log(result);
      this._router.navigate(['/'])
    },
    (err: any) => console.log("deu erro",err))
  }
  
}
