import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Todo, TodoStatusFilter } from '../types/todo';
import {
  createTodo,
  getAllTodo,
  getTodo,
  removeTodo,
  updateStatusTodo,
} from '../api';

interface TodoUpdateVariables {
  id: string;
  status: string;
}

export const useTodoQuery = (status: TodoStatusFilter) => {
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
        client.setQueriesData<Todo[]>(['todos'], oldTodos => {
          return [...(oldTodos || []), newTodo];
        });
      }
      client.invalidateQueries({
        queryKey: ['todos'],
        refetchType: 'none',
      });
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
      client.setQueryData<Todo[]>(['todos'], oldTodos => {
        if (!oldTodos) return [];

        return oldTodos.map(todo => {
          if (todo.id === variables.id) {
            return updatedTodo;
          }
          return todo;
        });
      });
      client.invalidateQueries(['todos']);
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
      client.setQueriesData<Todo[]>(['todos'], oldTodos => {
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
