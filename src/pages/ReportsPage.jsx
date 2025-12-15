import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  useTheme,
  useMediaQuery,
  Divider,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Timeline as TimelineIcon,
  TableChart as TableChartIcon,
  Download as DownloadIcon,
  FilterAlt as FilterAltIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';

// Mock data for reports
const taskStatusData = [
  { status: 'Not Started', count: 5 },
  { status: 'In Progress', count: 8 },
  { status: 'Pending Approval', count: 3 },
  { status: 'Completed', count: 12 },
  { status: 'Overdue', count: 2 },
];

const taskPriorityData = [
  { id: 'High', value: 8 },
  { id: 'Medium', value: 12 },
  { id: 'Low', value: 5 },
];

const taskTimelineData = [
  {
    id: 'Tasks',
    data: [
      { x: 'Jan', y: 5 },
      { x: 'Feb', y: 8 },
      { x: 'Mar', y: 12 },
      { x: 'Apr', y: 15 },
      { x: 'May', y: 18 },
      { x: 'Jun', y: 20 },
      { x: 'Jul', y: 25 },
    ],
  },
];

const teamPerformanceData = [
  {
    id: 'John Doe',
    completed: 12,
    inProgress: 3,
    overdue: 1,
  },
  {
    id: 'Jane Smith',
    completed: 8,
    inProgress: 2,
    overdue: 0,
  },
  {
    id: 'Mike Johnson',
    completed: 15,
    inProgress: 5,
    overdue: 2,
  },
  {
    id: 'Sarah Williams',
    completed: 10,
    inProgress: 4,
    overdue: 1,
  },
];

const recentActivities = [
  { id: 1, action: 'Task completed', user: 'John Doe', task: 'Dashboard Design', time: '2 minutes ago' },
  { id: 2, action: 'New task assigned', user: 'Manager', task: 'API Documentation', time: '1 hour ago' },
  { id: 3, action: 'Comment added', user: 'Jane Smith', task: 'User Profile', time: '3 hours ago' },
  { id: 4, action: 'Task submitted for approval', user: 'Mike Johnson', task: 'Payment Integration', time: '5 hours ago' },
  { id: 5, action: 'Task approved', user: 'Manager', task: 'Login Page', time: '1 day ago' },
];

const ReportsPage = () => {
  const theme = useTheme();
  
  // State for filters and pagination
  const [timeRange, setTimeRange] = useState('month');
  const [teamFilter, setTeamFilter] = useState('all');
  const [tabValue, setTabValue] = useState('overview');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle export
  const handleExport = (format) => {
    console.log(`Exporting report as ${format}`);
    // In a real app, this would generate and download the report
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Reports & Analytics
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track and analyze task performance and team productivity
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => handleExport('pdf')}
          >
            Export PDF
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => handleExport('csv')}
          >
            Export CSV
          </Button>
          <Tooltip title="Refresh data">
            <IconButton>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Filters */}
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
          <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              label="Time Range"
            >
              <MenuItem value="week">Last 7 days</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
              <MenuItem value="quarter">This Quarter</MenuItem>
              <MenuItem value="year">This Year</MenuItem>
              <MenuItem value="custom">Custom Range</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Team</InputLabel>
            <Select
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
              label="Team"
            >
              <MenuItem value="all">All Teams</MenuItem>
              <MenuItem value="development">Development</MenuItem>
              <MenuItem value="design">Design</MenuItem>
              <MenuItem value="qa">QA</MenuItem>
              <MenuItem value="marketing">Marketing</MenuItem>
            </Select>
          </FormControl>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Button
            variant="outlined"
            startIcon={<FilterAltIcon />}
            sx={{ ml: 'auto' }}
          >
            More Filters
          </Button>
        </Box>
      </Paper>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="report tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Overview" value="overview" icon={<BarChartIcon />} iconPosition="start" />
          <Tab label="Task Status" value="status" icon={<PieChartIcon />} iconPosition="start" />
          <Tab label="Timeline" value="timeline" icon={<TimelineIcon />} iconPosition="start" />
          <Tab label="Team Performance" value="performance" icon={<TableChartIcon />} iconPosition="start" />
        </Tabs>
      </Box>

      {/* Report Content */}
      {tabValue === 'overview' && (
        <Grid container spacing={3}>


          {/* Recent Activities */}
          <Grid item xs={12}>
            <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  Recent Activities
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Action</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Task</TableCell>
                        <TableCell>Time</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentActivities
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((activity) => (
                          <TableRow key={activity.id} hover>
                            <TableCell>{activity.action}</TableCell>
                            <TableCell>{activity.user}</TableCell>
                            <TableCell>{activity.task}</TableCell>
                            <TableCell>{activity.time}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={recentActivities.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tabValue === 'status' && (
        <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 2, p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Task Status Distribution
          </Typography>
          <Box sx={{ height: 500 }}>
            <ResponsiveBar
              data={taskStatusData}
              keys={['count']}
              indexBy="status"
              margin={{ top: 10, right: 10, bottom: 50, left: 60 }}
              padding={0.3}
              colors={[theme.palette.primary.main]}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Status',
                legendPosition: 'middle',
                legendOffset: 40,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Number of Tasks',
                legendPosition: 'middle',
                legendOffset: -50,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor="inherit:darker(1.6)"
              animate={true}
              motionStiffness={90}
              motionDamping={15}
            />
          </Box>
        </Card>
      )}

      {tabValue === 'timeline' && (
        <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 2, p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Task Timeline
          </Typography>
          <Box sx={{ height: 500 }}>
            <ResponsiveLine
              data={taskTimelineData}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: 'point' }}
              yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Month',
                legendOffset: 36,
                legendPosition: 'middle',
              }}
              axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Number of Tasks',
                legendOffset: -50,
                legendPosition: 'middle',
              }}
              colors={[theme.palette.primary.main]}
              pointSize={10}
              pointColor={{ theme: 'background' }}
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[
                {
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
            />
          </Box>
        </Card>
      )}

      {tabValue === 'performance' && (
        <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Team Performance
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Team Member</TableCell>
                    <TableCell align="right">Completed Tasks</TableCell>
                    <TableCell align="right">In Progress</TableCell>
                    <TableCell align="right">Overdue</TableCell>
                    <TableCell align="right">Completion Rate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teamPerformanceData.map((member) => {
                    const totalTasks = member.completed + member.inProgress + member.overdue;
                    const completionRate = totalTasks > 0 ? Math.round((member.completed / totalTasks) * 100) : 0;
                    
                    return (
                      <TableRow key={member.id} hover>
                        <TableCell component="th" scope="row">
                          {member.id}
                        </TableCell>
                        <TableCell align="right">{member.completed}</TableCell>
                        <TableCell align="right">{member.inProgress}</TableCell>
                        <TableCell align="right">{member.overdue}</TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Box sx={{ width: '100%', mr: 1 }}>
                              <Box 
                                sx={{
                                  height: 8,
                                  borderRadius: 4,
                                  backgroundColor: 'divider',
                                  overflow: 'hidden',
                                }}
                              >
                                <Box 
                                  sx={{
                                    height: '100%',
                                    width: `${completionRate}%`,
                                    backgroundColor: 
                                      completionRate >= 80 ? 'success.main' : 
                                      completionRate >= 50 ? 'warning.main' : 'error.main',
                                  }}
                                />
                              </Box>
                            </Box>
                            <Box sx={{ minWidth: 35 }}>
                              <Typography variant="body2" color="text.secondary">
                                {completionRate}%
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ReportsPage;
