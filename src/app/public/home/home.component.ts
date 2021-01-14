import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  interval: any
  percentage: number = 0

  constructor(private _http: HttpClient,) { }

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.percentage += 1 
    }, 1500)
  }

  ngOnDestroy(): void{
    clearInterval(this.interval)
  }
}
