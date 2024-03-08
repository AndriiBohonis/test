export type TodoStatus = 'pending' | 'progress' | 'done';
export type TodoStatusFilter = TodoStatus | 'all';
export type Todo = {
  id: string;
  todo: string;
  status: TodoStatus;
};
