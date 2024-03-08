import { useTodoQuery } from '../hooks/useTodosQuery';
import { TodoStatusFilter } from '../types/todo';
import Loader from './Lader';
import ToDoSnackbar from './SneckBar';

import { TodoItem } from './TodoItem';

import { List } from '@mui/material';

type TodoListProps = {
  status: TodoStatusFilter;
};
export const TodoList = ({ status }: TodoListProps) => {
  const { data, isLoading, isSuccess, error } = useTodoQuery(status);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <ToDoSnackbar error={true} massage={'server connection error'} />;
  }
  return (
    <List>
      {isSuccess &&
        data
          .slice()
          .sort((a, b) => parseInt(a.id) - parseInt(b.id))
          .map(todo => <TodoItem key={todo.id} {...todo} />)}
    </List>
  );
};
