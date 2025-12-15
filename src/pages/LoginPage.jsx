// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Avatar, 
  CircularProgress,
  Alert,
  Checkbox,
  FormControlLabel,
  Link,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Lock as LockIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, background: 'linear-gradient(180deg,#f6f8fb,#eef3fb)' }}>
      <Paper elevation={6} sx={{ display: 'flex', width: '100%', maxWidth: 960, borderRadius: 3, overflow: 'hidden' }}>
        {isMd && (
          <Box sx={{ flex: 1, p: 6, background: 'linear-gradient(180deg,#e6f0ff,#f2e9ff)', color: 'primary.dark' }}>
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>Welcome Back</Typography>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>Sign in to access your dashboard, create tasks, and collaborate with your team.</Typography>
            <Box sx={{ mt: 4, width: '100%', height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="220" height="160" viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="0" width="220" height="160" rx="12" fill="#fff" opacity="0.06" />
                <circle cx="60" cy="60" r="28" fill="#0066ff" opacity="0.9" />
                <circle cx="120" cy="60" r="20" fill="#7c3aed" opacity="0.9" />
                <rect x="30" y="100" width="160" height="18" rx="6" fill="#fff" opacity="0.06" />
              </svg>
            </Box>
          </Box>
        )}
        <Box sx={{ flexBasis: 420, p: { xs: 4, sm: 6 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 64, height: 64 }}>
              <LockIcon sx={{ fontSize: 32 }} />
            </Avatar>
          </Box>
          <Typography component="h1" variant="h5" sx={{ textAlign: 'center', mb: 2 }}>Task Management System</Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
              <FormControlLabel control={<Checkbox size="small" />} label={<Typography variant="body2">Remember me</Typography>} />
              <Link href="#" variant="body2">Forgot password?</Link>
            </Box>
            <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 3, mb: 2, py: 1.5 }}>{loading ? <CircularProgress size={24} /> : 'Sign In'}</Button>
          </Box>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">Demo Accounts:</Typography>
            <Typography variant="caption" color="text.secondary">Admin: admin@example.com / admin123<br/>Manager: manager@example.com / manager123<br/>Employee: employee@example.com / employee123</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;