import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseService } from 'src/app/courses/course.service';
import { Course } from 'src/app/models/course';
import { Goal } from 'src/app/models/goal';
import { GoalsService } from '../goals.service';

@Component({
  selector: 'app-goals-form',
  templateUrl: './goals-form.component.html',
  styleUrls: ['./goals-form.component.scss']
})
export class GoalsFormComponent implements OnInit {
  form!: FormGroup
  goal!: Goal 
  dialogTitle: string = "Nova meta"
  creating: boolean = true
  coursesForSelect: Course[] = []
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _goalService: GoalsService,
    private _courseService: CourseService,
    private _dialogRef: MatDialogRef<GoalsFormComponent>
  ) { 
    this.goal = this?.data?.goal
    if (this.goal?.id) this.creating = false
    this.dialogTitle = this.data ? "Editar Meta": this.dialogTitle
  }

  ngOnInit(): void {

    if (this.creating) {
      this._courseService.all().subscribe(
        (res) => {
          this.coursesForSelect = res
        },
        (err) => console.log(err)
      )
    }

    this.form = this.createForm()
  }

  createForm() {
    if (this.creating) {
      return this._formBuilder.group({
        title:  [this.goal?.title, Validators.required],
        description:  [this.goal?.description, Validators.required],
        days_limit:  [this.goal?.days_limit, Validators.required],
        courses:  [this.goal?.courses, Validators.required]
      })
    } 

    return this._formBuilder.group({
      title:  [this.goal?.title, Validators.required],
      description:  [this.goal?.description, Validators.required]
    })

  }

  get title() { return this.form.get('title') }
  get description() { return this.form.get('description') }
  get days_limit() { return this.form.get('days_limit') }
  get courses() { return this.form.get('courses') }

  create() {
    const formData =  this.form.getRawValue()
    this._goalService.store(formData).subscribe(
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

    this._goalService.update(formData, this.goal.id).subscribe(
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
