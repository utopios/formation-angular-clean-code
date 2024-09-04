import { Injectable } from '@angular/core';
import { ExceptionHandler,ExceptionHandlerWithType, LogDecorator, LogExecutionTime } from './core/decorator/log.decorator';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  constructor() { }

  @LogDecorator
  @LogExecutionTime
  @ExceptionHandlerWithType(typeof(EvalError))
  firstMethod(): void {
    console.log("first method")
  }

  @ExceptionHandler
  secondMethod() {
    throw new Error("Error second method")
  }
}
