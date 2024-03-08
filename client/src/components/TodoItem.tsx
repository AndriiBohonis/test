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
        <Paper sx={{ width: '100%', px: { xs: '8px', lg: '16px' } }}>
          <Stack
            sx={{ minHeight: '70px' }}
            spacing={4}
            direction='row'
            alignItems={'center'}>
            <ButtonGroup size='small'>
              <Button
                sx={{ fontSize: '8px' }}
                disabled={status === 'progress'}
                onClick={handelProgress}
                variant='outlined'>
                progress
              </Button>

              <Button
                sx={{ fontSize: { xs: '8px', md: '16px' } }}
                color='success'
                disabled={status === 'done'}
                onClick={handelComplied}
                variant='outlined'>
                done
              </Button>
            </ButtonGroup>
            <Typography
              sx={{
                fontSize: { sx: '16px', md: '24px' },
                flexGrow: 1,
                textDecoration: status === 'done' ? 'line-through' : 'none',
              }}
              component={'p'}>
              {todo}
            </Typography>
            <Typography variant='caption'>{status}</Typography>
            <ButtonWithIcon title='Remove' click={() => remove(id)}>
              <DeleteIcon fontSize='small' />
            </ButtonWithIcon>
          </Stack>
        </Paper>
      </ListItem>
    </Grow>
  );
};
