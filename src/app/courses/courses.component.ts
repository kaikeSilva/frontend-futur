import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { Course } from '../models/course';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseService } from './course.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  @ViewChildren(MatTable) matTables! : QueryList<MatTable<Course[]>>;
  displayedColumns: Array<string> = ['id', 'name', 'duration_minutes','actions']
 

  constructor(
    private _courseService: CourseService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCourses()
  }

  create() {
    const matDialogConfig = new MatDialogConfig()
    matDialogConfig.disableClose = false
    matDialogConfig.autoFocus= true
    matDialogConfig.width = "60%"
    
    const dialogRef = this._dialog.open(CourseFormComponent, matDialogConfig)
    
    dialogRef.afterClosed()
    .subscribe(
      (result) => {
        if (result) {
          this.loadCourses()
        }
        else console.log("erro");
      }
    )
  }


  delete(course: Course) {
    const dialogRef = this._dialog.open(
      ConfirmDialogComponent, {
        disableClose: false
      })
    
    dialogRef.componentInstance.confirmMessage = "tem certeza que deseja remover esse curso?"
    dialogRef.afterClosed()
    .subscribe(
      (result) => {
        console.log("resultado de fecchar: ", result);
        if (result) {
          this._courseService.delete(course.id).subscribe(
            (res) => {
              console.log("deu certo: ", res);
              this.loadCourses()
            },
            (err) => {
              
              console.log("deu erro: ", err);
            }
          )
        }
        else console.log("erro");
      }
    )
  }

  update(course: Course) {
    console.log("antes da dialog",course);
    const matDialogConfig = new MatDialogConfig()
    matDialogConfig.disableClose = false
    matDialogConfig.autoFocus= true
    matDialogConfig.width = "60%"
    matDialogConfig.data = {
      course: course
    }
    
    const dialogRef = this._dialog.open(
      CourseFormComponent, matDialogConfig)
    
    dialogRef.afterClosed()
    .subscribe(
      (result) => {
        if (result) {
          this.loadCourses()
        }
        else console.log("erro");
      }
    )
  }

  loadCourses(): void {
    this._courseService.all().subscribe(
      (res: any) => {
        this.courses = res
        console.log(this.courses);      },
      (err) => console.log(err)
    )
  }
}
