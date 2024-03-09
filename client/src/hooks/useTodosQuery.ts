import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Todo, TodoStatusFilter, TodoUpdateVariables } from '../types/todo';
import { createTodo, getTodo, removeTodo, updateStatusTodo } from '../api';

export const useGetTodoQuery = (status: TodoStatusFilter) => {
  return useQuery({
    queryFn: () => getTodo(status),
    queryKey: ['todos', status],
  });
};

export const useNewTodo = () => {
  const client = useQueryClient();
  const { mutate: create } = useMutation({
    mutationFn: createTodo,
    onSuccess: newTodo => {
      if (newTodo) {
        client.setQueriesData({ queryKey: ['todos'] }, oldTodos => {
          if (oldTodos) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            return [...oldTodos, newTodo];
          } else {
            return newTodo;
          }
        });
      }
      client.invalidateQueries({ queryKey: ['todos'], refetchType: 'none' });
    },
    onError: err => {
      console.error('An error occurred while creating new todo:', err);
    },
  });
  return create;
};

export const useStatusTodo = () => {
  const client = useQueryClient();

  const { mutate: updateStatus } = useMutation({
    mutationFn: (variables: TodoUpdateVariables) => updateStatusTodo(variables),

    onSuccess: (updatedTodo, variables) => {
      client.setQueriesData<Todo[]>({ queryKey: ['todos'] }, oldTodos => {
        return oldTodos?.map(todo => {
          if (todo.id === variables.id) {
            return { ...todo, status: updatedTodo.status };
          }
          return todo;
        });
      });
      client.invalidateQueries({ queryKey: ['todos'], refetchType: 'none' });
    },
    onError: err => {
      console.error('An error occurred while updating todo status:', err);
    },
  });

  return updateStatus;
};

export const useRemoveTodo = () => {
  const client = useQueryClient();

  const { mutate: remove } = useMutation({
    mutationFn: removeTodo,

    onSuccess: id => {
      client.setQueriesData<Todo[]>({ queryKey: ['todos'] }, oldTodos => {
        return oldTodos?.filter(item => item.id !== id);
      });
      client.invalidateQueries({
        queryKey: ['todos'],
        refetchType: 'none',
      });
    },
    onError: err => {
      console.error('An error occurred while removing todo:', err);
    },
  });

  return remove;
};
