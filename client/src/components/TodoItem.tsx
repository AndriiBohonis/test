import {
  Button,
  ButtonGroup,
  Grow,
  ListItem,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { Todo } from '../types/todo';
import ButtonWithIcon from './ButtonWithIcon';
import { useRemoveTodo, useStatusTodo } from '../hooks/useTodosQuery';

export const TodoItem = ({ status, id, todo }: Todo) => {
  const remove = useRemoveTodo();
  const updateStatus = useStatusTodo();

  const handelComplied = () => {
    if (status === 'done') return;
    updateStatus({ id, status: 'done' });
  };
  const handelProgress = () => {
    if (status === 'progress') return;
    updateStatus({ id, status: 'progress' });
  };

  return (
    <Grow key={id} in={true}>
      <ListItem disableGutters>
        <Paper sx={{ width: '100%', px: '16px' }}>
          <Stack
            sx={{ height: '70px' }}
            spacing={4}
            direction='row'
            alignItems={'center'}>
            <ButtonGroup>
              <Button
                disabled={status === 'progress'}
                onClick={handelProgress}
                variant='outlined'>
                progress
              </Button>

              <Button
                color='success'
                disabled={status === 'done'}
                onClick={handelComplied}
                variant='outlined'>
                done
              </Button>
            </ButtonGroup>
            <Typography
              sx={{
                fontSize: '24px',
                flexGrow: 1,
                textDecoration: status === 'done' ? 'line-through' : 'none',
              }}
              component={'p'}>
              {todo}
            </Typography>
            <Typography variant='caption'>{status}</Typography>
            <ButtonWithIcon title='Remove' click={() => remove(id)}>
              <DeleteIcon />
            </ButtonWithIcon>
          </Stack>
        </Paper>
      </ListItem>
    </Grow>
  );
};
