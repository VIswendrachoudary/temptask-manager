import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TablePagination,
  Button,
  Chip,
  Avatar,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Divider,
  Stack,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  ThumbUp as ApproveIcon, 
  ThumbDown as RejectIcon, 
  Assignment as TaskIcon,
  Person as PersonIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon
} from '@mui/icons-material';

// Mock data for tasks pending approval
const pendingTasks = [
  { 
    id: 1, 
    title: 'Implement User Authentication', 
    description: 'Completed JWT authentication setup with role-based access control.',
    status: 'pending_approval',
    priority: 'high',
    submittedDate: '2023-06-14T09:30:00',
    dueDate: '2023-06-20',
    assignedTo: { 
      id: 3, 
      name: 'John Doe', 
      email: 'john@example.com',
      avatar: '/static/images/avatar/1.jpg'
    },
    submittedBy: { 
      id: 3, 
      name: 'John Doe', 
      email: 'john@example.com',
      avatar: '/static/images/avatar/1.jpg'
    },
    comments: 3,
    attachments: 2
  },
  { 
    id: 2, 
    title: 'Mobile Responsive Design', 
    description: 'Made the dashboard fully responsive for mobile devices.',
    status: 'pending_approval',
    priority: 'medium',
    submittedDate: '2023-06-15T14:20:00',
    dueDate: '2023-06-18',
    assignedTo: { 
      id: 4, 
      name: 'Jane Smith', 
      email: 'jane@example.com',
      avatar: '/static/images/avatar/2.jpg'
    },
    submittedBy: { 
      id: 4, 
      name: 'Jane Smith', 
      email: 'jane@example.com',
      avatar: '/static/images/avatar/2.jpg'
    },
    comments: 5,
    attachments: 1
  },
  { 
    id: 3, 
    title: 'API Integration', 
    description: 'Integrated payment gateway API and handled all edge cases.',
    status: 'pending_approval',
    priority: 'high',
    submittedDate: '2023-06-16T11:10:00',
    dueDate: '2023-06-22',
    assignedTo: { 
      id: 5, 
      name: 'Mike Johnson', 
      email: 'mike@example.com',
      avatar: '/static/images/avatar/3.jpg'
    },
    submittedBy: { 
      id: 5, 
      name: 'Mike Johnson', 
      email: 'mike@example.com',
      avatar: '/static/images/avatar/3.jpg'
    },
    comments: 2,
    attachments: 0
  },
];

const TaskApprovalPage = () => {
  const theme = useTheme();
  
  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle approve task
  const handleApprove = (taskId) => {
    // In a real app, this would be an API call
    console.log(`Task ${taskId} approved`);
    // Update the task status to 'completed'
    // setTasks(tasks.map(task => 
    //   task.id === taskId ? { ...task, status: 'completed' } : task
    // ));
  };

  // Handle reject task
  const handleReject = (taskId) => {
    // In a real app, this would be an API call
    console.log(`Task ${taskId} rejected`);
    // Update the task status to 'in_progress' or add a rejection reason
    // setTasks(tasks.map(task => 
    //   task.id === taskId ? { ...task, status: 'in_progress' } : task
    // ));
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Task Approvals
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Review and approve or reject completed tasks
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={0} 
            sx={{ 
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[4],
              },
            }}
          >
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending Approval
              </Typography>
              <Typography variant="h4" component="div">
                {pendingTasks.length}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Tasks waiting for your review
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={0} 
            sx={{ 
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[4],
              },
            }}
          >
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Approved Today
              </Typography>
              <Typography variant="h4" component="div">
                3
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Tasks approved today
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={0} 
            sx={{ 
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[4],
              },
            }}
          >
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average Approval Time
              </Typography>
              <Typography variant="h4" component="div">
                2.4h
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Time to approve tasks
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={0} 
            sx={{ 
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[4],
              },
            }}
          >
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Approval Rate
              </Typography>
              <Typography variant="h4" component="div">
                87%
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Of tasks are approved
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filters */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          mb: 3, 
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search tasks..."
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
                sx: { borderRadius: 2 }
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                sx={{ borderRadius: 2 }}
              >
                Filters
              </Button>
              <Button
                variant="outlined"
                startIcon={<SortIcon />}
                sx={{ borderRadius: 2 }}
              >
                Sort
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Tasks Table */}
      <Paper 
        elevation={0} 
        sx={{ 
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell>Submitted By</TableCell>
                <TableCell>Submitted On</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingTasks.length > 0 ? (
                pendingTasks
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((task) => (
                    <TableRow key={task.id} hover>
                      <TableCell>
                        <Box>
                          <Typography variant="subtitle2">{task.title}</Typography>
                          <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 300 }}>
                            {task.description}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar 
                            alt={task.submittedBy.name} 
                            src={task.submittedBy.avatar}
                            sx={{ width: 32, height: 32 }}
                          >
                            {task.submittedBy.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2">{task.submittedBy.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {task.submittedBy.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(task.submittedDate)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(task.dueDate)}
                        </Typography>
                        {new Date(task.dueDate) < new Date() && (
                          <Typography variant="caption" color="error">
                            Overdue
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          color={getPriorityColor(task.priority)}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <Tooltip title="Approve">
                            <IconButton 
                              color="success" 
                              onClick={() => handleApprove(task.id)}
                              sx={{ 
                                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                                '&:hover': {
                                  backgroundColor: 'rgba(46, 125, 50, 0.2)',
                                },
                              }}
                            >
                              <ApproveIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Reject">
                            <IconButton 
                              color="error" 
                              onClick={() => handleReject(task.id)}
                              sx={{ 
                                backgroundColor: 'rgba(211, 47, 47, 0.1)',
                                '&:hover': {
                                  backgroundColor: 'rgba(211, 47, 47, 0.2)',
                                },
                              }}
                            >
                              <RejectIcon />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <TaskIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
                      <Typography variant="subtitle1" color="text.secondary">
                        No tasks pending approval
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        All caught up! Check back later for new submissions.
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={pendingTasks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            borderTop: `1px solid ${theme.palette.divider}`,
            '& .MuiTablePagination-toolbar': {
              flexWrap: 'wrap',
              justifyContent: 'center',
              '& > *': {
                my: 1,
              },
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default TaskApprovalPage;
