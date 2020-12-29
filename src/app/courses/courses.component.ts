import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Course } from '../models/course';
import { CourseService } from './course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = new Array<Course>();
  displayedColumns: Array<string> = ['id', 'name', 'duration_minutes','actions']

  constructor(
    private _courseService: CourseService,
  ) { }

  ngOnInit(): void {
    this.loadCourses()
  }

  loadCourses(): void {
    this._courseService.all().subscribe(
      (res: any) => {
        this.courses = res
      },
      (err) => console.log(err)
    )
  }
}
