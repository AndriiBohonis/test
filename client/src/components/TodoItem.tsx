import {
  Button,
  ButtonGroup,
  Grow,
  ListItem,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { Todo } from '../types/todo';
import { useStatusTodo } from '../hooks/useTodosQuery';

import RemoveButton from './RemoveButton';

export const TodoItem = ({ status, id, todo }: Todo) => {
  const { updateStatus } = useStatusTodo();

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
                sx={{ fontSize: { xs: '8px', md: '16' } }}
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
            <RemoveButton id={id} />
          </Stack>
        </Paper>
      </ListItem>
    </Grow>
  );
};
