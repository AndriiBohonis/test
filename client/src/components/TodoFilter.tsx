import { useState } from 'react';
import { TodoList } from './TodoList';
import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import { TodoStatusFilter } from '../types/todo';

export const TodoViewer = () => {
  const [view, setView] = useState<TodoStatusFilter>('all');

  return (
    <Stack justifyContent={'center'}>
      <Box sx={{ m: '0 auto' }}>
        <ButtonGroup>
          <Button
            variant={view === 'all' ? 'outlined' : 'contained'}
            onClick={() => setView('all')}>
            all
          </Button>
          <Button
            variant={view === 'progress' ? 'outlined' : 'contained'}
            onClick={() => setView('progress')}>
            progress
          </Button>
          <Button
            color='success'
            variant={view === 'done' ? 'outlined' : 'contained'}
            onClick={() => setView('done')}>
            completed
          </Button>
        </ButtonGroup>
      </Box>
      <TodoList status={view} />
    </Stack>
  );
};
