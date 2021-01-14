import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoalItemService {

  constructor(
    private _http: HttpClient,
  ) { }

  update(id: number) {
    const url = environment.apiUrl + '/api/goal-items/'+id
    return this._http.put(url,[], {headers: {accept: 'application/json', authorization: "Bearer "+localStorage.getItem('token')}})
  }
}
