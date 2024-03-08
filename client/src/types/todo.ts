export type TodoStatus = 'pending' | 'progress' | 'done';
export type TodoStatusFilter = TodoStatus | 'all';
export interface Todo {
  id: string;
  todo: string;
  status: TodoStatus;
}

export interface TodoUpdateVariables {
  id: string;
  status: TodoStatus;
}
