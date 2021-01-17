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
  displayedColumns: Array<string> = ['id', 'name','description', 'duration_minutes','actions']
 

  constructor(
    private _courseService: CourseService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCourses()
  }

  navigateResource(urlSite: any) {
    if (urlSite) {
      let url = ''
      if (!/^http[s]?:\/\//.test(urlSite)) {
        url += 'http://';
      }
      url += urlSite

      const link = document.createElement('a');
      link.target = '_blank';
      link.href = url;
      link.setAttribute('visibility', 'hidden');
      link.click();
    }
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
    
    dialogRef.componentInstance.confirmMessage = "tem certeza que deseja remover essa atividade?"
    dialogRef.afterClosed()
    .subscribe(
      (result) => {
        if (result) {
          this._courseService.delete(course.id).subscribe(
            (res) => {
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
      },
      (err) => console.log(err)
    )
  }
}
