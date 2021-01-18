import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, SimpleChange, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { GoalItemService } from 'src/app/goals/goal-item.service';
import { GoalItem } from 'src/app/models/goal-item';
import { GoalItemFormComponent } from './goal-item-form/goal-item-form.component';

@Component({
  selector: 'app-goal-item-cell',
  templateUrl: './goal-item-cell.component.html',
  styleUrls: ['./goal-item-cell.component.scss']
})
export class GoalItemCellComponent implements OnInit {

  @Input() goalItem!: GoalItem
  @ViewChildren("bgSlide") bgSlide!:  QueryList<ElementRef<HTMLDivElement>>
  @Output() ChangeGoalItemStatusEvent = new EventEmitter<number>();
  
  _loading: boolean = false
  set loading(status: boolean) {
    this._loading = status
  }

  get loading(): boolean {
    return this._loading
  }

  constructor(
    private _goalItemService: GoalItemService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(change: SimpleChange): void {
    if(this.loading) 
      this.loading = false
  }

  ngAfterViewInit(): void {
  }

  navigateResource(urlSite: any) {
    if (urlSite) {
      let url = ''
      if (!/^http[s]?:\/\//.test(urlSite)) {
        url += 'http://';
      }
      console.log(urlSite);
      url += urlSite
      console.log(urlSite);

      const link = document.createElement('a');
      link.target = '_blank';
      link.href = url;
      link.setAttribute('visibility', 'hidden');
      link.click();
    }
  }

  done(action: string) {
    // TODO: adicionar ação para item concluido, desfeito e navegar para recurso
    this.loading = true; 
    this._goalItemService.update({id: this.goalItem.id}).subscribe(
      (res) => {
        this.ChangeGoalItemStatusEvent.emit(this.goalItem.goal_id)
      }
    )
  }

  update(goalItem: GoalItem) {
    const matDialogConfig = new MatDialogConfig()
    matDialogConfig.disableClose = false
    matDialogConfig.autoFocus= true
    matDialogConfig.width = "60%"
    matDialogConfig.data = {
      goalItem: goalItem
    }
    
    const dialogRef = this._dialog.open(
      GoalItemFormComponent, matDialogConfig)
    
    dialogRef.afterClosed()
    .subscribe(
      (result) => {
        if (result) {
          this.ChangeGoalItemStatusEvent.emit(this.goalItem.goal_id)
        }
        else console.log("erro");
      }
    )
  }

  // implementação de animação retirada
  // triggerAnimation(action: string) {
  //   if(action == "done") {
  //     if(this.bgSlide.first.nativeElement.classList.contains("transition-before"))
  //         this.bgSlide.first.nativeElement.classList.toggle("transition-before")
  //     if(!this.bgSlide.first.nativeElement.classList.contains("transition-after"))
  //       this.bgSlide.first.nativeElement.classList.toggle("transition-after")
  //   } else if (action == "undone") {
  //     setTimeout(() => {
  //       if(this.bgSlide.first.nativeElement.classList.contains("transition-after"))
  //         this.bgSlide.first.nativeElement.classList.toggle("transition-after")        
  //     },1000)
  //     this.bgSlide.first.nativeElement.classList.toggle("transition-before")
  //   }

  // }
}
