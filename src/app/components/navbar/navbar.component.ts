import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/public/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  form!: FormGroup
  _loading: boolean = false

  @Input()
  public: boolean = true;

  @Input()
  user!: User;

  @Output() ChangeDateEvent = new EventEmitter<any>();

  set loading(status: boolean) {
    this._loading = status
  }

  get loading(): boolean {
    return this._loading
  }

  constructor(
    private _authService: AuthenticationService,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.createForm()
    this.form.valueChanges.subscribe(
      (value) => {
        this.loading = true
        this.ChangeDateEvent.emit(this.form.value)
      }
    )
  }

  ngOnChanges(change: SimpleChange) {
    if (this.loading) this.loading = false
  }

  createForm() {
    return this._formBuilder.group({
      date:  [this.user?.today, []]
    })
  }

  logout() {
    this._authService.logout(null).subscribe(
      (result: any) => {
      this._router.navigate(['/'])
    },
    (err: any) => console.log("deu erro",err))
  }
  
  navigate(route: string) {
    if (route === '/' && !this.public) {
      this._router.navigate(["/dashboard"])
    } else this._router.navigate([route])
  }
}
