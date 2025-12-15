import React from 'react';
import { IconButton, Badge, Menu, MenuItem, ListItemText } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';

const Notifications = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen} aria-label="notifications">
        <Badge badgeContent={3} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}><ListItemText primary="New task assigned" secondary="2h ago" /></MenuItem>
        <MenuItem onClick={handleClose}><ListItemText primary="Approval requested" secondary="4h ago" /></MenuItem>
        <MenuItem onClick={handleClose}><ListItemText primary="Monthly report ready" secondary="1d ago" /></MenuItem>
      </Menu>
    </>
  );
};

export default Notifications;
