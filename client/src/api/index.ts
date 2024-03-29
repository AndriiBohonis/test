import axios from 'axios';

import { Todo, TodoStatusFilter, TodoUpdateVariables } from '../types/todo';

axios.defaults.baseURL = 'http://localhost:3001/';

export const getAllTodo = async () => {
  const response = await axios.get<Todo[]>('todos');
  return response.data;
};
export const getTodo = async (status: TodoStatusFilter) => {
  const response = await axios.get<Todo[]>(`todos/${status}`);
  return response.data;
};
export const createTodo = async (todo: string) => {
  const response = await axios.post<Todo>(`todos`, {
    todo,
  });
  return response.data;
};
export const updateStatusTodo = async ({ id, status }: TodoUpdateVariables) => {
  await axios.patch<Todo[]>(`todos/${id}/status`, {
    status,
  });
  return { id, status };
};

export const removeTodo = async (id: number) => {
  const response = await axios.delete(`todos/${id}`);
  return { ...response.data, id };
};
