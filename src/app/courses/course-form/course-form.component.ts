import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'src/app/models/course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  form!: FormGroup
  course!: Course 
  title: string = "Novo Curso"
  creating: boolean = true

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _couseService: CourseService,
    private _dialogRef: MatDialogRef<CourseFormComponent>
  ) { 
    this.course = this?.data?.course
    if (this.course?.id) this.creating = false
    this.title = this.data? "Editar curso": this.title
  }

  ngOnInit(): void {
    this.form = this.createForm()
  }

  createForm() {
    return this._formBuilder.group({
      name:  [this.course?.name, Validators.required],
      description:  [this.course?.description, Validators.required],
      resource_place:  [this.course?.resource_place, Validators.required],
      duration_minutes:  [this.course?.duration_minutes, Validators.required],
      duration_hours:  [this.course?.duration_minutes, Validators.required],
    })
  }

  get name() { return this.form.get('name') }
  get description() { return this.form.get('description') }
  get resource_place() { return this.form.get('resource_place') }
  get duration_minutes() { return this.form.get('duration_minutes') }
  get duration_hours() { return this.form.get('duration_hours') }

  create() {
    const formData =  this.form.getRawValue()

    this._couseService.store(formData).subscribe(
      (data) => {
        this.form.reset()
        this._dialogRef.close(data)
      },
      (error) => {
        this._dialogRef.close(error)
      }
    )
  }

  update() {
    const formData =  this.form.getRawValue()

    this._couseService.update(formData, this.course.id).subscribe(
      (data) => {
        this.form.reset()
        this._dialogRef.close(data)
      },
      (error) => {
        this._dialogRef.close(error)
      }
    )
  }


}
