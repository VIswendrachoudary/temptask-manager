import React, { useState } from 'react';
import { IconButton, Tooltip, Menu, MenuItem, ListItemIcon, Box, Typography } from '@mui/material';
import { LightMode, DarkMode, Palette as PaletteIcon } from '@mui/icons-material';
import { useThemeCustom, availableBackgrounds } from '../../contexts/ThemeContext';

const ThemeSwitcher = () => {
  const { mode, toggleMode, bg, setBackground, previewBackground, clearPreview } = useThemeCustom();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Tooltip title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
        <IconButton color="inherit" onClick={toggleMode} size="large" aria-label="toggle theme mode">
          {mode === 'light' ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Tooltip>

      <Tooltip title="Background options">
        <IconButton color="inherit" onClick={handleOpen} size="large" aria-label="background options">
          <PaletteIcon />
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose} PaperProps={{ sx: { p: 1, width: 260 } }}>
        <Box sx={{ display: 'flex', gap: 1, mb: 1, justifyContent: 'space-between' }}>
          {availableBackgrounds.map((b) => (
            <Box
              key={b}
              onMouseEnter={() => previewBackground(b)}
              onMouseLeave={() => clearPreview()}
              onClick={() => { setBackground(b); handleClose(); }}
              sx={{
                cursor: 'pointer',
                width: 72,
                height: 48,
                borderRadius: 1.25,
                border: bg === b ? '2px solid' : '1px solid',
                borderColor: bg === b ? 'primary.main' : 'divider',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Box className={`bg-thumb bg-${b}`} sx={{ width: '100%', height: '100%' }} />
            </Box>
          ))}
        </Box>
        <Box sx={{ px: 1 }}>
          {availableBackgrounds.map((b) => (
            <MenuItem key={b} selected={bg === b} onClick={() => setBackground(b)} sx={{ textTransform: 'capitalize' }}>
              <ListItemIcon>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: b === 'clean' ? 'transparent' : 'primary.main', border: b === 'clean' ? 1 : 0, borderColor: 'divider' }} />
              </ListItemIcon>
              <Typography variant="inherit">{b}</Typography>
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </>
  );
};

export default ThemeSwitcher;
