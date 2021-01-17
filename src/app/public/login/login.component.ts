import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {environment} from 'src/environments/environment';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup
  
  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthenticationService
  ) {

  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  get email() {return this.form.get('email')}
  get password() {return this.form.get('password')}

  submit() {
    const formData =  this.form.getRawValue()

    this._authService.login(formData).subscribe(
      (result: any) => {
      localStorage.setItem('token', result.access_token)
      this._router.navigate(['/dashboard'])
    },
    (err: any) => console.log("deu erro",err))
  }

}
