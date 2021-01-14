import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-linear-progress-bar',
  templateUrl: './linear-progress-bar.component.html',
  styleUrls: ['./linear-progress-bar.component.scss']
})
export class LinearProgressBarComponent implements OnInit {

  @ViewChild('line') linearBar!: ElementRef
  @Input() percentage: number = 0

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.loadPercentage()
  }

  ngAfterViewInit() {
    this.loadPercentage()
  }  

  loadPercentage() {
    if (this.linearBar) this.linearBar.nativeElement.style.width = `${this.percentage}%`
  }
}
