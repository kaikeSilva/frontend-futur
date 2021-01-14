import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Goal } from '../models/goal';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  constructor(
    private _http: HttpClient
  ) { }

  all() {
    const url = environment.apiUrl + '/api/goals'
    return this._http.get(url, {headers: {accept: 'application/json', authorization: "Bearer "+localStorage.getItem('token')}}).pipe(
      map((res: any) => res.data = Goal.parseArray(res.data))
    )
  }

  store(formData: any) {
    const data = {
      title:  formData.title,
      description:  formData.description,
      days_limit:  formData.days_limit,
      courses:  formData.courses,
    }
    const url = environment.apiUrl + '/api/goals'
    return this._http.post(url, data, {headers: {accept: 'application/json', authorization: "Bearer "+localStorage.getItem('token')}}).pipe(
      map((res: any) => res.data = new Goal().deserialize(res.data))
    )
  }

  update(formData: any, id: number) {
    const data = {
      title:  formData.title,
      description:  formData.description
    }
    const url = environment.apiUrl + '/api/goals/'+id
    return this._http.put(url, data, {headers: {accept: 'application/json', authorization: "Bearer "+localStorage.getItem('token')}}).pipe(
      map((res: any) => res.data = new Goal().deserialize(res.data))
    )
  }

  show(id: number) {
    const url = environment.apiUrl + '/api/goals/'+id
    return this._http.get(url, {headers: {accept: 'application/json', authorization: "Bearer "+localStorage.getItem('token')}}).pipe(
      map((res: any) => res.data = new Goal().deserialize(res.data))
    )
  }

  delete(id: number) {
    const url = environment.apiUrl + '/api/goals/'+id
    return this._http.delete(url, {headers: {accept: 'application/json', authorization: "Bearer "+localStorage.getItem('token')}})
  }
}
