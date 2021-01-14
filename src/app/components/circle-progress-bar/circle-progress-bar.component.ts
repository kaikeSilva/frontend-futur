import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-circle-progress-bar',
  templateUrl: './circle-progress-bar.component.html',
  styleUrls: ['./circle-progress-bar.component.scss']
})
export class CircleProgressBarComponent implements OnInit {
  private _circunference!: number 
  private _percentage!: number 
  private _circle!: ElementRef;
  
  private _loaded: boolean = false


  @Input()
  public set percentage(v : number) {
    this._percentage = v;
    this.dataLoaded(v)
  }

  public get percentage() {
    return this._percentage
  }

  @ViewChild('circle')
  public set circle(v : ElementRef) {
    this._circle = v;
    this.dataLoaded(v)
  }
  
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this._loaded) {
      console.log("carregando grafico");
      this.loadCircunference()
    }
  }

  loadCircunference() {
    let strokeDashoffset = this._circunference - (((this._percentage/100)%100)*this._circunference)
    this._circle.nativeElement.style.strokeDashoffset = `${strokeDashoffset}`
  }

  dataLoaded(value: any) {
    if (this._circunference && this._circle) {
      this._loaded = true
      this.loadCircunference()
    }
  }
  
  ngAfterViewInit(): void {
    let raio = this._circle.nativeElement.attributes.r.nodeValue
    this._circunference = 2*Math.PI* raio
    console.log(this._percentage);
    this._circle.nativeElement.style.strokeDasharray = `${this._circunference} ${this._circunference}`
    this._circle.nativeElement.style.strokeDashoffset  = `${this._circunference}`
    this._circle.nativeElement.style.stroke = "blue" 
  } 
}
