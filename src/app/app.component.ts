import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TasksListComponent } from './tasks-list.component';
import { SubmitTextComponent } from './submit-text.component';
import { TaskListPageComponent } from './task-list.page.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TaskListPageComponent],
  template: `
     <h1 class="text-orange-500 bg-black py-4 text-xl text-center">
      Another boring todolist
    </h1>
    <main class="grid place-items-center pt-4">
      <app-task-list-page />
    </main>

    <router-outlet />
  `,
  // styles: [],
})
export class AppComponent {
  tasks = [
    {
      body: "Angular introduction",
      isDone: false,
    },
    {
      body: "Learn components",
      isDone: true,
    },
  ];

  addTask(body: string) {
    this.tasks.push({
      body,
      isDone: false,
    });
  }
}
