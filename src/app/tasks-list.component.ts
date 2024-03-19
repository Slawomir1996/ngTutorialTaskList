import { Component, Input } from "@angular/core";
import { Task } from "./Task";
import { NgFor, NgForOf, NgIf } from "@angular/common";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { featherCalendar } from "@ng-icons/feather-icons";

import { TasksService } from "./tasks.service";
import { RemoveItemButtonComponent } from "./remowe-item-button.component";
import { AutosizeTextareaComponent } from "./auto-size-text-area.component";

@Component({
  selector: "app-tasks-list",
  viewProviders: [provideIcons({ featherCalendar })],
  standalone: true,
  imports: [
    NgFor,
    NgIconComponent,
    NgIf,
    RemoveItemButtonComponent,
    AutosizeTextareaComponent,
  ],
  template: `
    <ul>
      <li *ngFor="let task of tasks" class="mb-2">
        <div class="rounded-md shadow-md p-4 block" [class.bg-green-300]="task.isDone">
          <button
            class="w-full"
            (click)="handleSingleClick(task)"
            (dblclick)="switchToEditMode()"
          >
            <header class="flex justify-end">
              <app-remove-item-button (confirm)="delete(task.id)" ></app-remove-item-button>
            </header>
            <section class="text-left">
              <app-autosize-textarea
                *ngIf="editMode; else previewModeTemplate"
                (keyup.escape)="editMode = false"
                (submitText)="updateTask(task.id, $event)"
                [value]="task.body"
              ></app-autosize-textarea>

              <ng-template #previewModeTemplate>
                <span [class.line-through]="task.isDone">
                  {{ task.body }}
                </span>
              </ng-template>
            </section>
            <footer class="pt-2 flex items-center justify-end">
              <ng-icon name="featherCalendar" class="text-sm"></ng-icon>
            </footer>
          </button>
        </div>
      </li>
    </ul>
  `,
  styles: [],
})
export class TasksListComponent {
  @Input() tasks: Task[] = [];

  removeMode = false;
  editMode = false;
  isSingleClick = true;

  private tasksService: TasksService;

  constructor() {
    // this.tasksService = inject(TasksService);
    // Instead of using inject, it's better to use dependency injection in Angular constructor
    this.tasksService = new TasksService();
  }

  delete(taskId: number) {
    this.tasksService.delete(taskId);
  }

  updateTask(taskId: number, updatedName: string) {
    this.tasksService.update(taskId, updatedName);
  }

  handleSingleClick(task: Task) {
    this.isSingleClick = true;

    setTimeout(() => {
      if (this.isSingleClick) {
        this.toggleDoneStatus(task);
      }
    }, 150);
  }

  switchToEditMode() {
    this.isSingleClick = false;
    this.editMode = true;
  }

  toggleDoneStatus(task: Task) {
    task.isDone = !task.isDone;
  }
}