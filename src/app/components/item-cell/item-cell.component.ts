import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-cell',
  templateUrl: './item-cell.component.html',
  styleUrls: ['./item-cell.component.scss']
})
export class ItemCellComponent implements OnInit {

  @Input() item: any

  constructor() { }

  ngOnInit(): void {
  }

}
