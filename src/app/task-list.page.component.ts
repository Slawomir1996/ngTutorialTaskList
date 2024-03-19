import { Component } from "@angular/core";
import { TasksListComponent } from "./tasks-list.component";
import { SubmitTextComponent } from "./submit-text.component";
import { Task, TaskPageable } from "./Task";
import { NgIf } from "@angular/common";

type ListFetchingError = { status: number; message: string };

// idle - initial
type IdleState = {
  state: "idle";
};
// loading
type LoadingState = {
  state: "loading";
};
// success
type SuccessState = {
  state: "success";
  results: TaskPageable['items'];
};
// error
type ErrorState = {
  state: "error";
  error: ListFetchingError;
};

type ComponentListState = IdleState | LoadingState | SuccessState | ErrorState;

@Component({
  selector: "app-task-list-page",
  standalone: true,
  imports: [TasksListComponent, SubmitTextComponent, NgIf],
  template: `
    <app-submit-text (submitText)="addTask($event)" />
    <app-tasks-list
      *ngIf="listState.state === 'success'"
      class="block mt-4"
      [tasks]="listState.results"
    ></app-tasks-list>
    <p *ngIf="listState.state === 'error'">{{ listState.error.message }}</p>
    <p *ngIf="listState.state === 'loading'">Loading...</p>
    <p>{{listState.state}}</p>
  `,
})
export class TaskListPageComponent {
  listState: ComponentListState = { state: "idle" };

  private readonly URL = "http://localhost:3000/api";

  constructor() {
    this.fetchData();
  }

  private fetchData() {
    this.listState = { state: "loading" };
    fetch(`${this.URL}/list-entries/user/1/title`)
      .then<TaskPageable | ListFetchingError>((response) => {
        if (response.ok) {
          return response.json();
        }
        return { status: response.status, message: response.statusText };
      })
      .then((response) => {
        setTimeout(() => {
          if ('items' in response) {
            console.log(response.items);
            this.listState = {
              state: "success",
              results: response.items,
            };
          } else {
            this.listState = {
              state: "error",
              error: response,
            };
          }
        }, 1200);
      });
  }

  addTask(name: string) {
    // this.tasks.push({
    //   name,
    //   done: false,
    // });
  }
}