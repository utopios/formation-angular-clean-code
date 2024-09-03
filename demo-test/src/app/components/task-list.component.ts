import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-list',
  template: `
    <ul>
      <li *ngFor="let task of tasks">{{ task.title }}</li>
    </ul>
    <button (click)="onAddTask()">Add Task</button>
  `,
})
export class TaskListComponent {
  @Input() tasks: Task[] = []; // Propriété d'entrée pour recevoir les tâches depuis le conteneur
  @Output() taskAdded = new EventEmitter<void>(); // Événement émis lors de l'ajout d'une tâche

  // Méthode appelée lors du clic sur le bouton pour émettre l'événement d'ajout de tâche
  onAddTask() {
    this.taskAdded.emit(); // Émet un événement pour signaler qu'une tâche doit être ajoutée
  }
}