import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';

export const ToDoSnackbar = ({
  error = false,
  massage,
}: {
  error?: boolean;
  massage: string;
}) => {
  const [open, setOpen] = useState(true);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert
        severity={error ? 'error' : 'success'}
        variant='filled'
        sx={{ width: '100%' }}>
        {massage}
      </Alert>
    </Snackbar>
  );
};
