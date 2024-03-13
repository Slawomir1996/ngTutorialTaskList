import { UserDtO } from "./UserDtO";

export type Task = {
  id: number;
  slug: string;
  title: string;
  body: string;
  createdAt?: Date;
  startAt?: string;
  author?: UserDtO;
  isDone: boolean;
  };
  export class Meta {
    totalItems?: number;
    itemCount?: number;
    itemsPerPage?: number;
    totalPages?: number;
    currentPage?: number;
}

export class Links {
    first?: string;
    previous?: string;
    next?: string;
    last?: string;
}

export class TaskPageable {
    items?: Task[];
    meta?: Meta;
    links?: Links;
}