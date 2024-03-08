import { useState } from 'react';

import { Box, Button, Stack, TextField } from '@mui/material';
import { useNewTodo } from '../hooks/useTodosQuery';

const NewTodo = () => {
  const [title, setTitle] = useState('');
  const [inputError, setInputError] = useState('');

  const create = useNewTodo();

  const submit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    if (title) {
      setInputError('');
      create(title);
      setTitle('');
    } else {
      setInputError('field cannot be empty');
    }
  };

  return (
    <form onSubmit={submit}>
      <Stack direction='row'>
        <TextField
          fullWidth
          value={title}
          onChange={event => setTitle(event.target.value)}
          placeholder='new todo...'
          error={!!inputError}
          helperText={inputError}
        />
        <Box>
          <Button
            sx={{ width: '150px', p: '16px', ml: 1 }}
            variant='contained'
            type='submit'>
            Add todo
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

export { NewTodo };
