// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Typography, Button } from '@mui/material';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import createAppTheme from './styles/theme';
import { ThemeProviderCustom } from './contexts/ThemeContext';
import { useThemeCustom } from './contexts/ThemeContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UserManagementPage from './pages/admin/UserManagementPage';
import TaskManagementPage from './pages/manager/TaskManagementPage';
import MyTasksPage from './pages/employee/MyTasksPage';
import TaskApprovalPage from './pages/manager/TaskApprovalPage';
import ReportsPage from './pages/ReportsPage';
import Layout from './layouts/Layout';
import NotFoundPage from './pages/NotFoundPage';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, hasRole, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children || <Outlet />;
};

const UnauthorizedPage = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      p: 3,
    }}
  >
    <Typography variant="h4" component="h1" gutterBottom>
      Unauthorized Access
    </Typography>
    <Typography variant="body1" color="text.secondary" paragraph>
      You don't have permission to access this page.
    </Typography>
    <Button 
      variant="contained" 
      color="primary" 
      onClick={() => window.history.back()}
      sx={{ mt: 2 }}
    >
      Go Back
    </Button>
  </Box>
);

const ThemeConsumerWrapper = ({ children }) => {
  const { mode } = useThemeCustom();
  const appTheme = createAppTheme(mode);
  return <ThemeProvider theme={appTheme}>{children}</ThemeProvider>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      
      <Route 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="users" element={<ProtectedRoute requiredRole="admin"><UserManagementPage /></ProtectedRoute>} />
        <Route path="tasks" element={<ProtectedRoute requiredRole="manager"><TaskManagementPage /></ProtectedRoute>} />
        <Route path="approvals" element={<ProtectedRoute requiredRole="manager"><TaskApprovalPage /></ProtectedRoute>} />
        <Route path="my-tasks" element={<ProtectedRoute requiredRole="employee"><MyTasksPage /></ProtectedRoute>} />
        <Route path="reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
      </Route>
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProviderCustom>
      <ThemeConsumerWrapper>
        <CssBaseline />
        <Router>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </Router>
      </ThemeConsumerWrapper>
    </ThemeProviderCustom>
  );
}

export default App;