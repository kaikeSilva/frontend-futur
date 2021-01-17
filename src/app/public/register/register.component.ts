import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { equalConfirm } from 'src/app/validators/equal-confirm.directive';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup
  duplicatedEmail: boolean = false
  
  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthenticationService
  ) {

  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required ]
    },{validators: equalConfirm})
  }

  get name() {return this.form?.get('name')}
  get email() {return this.form?.get('email')}
  get password() {return this.form?.get('password')}
  get password_confirm() {return this.form?.get('password_confirm')}

  emailChange() {
    if (this.duplicatedEmail) 
      this.duplicatedEmail = false
  }

  submit() {
    const formData =  this.form.getRawValue()

    this._authService.register(formData).subscribe(
      (result: any) => {
      localStorage.setItem('token', result.access_token)
      this._router.navigate(['/dashboard'])
    },
    (err: any) => {
      if (err.error.errors?.email) {
        this.duplicatedEmail = true
      }
    })
  }
}
