import { TestBed } from "@angular/core/testing";
import { TaskService } from "./task.service";
import { Task } from "../models/task.model";

describe("TaskService", () => {
    let taskService: TaskService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TaskService]
        });
        taskService = TestBed.inject(TaskService)
    })
    
    // Test pour vérifier que le service est bien créé
    it('should be created', () => {
        expect(taskService).toBeTruthy(); // Vérifie que le service est créé avec succès
    });

    // Test pour vérifier que le service retourne une liste de tâches vide initialement
    it('should return an empty array initially', () => {
        expect(taskService.getTasks()).toEqual([]); // On s'attend à ce que la liste des tâches soit vide au départ
    });

    // Test pour vérifier que le service permet d'ajouter une tâche
    it('should add a task', () => {
        const oldLength = taskService.getTasks().length
        const task: Task = { id: 1, title: 'Test Task', completed: false }; // Création d'une nouvelle tâche
        taskService.addTask(task); // Ajout de la tâche via le service
        expect(taskService.getTasks().length).toEqual(oldLength + 1); // Vérifie que la liste des tâches contient maintenant 1 tâche
    });
})