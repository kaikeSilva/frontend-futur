import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GoalItemService } from 'src/app/goals/goal-item.service';
import { GoalItem } from 'src/app/models/goal-item';

@Component({
  selector: 'app-goal-item-form',
  templateUrl: './goal-item-form.component.html',
  styleUrls: ['./goal-item-form.component.scss']
})
export class GoalItemFormComponent implements OnInit {

  goalItem!: GoalItem
  creating: boolean = true
  title: string = "Comentários"
  form!: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _goalItemService: GoalItemService,
    private _dialogRef: MatDialogRef<GoalItemFormComponent>
  ) { 
    this.goalItem = this?.data?.goalItem
    if (this.goalItem?.id) this.creating = false
  }

  ngOnInit(): void {
    this.form = this.createForm()
  }

  createForm() {
    return this._formBuilder.group({
      comments:  [this.goalItem?.comments, []],
    })
  }

  update() {
    const formData =  this.form.getRawValue()

    this._goalItemService.update({formData: formData,id: this.goalItem.id}).subscribe(
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
