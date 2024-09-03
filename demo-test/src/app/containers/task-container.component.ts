import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';



@Component({
  selector: 'app-task-container',
  template: `
    <app-task-list [tasks]="tasks" (taskAdded)="onTaskAdded()"></app-task-list>
  `,
})
export class TaskContainerComponent implements OnInit {
  tasks: Task[] = []; // Liste des tâches gérée par le conteneur

  constructor(private taskService: TaskService) {}

  // Initialise le composant en récupérant les tâches via le service
  ngOnInit(): void {
    this.loadTasks(); // Charge les tâches lors de l'initialisation du composant
  }

  // Charge les tâches depuis le service
  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  // Ajoute une nouvelle tâche via le service
  onTaskAdded(): void {
    const newTask: Task = { id: this.tasks.length + 1, title: `Task ${this.tasks.length + 1}`, completed: false };
    this.taskService.addTask(newTask); // Ajoute la nouvelle tâche via le service
    this.loadTasks(); // Recharge la liste des tâches après l'ajout
  }
}