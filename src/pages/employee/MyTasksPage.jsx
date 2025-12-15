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
  Tabs,
  Tab,
  TextField,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material';
import { 
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  AssignmentLate as AssignmentLateIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  FileUpload as FileUploadIcon,
  Comment as CommentIcon,
  Attachment as AttachmentIcon
} from '@mui/icons-material';

// Mock data for tasks
const mockTasks = [
  { 
    id: 1, 
    title: 'Complete Dashboard Design', 
    description: 'Finish the responsive dashboard layout with all widgets',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2023-07-15',
    assignedTo: { id: 3, name: 'John Doe', email: 'john@example.com' },
    createdBy: { id: 2, name: 'Manager One', email: 'manager1@example.com' },
    submittedForApproval: false,
    submittedDate: null,
    comments: 3,
    attachments: 1
  },
  { 
    id: 2, 
    title: 'API Documentation', 
    description: 'Document all API endpoints with examples',
    status: 'not_started',
    priority: 'medium',
    dueDate: '2023-07-20',
    assignedTo: { id: 3, name: 'John Doe', email: 'john@example.com' },
    createdBy: { id: 2, name: 'Manager One', email: 'manager1@example.com' },
    submittedForApproval: false,
    submittedDate: null,
    comments: 1,
    attachments: 0
  },
  { 
    id: 3, 
    title: 'User Profile Page', 
    description: 'Create and style the user profile page with edit functionality',
    status: 'completed',
    priority: 'high',
    dueDate: '2023-07-05',
    assignedTo: { id: 3, name: 'John Doe', email: 'john@example.com' },
    createdBy: { id: 2, name: 'Manager One', email: 'manager1@example.com' },
    submittedForApproval: true,
    submittedDate: '2023-07-04T14:30:00',
    approved: true,
    approvedDate: '2023-07-05T09:15:00',
    comments: 5,
    attachments: 2
  },
  { 
    id: 4, 
    title: 'Bug Fixes', 
    description: 'Fix reported bugs from the testing team',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2023-07-12',
    assignedTo: { id: 3, name: 'John Doe', email: 'john@example.com' },
    createdBy: { id: 2, name: 'Manager One', email: 'manager1@example.com' },
    submittedForApproval: false,
    submittedDate: null,
    comments: 7,
    attachments: 3
  },
  { 
    id: 5, 
    title: 'Performance Optimization', 
    description: 'Optimize page load times and API response times',
    status: 'not_started',
    priority: 'medium',
    dueDate: '2023-07-25',
    assignedTo: { id: 3, name: 'John Doe', email: 'john@example.com' },
    createdBy: { id: 2, name: 'Manager One', email: 'manager1@example.com' },
    submittedForApproval: false,
    submittedDate: null,
    comments: 0,
    attachments: 0
  },
];

const MyTasksPage = () => {
  const theme = useTheme();

  // State for tasks and UI
  const [tasks, setTasks] = useState(mockTasks);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState('all');
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [attachments, setAttachments] = useState([]);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(0);
  };

  // Handle task submission for approval
  const handleSubmitForApproval = (task) => {
    setSelectedTask(task);
    setOpenSubmitDialog(true);
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setAttachments([...attachments, ...files]);
  };

  // Handle submission confirmation
  const handleConfirmSubmission = () => {
    // Update task status to pending_approval
    const updatedTasks = tasks.map(task => 
      task.id === selectedTask.id 
        ? { 
            ...task, 
            status: 'pending_approval',
            submittedForApproval: true,
            submittedDate: new Date().toISOString(),
            submissionNotes,
            attachments: [...(task.attachments || 0), attachments.length]
          } 
        : task
    );
    
    setTasks(updatedTasks);
    setOpenSubmitDialog(false);
    setSubmissionNotes('');
    setAttachments([]);
  };

  // Filter tasks based on tab value and search term
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (tabValue === 'all') return matchesSearch;
    if (tabValue === 'active') return matchesSearch && !task.submittedForApproval && task.status !== 'completed';
    if (tabValue === 'submitted') return matchesSearch && task.submittedForApproval && task.status !== 'completed';
    if (tabValue === 'completed') return matchesSearch && task.status === 'completed';
    
    return matchesSearch && task.status === tabValue;
  });

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

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon color="success" />;
      case 'in_progress':
        return <PendingIcon color="primary" />;
      case 'pending_approval':
        return <AssignmentLateIcon color="warning" />;
      default:
        return <AssignmentIcon color="action" />;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Tasks
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and manage your assigned tasks
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="task status tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All Tasks" value="all" />
          <Tab label="Active" value="active" />
          <Tab label="In Progress" value="in_progress" />
          <Tab label="Submitted" value="submitted" />
          <Tab label="Completed" value="completed" />
        </Tabs>
      </Box>

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
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            variant="outlined"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
              sx: { borderRadius: 2, minWidth: 250 }
            }}
          />
          <Box sx={{ flexGrow: 1 }} />
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
      </Paper>

      {/* Tasks List */}
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
                <TableCell>Status</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.length > 0 ? (
                filteredTasks
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((task) => (
                    <TableRow 
                      key={task.id} 
                      hover
                      sx={{ 
                        '&:nth-of-type(odd)': {
                          backgroundColor: 'action.hover',
                        },
                        '&:last-child td, &:last-child th': {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell>
                        <Box>
                          <Typography variant="subtitle2">{task.title}</Typography>
                          <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 400 }}>
                            {task.description}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getStatusIcon(task.status)}
                          <Typography variant="body2">
                            {task.status.replace('_', ' ')}
                            {task.submittedForApproval && task.status !== 'completed' && ' (Submitted)'}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(task.dueDate)}
                        </Typography>
                        {new Date(task.dueDate) < new Date() && task.status !== 'completed' && (
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
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                          <Tooltip title="View Details">
                            <IconButton size="small" color="primary">
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          {!task.submittedForApproval && task.status !== 'completed' && (
                            <Tooltip title="Submit for Approval">
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<FileUploadIcon />}
                                onClick={() => handleSubmitForApproval(task)}
                                sx={{ ml: 1 }}
                              >
                                Submit
                              </Button>
                            </Tooltip>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <AssignmentIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
                      <Typography variant="subtitle1" color="text.secondary">
                        No tasks found
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {searchTerm 
                          ? 'Try adjusting your search or filter criteria.' 
                          : 'You have no tasks assigned to you at the moment.'}
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
          count={filteredTasks.length}
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

      {/* Submission Dialog */}
      <Dialog 
        open={openSubmitDialog} 
        onClose={() => setOpenSubmitDialog(false)} 
        maxWidth="sm" 
        fullWidth
      >
        <DialogTitle>Submit Task for Approval</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              {selectedTask?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {selectedTask?.description}
            </Typography>
            
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Notes"
              placeholder="Add any additional notes for the reviewer..."
              value={submissionNotes}
              onChange={(e) => setSubmissionNotes(e.target.value)}
              margin="normal"
            />
            
            <Box sx={{ mt: 2, mb: 2 }}>
              <input
                accept="*"
                style={{ display: 'none' }}
                id="task-attachments"
                multiple
                type="file"
                onChange={handleFileUpload}
              />
              <label htmlFor="task-attachments">
                <Button 
                  variant="outlined" 
                  component="span"
                  startIcon={<AttachmentIcon />}
                  sx={{ mr: 2 }}
                >
                  Add Attachments
                </Button>
              </label>
              <Typography variant="caption" color="text.secondary">
                {attachments.length} file(s) selected
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSubmitDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleConfirmSubmission}
            disabled={!submissionNotes.trim()}
          >
            Submit for Approval
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyTasksPage;
