import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TablePagination,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Tooltip,
  Chip,
  useTheme,
  useMediaQuery,
  Divider,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Tabs,
  Tab
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Assignment as AssignmentIcon,
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  AssignmentLate as AssignmentLateIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  ViewList as ViewListIcon,
  GridView as GridViewIcon
} from '@mui/icons-material';

// Mock data for tasks
const mockTasks = [
  { 
    id: 1, 
    title: 'Design New Dashboard', 
    description: 'Create a modern and responsive dashboard layout with relevant widgets and charts.',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2023-07-15',
    assignedTo: { id: 3, name: 'John Doe', email: 'john@example.com' },
    createdBy: { id: 2, name: 'Manager One', email: 'manager1@example.com' },
    createdAt: '2023-06-01T09:30:00',
    updatedAt: '2023-06-10T14:20:00',
    comments: 5,
    attachments: 2
  },
  { 
    id: 2, 
    title: 'Implement User Authentication', 
    description: 'Set up JWT authentication with role-based access control.',
    status: 'not_started',
    priority: 'high',
    dueDate: '2023-07-20',
    assignedTo: { id: 4, name: 'Jane Smith', email: 'jane@example.com' },
    createdBy: { id: 2, name: 'Manager One', email: 'manager1@example.com' },
    createdAt: '2023-06-05T11:15:00',
    updatedAt: '2023-06-05T11:15:00',
    comments: 2,
    attachments: 0
  },
  { 
    id: 3, 
    title: 'API Integration', 
    description: 'Integrate with the payment gateway API and handle responses.',
    status: 'in_progress',
    priority: 'medium',
    dueDate: '2023-07-10',
    assignedTo: { id: 3, name: 'John Doe', email: 'john@example.com' },
    createdBy: { id: 2, name: 'Manager One', email: 'manager1@example.com' },
    createdAt: '2023-06-10T14:30:00',
    updatedAt: '2023-06-12T16:45:00',
    comments: 8,
    attachments: 3
  },
  { 
    id: 4, 
    title: 'Mobile Responsiveness', 
    description: 'Ensure the application is fully responsive on mobile devices.',
    status: 'completed',
    priority: 'medium',
    dueDate: '2023-06-25',
    assignedTo: { id: 5, name: 'Mike Johnson', email: 'mike@example.com' },
    createdBy: { id: 2, name: 'Manager One', email: 'manager1@example.com' },
    createdAt: '2023-05-28T10:00:00',
    updatedAt: '2023-06-24T15:30:00',
    comments: 12,
    attachments: 4
  },
  { 
    id: 5, 
    title: 'Performance Optimization', 
    description: 'Identify and fix performance bottlenecks in the application.',
    status: 'not_started',
    priority: 'low',
    dueDate: '2023-08-01',
    assignedTo: { id: 4, name: 'Jane Smith', email: 'jane@example.com' },
    createdBy: { id: 2, name: 'Manager One', email: 'manager1@example.com' },
    createdAt: '2023-06-12T16:00:00',
    updatedAt: '2023-06-12T16:00:00',
    comments: 0,
    attachments: 0
  },
];

// Mock data for team members
const teamMembers = [
  { id: 3, name: 'John Doe', email: 'john@example.com', role: 'developer' },
  { id: 4, name: 'Jane Smith', email: 'jane@example.com', role: 'designer' },
  { id: 5, name: 'Mike Johnson', email: 'mike@example.com', role: 'developer' },
  { id: 6, name: 'Sarah Williams', email: 'sarah@example.com', role: 'qa' },
];

const TaskManagementPage = () => {
  const theme = useTheme();

  // State for tasks and pagination
  const [tasks, setTasks] = useState(mockTasks);
  const [_page, _setPage] = useState(0);
  const [_rowsPerPage, _setRowsPerPage] = useState(5);
  const [_searchTerm, _setSearchTerm] = useState('');
  const [_filterStatus, _setFilterStatus] = useState('all');
  const [_filterPriority, _setFilterPriority] = useState('all');
  const [_filterAssignee, _setFilterAssignee] = useState('all');
  const [_sortBy, _setSortBy] = useState('dueDate');
  const [_sortOrder, _setSortOrder] = useState('asc');
  const [_viewMode, _setViewMode] = useState('list');
  const [_tabValue, _setTabValue] = useState('all');
  
  // State for add/edit task dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [_editingTask, _setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'not_started',
    dueDate: '',
    assignedTo: '',
  });

  // Handle page change
  const handleChangePage = (event, newPage) => {
    _setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    _setRowsPerPage(parseInt(event.target.value, 10));
    _setPage(0);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    _setSearchTerm(event.target.value);
    _setPage(0);
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    _setTabValue(newValue);
    _setPage(0);
  };

  // ... (rest of the component code will be added in the next part)

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Task Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create, assign, and track tasks for your team
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ height: 'fit-content' }}
        >
          Create Task
        </Button>
      </Box>

      {/* Task creation/edition dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingTask ? 'Edit Task' : 'Create New Task'}</DialogTitle>
        <DialogContent>
          <form>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Task Title"
                  variant="outlined"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined" required>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    label="Priority"
                  >
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined" required>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    label="Status"
                  >
                    <MenuItem value="not_started">Not Started</MenuItem>
                    <MenuItem value="in_progress">In Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type="date"
                  label="Due Date"
                  fullWidth
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined" required>
                  <InputLabel>Assign To</InputLabel>
                  <Select
                    value={formData.assignedTo}
                    onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                    label="Assign To"
                  >
                    {teamMembers.map((member) => (
                      <MenuItem key={member.id} value={member.id}>
                        {member.name} ({member.role})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={() => {
              // Handle form submission
              if (editingTask) {
                // Update existing task
                setTasks(tasks.map(task => 
                  task.id === editingTask.id 
                    ? { ...formData, id: editingTask.id, updatedAt: new Date().toISOString() }
                    : task
                ));
              } else {
                // Add new task
                const newTask = {
                  ...formData,
                  id: Math.max(...tasks.map(t => t.id), 0) + 1,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  comments: 0,
                  attachments: 0,
                  createdBy: { id: 2, name: 'Manager One', email: 'manager1@example.com' },
                  assignedTo: teamMembers.find(m => m.id === formData.assignedTo)
                };
                setTasks([...tasks, newTask]);
              }
              setOpenDialog(false);
            }}
          >
            {editingTask ? 'Update Task' : 'Create Task'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Task list will be added in the next part */}
    </Box>
  );
};

export default TaskManagementPage;
