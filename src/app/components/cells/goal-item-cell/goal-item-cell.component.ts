import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { GoalItem } from 'src/app/models/goal-item';

@Component({
  selector: 'app-goal-item-cell',
  templateUrl: './goal-item-cell.component.html',
  styleUrls: ['./goal-item-cell.component.scss']
})
export class GoalItemCellComponent implements OnInit {

  @Input() goalItem!: GoalItem

  constructor() { }

  ngOnInit(): void {
  }

  done() {
    // TODO: adicionar ação para item concluido, desfeito e navegar para recurso 
    console.log("prontp");
  }
}
