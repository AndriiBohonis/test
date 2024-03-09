import { useState } from 'react';

import { Box, Button, CircularProgress, Stack, TextField } from '@mui/material';
import { useNewTodo } from '../hooks/useTodosQuery';
import ToDoSnackbar from './SneckBar';

const NewTodo = () => {
  const [todo, setTodo] = useState('');
  const [inputError, setInputError] = useState('');

  const { create, createError, isPending } = useNewTodo();

  const submit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    if (todo) {
      setInputError('');
      create(todo);
      setTodo('');
    } else {
      setInputError('field cannot be empty');
    }
  };

  return (
    <>
      <form onSubmit={submit}>
        <Stack direction='row'>
          <TextField
            autoComplete='off'
            fullWidth
            value={todo}
            onChange={event => setTodo(event.target.value)}
            placeholder='new todo...'
            error={!!inputError}
            helperText={inputError}
          />
          <Box>
            <Button
              sx={{ width: '150px', minHeight: '48px', p: '16px', ml: 1 }}
              variant='contained'
              type='submit'>
              {isPending ? (
                <CircularProgress color='inherit' size='24px' />
              ) : (
                'Add todo'
              )}
            </Button>
          </Box>
        </Stack>
      </form>
      {createError && (
        <ToDoSnackbar
          error={true}
          massage={'An error occurred while creating new todo'}
        />
      )}
    </>
  );
};

export { NewTodo };
