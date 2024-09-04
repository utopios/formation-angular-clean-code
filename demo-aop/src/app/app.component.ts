import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExampleService } from './example.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
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
  }
  title = 'demo-aop';
}
