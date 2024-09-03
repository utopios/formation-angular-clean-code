import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { By } from '@angular/platform-browser';
import { Task } from '../models/task.model';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  // Configuration de l'environnement de test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent], // Déclare le composant pour le test
    }).compileComponents();
  });

  // Initialisation du composant avant chaque test
  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent); // Crée une instance du composant pour le test
    component = fixture.componentInstance; // Récupère l'instance du composant
    fixture.detectChanges(); // Déclenche la détection des changements pour initialiser le DOM
  });

  // Test pour vérifier que le composant est bien créé
  it('should create', () => {
    expect(component).toBeTruthy(); // On s'attend à ce que le composant soit créé avec succès
  });

  // Test pour vérifier que le composant affiche une liste de tâches
  it('should display a list of tasks', () => {
    const tasks: Task[] = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true },
    ]; // Création de deux tâches pour le test

    component.tasks = tasks; // Assigne les tâches à la propriété tasks du composant
    fixture.detectChanges(); // Déclenche la détection des changements pour mettre à jour le DOM

    const taskElements = fixture.debugElement.queryAll(By.css('li')); // Récupère tous les éléments <li> du DOM
    expect(taskElements.length).toBe(2); // Vérifie que le nombre d'éléments <li> est correct
    expect(taskElements[0].nativeElement.textContent).toContain('Task 1'); // Vérifie que le premier <li> contient le texte "Task 1"
    expect(taskElements[1].nativeElement.textContent).toContain('Task 2'); // Vérifie que le second <li> contient le texte "Task 2"
  });

  // Test pour vérifier que le composant émet un événement lors de l'ajout d'une tâche
  it('should emit an event when the add task button is clicked', () => {
    spyOn(component.taskAdded, 'emit'); // Espionne l'événement taskAdded pour vérifier qu'il est bien émis

    const button = fixture.debugElement.query(By.css('button')); // Récupère le bouton du DOM
    button.triggerEventHandler('click', null); // Simule un clic sur le bouton

    expect(component.taskAdded.emit).toHaveBeenCalled(); // Vérifie que l'événement taskAdded a été émis
  });
});