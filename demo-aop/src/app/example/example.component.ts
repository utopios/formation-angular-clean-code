import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MyService } from './my-service.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
})
export class ExampleComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();  // Sujet utilisé pour notifier la destruction du composant
  public data: any;

  constructor(private myService: MyService) {}

  ngOnInit(): void {
    // Abonnement à l'observable avec nettoyage via takeUntil
    this.myService.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.data = data;
      });
  }

  ngOnDestroy(): void {
    // Notification pour détruire les abonnements
    this.destroy$.next();
    this.destroy$.complete();
  }
}