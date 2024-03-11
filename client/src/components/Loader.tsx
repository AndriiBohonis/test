import { Backdrop, CircularProgress, Stack } from '@mui/material';

export const Loader = () => {
  return (
    <Stack minHeight='100vh'>
      <Backdrop open={true}>
        <CircularProgress />
      </Backdrop>
    </Stack>
  );
};
