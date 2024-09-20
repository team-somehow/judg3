import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  DialogActions,
  Divider,
} from '@mui/material';

interface CustomModalProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  description: string;
  content: React.ReactNode;
  onSubmit?: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  handleClose,
  title,
  description,
  content,
  onSubmit,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '10px',
          overflow: 'hidden',
          backgroundImage:
            'linear-gradient(180deg, #2B243C -32.77%, #0B031E 100%)',
          border: '1.16px solid rgba(255, 255, 255, 0.20)',
          height: 'auto',
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: 'center',
          fontWeight: '600',
          fontSize: '2.7rem',
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
          {description}
        </Typography>
        {content}
      </DialogContent>
      <Divider
        sx={{
          mx: 1,
        }}
      />
      <DialogActions>
        <Button
          onClick={() => {
            onSubmit && onSubmit();
            handleClose();
          }}
          variant="contained"
          fullWidth
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
