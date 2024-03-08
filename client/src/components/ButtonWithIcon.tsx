import { Button, Tooltip } from '@mui/material';

import { ReactElement } from 'react';
export default function ButtonWithIcon({
  children,
  click,
  title,
}: {
  children: ReactElement;
  title: string;
  click: () => void;
}) {
  return (
    <Tooltip onClick={click} title={title} placement='top'>
      <Button variant='outlined'>{children}</Button>
    </Tooltip>
  );
}
