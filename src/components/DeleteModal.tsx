import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  onClose,
  onConfirm,
  message = 'Are you sure you want to delete?',
  confirmText = 'Yes',
  cancelText = 'No',
}) => {

  return (
    <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        maxWidth={'sm'}
        fullWidth
        open={open}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme:any) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      <DialogTitle id="alert-dialog-title">
        {message}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description"></DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant='outlined' sx={{padding:'10px 50px'}}>
          {cancelText}
        </Button>
        <Button onClick={onConfirm} color="error"  variant='contained' sx={{padding:'10px 50px'}}>
          {confirmText}
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default DeleteModal;
