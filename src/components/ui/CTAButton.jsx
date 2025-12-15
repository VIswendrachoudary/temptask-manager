import React from 'react';
import { Fab, Box } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const CTAButton = ({ onClick }) => {
  return (
    <Box sx={{ position: 'fixed', right: 24, bottom: 24, zIndex: 1400 }}>
      <Fab color="secondary" aria-label="create" onClick={onClick} sx={{ boxShadow: 6 }}>
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default CTAButton;
