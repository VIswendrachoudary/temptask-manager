// src/layouts/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  List, 
  Typography, 
  Divider, 
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Assessment as AssessmentIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { NavLink, useLocation } from 'react-router-dom';
import SearchBar from '../components/ui/SearchBar';
import Notifications from '../components/ui/Notifications';
import ThemeSwitcher from '../components/ui/ThemeSwitcher';

const drawerWidth = 240;

const Layout = () => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = React.useState(false);
  const toggleCollapsed = () => setCollapsed((s) => !s);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/', roles: ['admin', 'manager', 'employee'] },
    { text: 'Users', icon: <PeopleIcon />, path: '/users', roles: ['admin'] },
    { text: 'Tasks', icon: <AssignmentIcon />, path: '/tasks', roles: ['manager'] },
    { text: 'Approvals', icon: <CheckCircleIcon />, path: '/approvals', roles: ['manager'] },
    { text: 'My Tasks', icon: <AssignmentIcon />, path: '/my-tasks', roles: ['employee'] },
    { text: 'Reports', icon: <AssessmentIcon />, path: '/reports', roles: ['admin', 'manager'] },
  ];

  const drawer = (
    <div>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <Typography variant="h6" noWrap component="div" sx={{ display: collapsed ? 'none' : 'block' }}>
          Task Manager
        </Typography>
        <IconButton size="small" onClick={toggleCollapsed} aria-label="collapse sidebar">
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {menuItems
          .filter(item => !item.roles || item.roles.includes(user?.role))
          .map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                sx={{ py: 1.5, px: 2, justifyContent: collapsed ? 'center' : 'flex-start' }}
                style={({ isActive }) => ({ backgroundColor: isActive ? 'rgba(0,102,255,0.08)' : 'inherit' })}
              >
                <ListItemIcon sx={{ minWidth: 40, justifyContent: 'center' }}>{item.icon}</ListItemIcon>
                {!collapsed && <ListItemText primary={item.text} />}
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${collapsed ? 80 : drawerWidth}px)` },
          ml: { md: `${collapsed ? 80 : drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
            <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
              Task Management System
            </Typography>
            <SearchBar />
          </Box>
          <div>
            <ThemeSwitcher />
            <Notifications />
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
              <Avatar alt={user?.name} src="/static/images/avatar/1.jpg" sx={{ width: 32, height: 32 }} />
            </IconButton>
            <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { md: collapsed ? 80 : drawerWidth }, flexShrink: { md: 0 } }} aria-label="mailbox folders">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: collapsed ? 80 : drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: collapsed ? 80 : drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${collapsed ? 80 : drawerWidth}px)` },
          mt: '64px',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;