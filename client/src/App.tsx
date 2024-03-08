import { Container, Divider, Stack, Typography } from '@mui/material';

import { NewTodo } from './components/NewTodo';
import { TodoViewer } from './components/TodoFilter';

function App() {
  return (
    <Container sx={{ mt: '120px' }}>
      <Stack justifyContent={'center'} spacing={4}>
        <Typography variant='h2'>Your todo</Typography>
        <NewTodo />
        <TodoViewer />
        <Divider />
      </Stack>
    </Container>
  );
}
export default App;
