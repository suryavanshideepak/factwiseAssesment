import React from 'react';
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';
import Alert, { AlertColor, AlertProps } from '@mui/material/Alert';

interface SnackbarMUIProps {
  open: boolean;
  autoHideDuration?: number;
  onClose: () => void;
  message: string;
  alertProps?: AlertProps; 
  snackbarProps?: SnackbarProps; 
  severity?: AlertColor;
  variant?:string
}

const SnackbarMUI: React.FC<SnackbarMUIProps> = ({
  open,
  autoHideDuration = 3000,
  onClose,
  message,
  alertProps,
  snackbarProps,
  severity = 'error',
  variant="filled"
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      {...snackbarProps}
    >
      <Alert onClose={onClose} severity={severity} variant="filled" {...alertProps} sx={{
            position: 'fixed',
            top: '10px',
            right: '5px', 
            width: '300px', 
            zIndex: 9999, 
          }} >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarMUI;
