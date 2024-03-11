import { Button, CircularProgress, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { useRemoveTodo } from '../hooks/useTodosQuery';
import { ToDoSnackbar } from './SneckBar';

export const RemoveButton = ({ id }: { id: number }) => {
  const { remove, isPending, isError } = useRemoveTodo();

  if (isError) {
    <ToDoSnackbar error={true} massage={'server connection error'} />;
  }

  return (
    <Tooltip onClick={() => remove(id)} title={'Remove'} placement='top'>
      <Button variant='outlined'>
        {isPending ? (
          <CircularProgress color='inherit' size='20px' />
        ) : (
          <DeleteIcon fontSize='small' />
        )}
      </Button>
    </Tooltip>
  );
};
