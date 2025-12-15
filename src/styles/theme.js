import { createTheme } from '@mui/material/styles';

export const createAppTheme = (mode = 'light') => {
  const isDark = mode === 'dark';
  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#6fb3ff' : '#0057e7',
        light: isDark ? '#9ad1ff' : '#4da3ff',
        dark: isDark ? '#004f9e' : '#003bb5',
        contrastText: '#fff',
      },
      success: { main: isDark ? '#36b37e' : '#16a34a' },
      warning: { main: isDark ? '#ff9f43' : '#f59e0b' },
      error: { main: isDark ? '#ff6b6b' : '#ef4444' },
      secondary: {
        main: isDark ? '#a78bfa' : '#7c3aed',
        light: '#9b6bff',
        dark: '#5c18c6',
        contrastText: '#fff',
      },
      background: {
        default: isDark ? '#081126' : '#f6f8fb',
        paper: isDark ? '#06101a' : '#ffffff',
      },
      gradient: {
        primary: isDark ? 'linear-gradient(90deg,#6fb3ff,#a78bfa)' : 'linear-gradient(90deg,#0057e7,#7c3aed)'
      },
      divider: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15, 20, 30, 0.06)',
      text: {
        primary: isDark ? '#e6eef8' : '#0f172a',
        secondary: isDark ? '#9fb0c8' : '#64748b',
      }
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      h1: { fontSize: '2.5rem', fontWeight: 600 },
      h2: { fontSize: '2rem', fontWeight: 600 },
      h3: { fontSize: '1.6rem', fontWeight: 600 },
      body1: { fontSize: '1rem', lineHeight: 1.6 },
    },
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 320,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '::selection': {
            backgroundColor: 'rgba(0,102,255,0.15)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: 'linear-gradient(90deg, rgba(0,87,231,0.98), rgba(124,58,237,0.95))',
            boxShadow: '0 6px 20px rgba(12, 24, 52, 0.12)',
            backdropFilter: 'saturate(180%) blur(6px)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 10,
            paddingLeft: 16,
            paddingRight: 16,
            transition: 'transform 180ms ease, box-shadow 180ms ease',
            '&:active': { transform: 'translateY(1px)' },
          },
        },
        defaultProps: {
          disableElevation: true,
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 6px 18px rgba(12, 24, 52, 0.06)',
            transition: 'transform 220ms cubic-bezier(.2,.8,.2,1), box-shadow 220ms',
            '&:hover': {
              transform: 'translateY(-6px)',
              boxShadow: '0 12px 34px rgba(12, 24, 52, 0.12)',
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: '1px solid rgba(12,24,52,0.06)'
          }
        }
      }
    },
  });
};

export default createAppTheme;
