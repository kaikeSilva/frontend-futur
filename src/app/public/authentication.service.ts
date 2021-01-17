import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) {

  }

  login(formData: any) {
    const data = {
      email: formData.email,
      password: formData.password
    }

    const url = environment.apiUrl + '/api/login'
    return this._http.post(url, data, {headers: {accept: 'application/json'}})
  }

  logout(formData: any) {
    const url = environment.apiUrl + '/api/logout'
    return this._http.post(url, null, {headers: {accept: 'application/json', authorization: "Bearer "+localStorage.getItem('token')}})
  }

  register(formData: any) {
    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirm: formData.password_confirm
    }

    const url = environment.apiUrl + '/api/register'
    return this._http.post(url, data, {headers: {accept: 'application/json'}})
  }

}
