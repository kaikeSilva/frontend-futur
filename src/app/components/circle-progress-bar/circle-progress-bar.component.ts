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

  colorGreen: any = {
    red: 92, 
    green: 184,
    blue: 92
  } 

  colorRed : any = {
    red: 247, 
    green: 32, 
    blue: 32
  } 


  @Input()
  public set percentage(v : number | undefined) {
    this._percentage = v ?? 0;
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
    console.log(this.calculateRGB());
    this._circle.nativeElement.style.stroke = this.calculateRGB()
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
    this._circle.nativeElement.style.strokeDasharray = `${this._circunference} ${this._circunference}`
    this._circle.nativeElement.style.strokeDashoffset  = `${this._circunference}`;
    
  }
  
  calculateRGB() {

    if (this.percentage) {
      let red = (this.colorGreen.red * (this.percentage/100)) +  ((1 - (this.percentage/100) ) * this.colorRed.red)
      let green = (this.colorGreen.green * (this.percentage/100)) +  ((1 - (this.percentage/100) ) * this.colorRed.green)
      let blue = (this.colorGreen.blue * (this.percentage/100)) +  ((1 - (this.percentage/100) ) * this.colorRed.blue)
      return `rgb(${red},${green},${blue})`  
    }
    
    return `rgb(${this.colorGreen.red},${this.colorGreen.green},${this.colorGreen.blue})`
  }
}
