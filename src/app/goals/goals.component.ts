import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { Goal } from '../models/goal';
import { GoalsFormComponent } from './goals-form/goals-form.component';
import { GoalsService } from './goals.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {
  goals: Goal[] = new Array<Goal>();
  displayedColumns: Array<string> = ['id', 'title', 'description','percentage_complete', 'actions']

  constructor(
    private _goalService: GoalsService,
    private _dialog: MatDialog,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.loadGoals()
  }

  loadGoals() {
    this._goalService.all().subscribe(
      (result: any) => {
        this.goals = result
      },
      (error) => console.log(error)
    )
  }

  create() {
    const matDialogConfig = new MatDialogConfig()
    matDialogConfig.disableClose = false
    matDialogConfig.autoFocus= true
    matDialogConfig.width = "60%"
    
    const dialogRef = this._dialog.open(GoalsFormComponent, matDialogConfig)
    
    dialogRef.afterClosed()
    .subscribe(
      (result) => {
        if (result) {
          this.loadGoals()
        }
        else console.log("erro");
      }
    )
  }

  update(goal: Goal) {
    console.log("antes da dialog",goal);
    const matDialogConfig = new MatDialogConfig()
    matDialogConfig.disableClose = false
    matDialogConfig.autoFocus= true
    matDialogConfig.width = "60%"
    matDialogConfig.data = {
      goal: goal
    }
    
    const dialogRef = this._dialog.open(
      GoalsFormComponent, matDialogConfig)
    
    dialogRef.afterClosed()
    .subscribe(
      (result) => {
        if (result) {
          this.loadGoals()
        }
        else console.log("erro");
      }
    )
  }

  delete(goal: Goal) {
    const dialogRef = this._dialog.open(
      ConfirmDialogComponent, {
        disableClose: false
      })
    
    dialogRef.componentInstance.confirmMessage = "tem certeza que deseja remover essa meta?"
    dialogRef.afterClosed()
    .subscribe(
      (result) => {
        console.log("resultado de fechar: ", result);
        if (result) {
          this._goalService.delete(goal.id).subscribe(
            (res) => {
              console.log("deu certo: ", res);
              this.loadGoals()
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

  details (goal: Goal) {
    this._router.navigate(['/goal', goal.id]);
  }
}
