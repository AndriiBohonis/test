import { useGetTodoQuery } from '../hooks/useTodosQuery';
import { TodoStatusFilter } from '../types/todo';
import { Loader } from './Loader';
import { ToDoSnackbar } from './SneckBar';

import { TodoItem } from './TodoItem';

import { List } from '@mui/material';

type TodoListProps = {
  status: TodoStatusFilter;
};
export const TodoList = ({ status }: TodoListProps) => {
  const { data, isLoading, isSuccess, error } = useGetTodoQuery(status);

  if (isLoading) {
    return <Loader />;
  }

  console.log(data);

  return (
    <>
      <List sx={{ height: '60vh', overflow: 'scroll' }}>
        {isSuccess &&
          data
            .slice()
            .sort((a, b) => a.id - b.id)
            .map(todo => <TodoItem key={todo.id} {...todo} />)}
      </List>
      {error && (
        <ToDoSnackbar error={true} massage={'server connection error'} />
      )}
    </>
  );
};
