import { Injectable } from '@angular/core';
import { LogDecorator } from './core/decorator/log.decorator';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  constructor() { }

  @LogDecorator
  firstMethod(): void {
    console.log("first method")
  }

  secondMethod() {
    console.log("second method")
  }
}
