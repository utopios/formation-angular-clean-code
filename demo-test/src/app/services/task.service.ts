import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
@Injectable({
    providedIn: 'root'
})
export class TaskService {

    private tasks: Task[] = []
    getTasks(): Task[] {
        return this.tasks
    }

    addTask(task: Task):void {
        this.tasks.push(task)
    }
}