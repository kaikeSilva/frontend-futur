import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private _http: HttpClient
  ) { }

  all() {
    const url = environment.apiUrl + '/api/courses'
    return this._http.get(url, {headers: {accept: 'application/json', authorization: "Bearer "+localStorage.getItem('token')}}).pipe(
      map((res: any) => res.data = Course.parseArray(res.data))
    )
  }

  store(formData: any) {
    const data = {
      name:  formData.name,
      description:  formData.description,
      resource_place:  formData.resource_place,
      duration_minutes:  formData.duration_minutes,
      duration_hours:  formData.duration_hours,
    }
    const url = environment.apiUrl + '/api/courses'
    return this._http.post(url, data, {headers: {accept: 'application/json', authorization: "Bearer "+localStorage.getItem('token')}}).pipe(
      map((res: any) => res.data = new Course().deserialize(res.data))
    )
  }

  update(formData: any, id: number) {
    const data = {
      name:  formData.name,
      description:  formData.description,
      resource_place:  formData.resource_place,
      duration_minutes:  formData.duration_minutes,
      duration_hours:  formData.duration_hours,
    }
    const url = environment.apiUrl + '/api/courses/'+id
    return this._http.put(url, data, {headers: {accept: 'application/json', authorization: "Bearer "+localStorage.getItem('token')}}).pipe(
      map((res: any) => res.data = new Course().deserialize(res.data))
    )
  }

  delete(id: number) {

    const url = environment.apiUrl + '/api/courses/'+id
    return this._http.delete(url, {headers: {accept: 'application/json', authorization: "Bearer "+localStorage.getItem('token')}})
  }
}
