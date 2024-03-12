import { Component, Input } from "@angular/core";
import { Task } from './Task'
import { NgFor } from "@angular/common";

@Component({
  selector: "app-tasks-list",
  standalone: true,
  imports: [NgFor],
  template: `
    <ul>
      <li *ngFor="let task of tasks">
        <button [class.line-through]="task.isDone" (click)="toggleDoneStatus(task)">
          {{ task.body }}
        </button>
      </li>
    </ul>
  `,
  styles: [],
})
export class TasksListComponent {
  @Input({ required: true }) tasks: Task[] = [];

  toggleDoneStatus(task: Task) {
    task.isDone = !task.isDone;
  }
}