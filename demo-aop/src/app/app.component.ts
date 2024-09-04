import { Component, ErrorHandler, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExampleService } from './example.service';
import { CustomErrorHandler } from './core/handlers/custom-error.handler';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [
    {provide: ErrorHandler, useClass: CustomErrorHandler}
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  exampleService: ExampleService

  constructor(exampleService:ExampleService) {
    this.exampleService = exampleService
  }

  ngOnInit(): void {
    this.exampleService.firstMethod()
    this.exampleService.secondMethod()
  }
  title = 'demo-aop';
}
