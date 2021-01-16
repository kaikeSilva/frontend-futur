import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient,
  ) { }
  
  getUser(formData: any) {

    var url = environment.apiUrl + '/api/users'
    
    return this._http.get(url, {
      headers: { 
      authorization: "Bearer "+localStorage.getItem('token'),
      filters:  JSON.stringify(formData) 
    }}).pipe(
      map((result: any) => result = new User().deserialize(result.data))
    )
  }
}
