import { Component, ElementRef, Input, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { Course } from 'src/app/models/course';
import { LinearProgressBarComponent } from '../linear-progress-bar/linear-progress-bar.component';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  @Input() course!: Course
  @ViewChildren(LinearProgressBarComponent) lineBar!: QueryList<LinearProgressBarComponent>;
  
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }


}
