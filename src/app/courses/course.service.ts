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
}
