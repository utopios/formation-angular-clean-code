import { Component } from '@angular/core';

@Component({
  selector: 'app-demo-component',
  standalone: true,
  imports: [],
  templateUrl: './demo-component.component.html',
  styleUrl: './demo-component.component.css'
})
export class DemoComponentComponent {

  private element:any

  private transformationElement:any

  constructor(private transformationService: any) {
      this.transformationElement = this.transformationService.transform(this.element)
  }

  private LoadData() {
    this.showLoading()
    this.dataService.getData().subscribe(data => this.onDataLoaded(data))
  }

  private showLoading() {
    this.showSpinner()
  }

  private showSpinner() {
    //Implémentation
  }

  private hideSpinner() {
    //Implémentation
  }

  private processData(data:any) {
    //Implémentation
  }

  

  private onDataLoaded(data:any) {
    this.hideSpinner();
    this.processData(data);
  }

}
