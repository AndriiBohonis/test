export type TodoStatus = 'pending' | 'progress' | 'done';
export type TodoStatusFilter = TodoStatus | 'all';
export interface Todo {
  id: number;
  todo: string;
  status: TodoStatus;
}

export interface TodoUpdateVariables {
  id: number;
  status: TodoStatus;
}
