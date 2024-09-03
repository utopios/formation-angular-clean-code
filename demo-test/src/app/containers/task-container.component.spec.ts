import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskContainerComponent } from './task-container.component';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TaskContainerComponent', () => {
  let component: TaskContainerComponent;
  let fixture: ComponentFixture<TaskContainerComponent>;
  let taskService: jasmine.SpyObj<TaskService>;
  let mockTasks: Task[];

  beforeEach(async () => {
    mockTasks = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true },
    ];

    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['getTasks', 'addTask']);
    taskServiceSpy.getTasks.and.returnValue(mockTasks);

    await TestBed.configureTestingModule({
      declarations: [TaskContainerComponent], // Déclare uniquement le conteneur, pas ses enfants
      providers: [{ provide: TaskService, useValue: taskServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA], // Ignore les erreurs liées aux composants non déclarés comme TaskListComponent
    }).compileComponents();

    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test pour vérifier que le conteneur est bien créé
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test pour vérifier que les tâches sont récupérées du service
  it('should load tasks from the service and pass them to TaskListComponent', () => {
    expect(component.tasks).toEqual(mockTasks); // Vérifie que le conteneur a bien chargé les tâches
  });

  // Test pour vérifier que le conteneur peut ajouter une tâche et mettre à jour la liste
  it('should add a task and update the task list', () => {
    const newTask: Task = { id: 3, title: 'Task 3', completed: false };
    taskService.getTasks.and.returnValue([...mockTasks, newTask]); // Simule la mise à jour de la liste des tâches après ajout

    component.onTaskAdded(); // Appelle la méthode pour ajouter une tâche
    fixture.detectChanges(); // Déclenche la détection des changements

    expect(component.tasks.length).toBe(3); // Vérifie que la nouvelle tâche est ajoutée à la liste
    expect(component.tasks).toContain(newTask); // Vérifie que la nouvelle tâche est présente dans la liste
  });

  // Test pour vérifier que le composant enfant est bien rendu (sans tester son contenu)
  it('should render TaskListComponent', () => {
    const taskListElement = fixture.debugElement.query(By.css('app-task-list'));
    expect(taskListElement).toBeTruthy(); // Vérifie que le TaskListComponent est bien présent dans le DOM
  });
});