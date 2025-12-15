import React from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardHeader,
  Avatar,
  useTheme,
  LinearProgress,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';
import { 
  Assignment as AssignmentIcon, 
  CheckCircle as CheckCircleIcon, 
  Pending as PendingIcon, 
  Error as ErrorIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { motion } from 'framer-motion';
import StatCard from '../components/ui/StatCard';
import CTAButton from '../components/ui/CTAButton';

// Mock data for the dashboard
const summaryData = [
  { 
    title: 'Total Tasks', 
    value: '24', 
    icon: <AssignmentIcon fontSize="large" />, 
    color: 'primary.main',
    trend: '12%',
    trendPositive: true
  },
  { 
    title: 'Completed', 
    value: '18', 
    icon: <CheckCircleIcon fontSize="large" />, 
    color: 'success.main',
    trend: '8%',
    trendPositive: true
  },
  { 
    title: 'In Progress', 
    value: '4', 
    icon: <PendingIcon fontSize="large" />, 
    color: 'warning.main',
    trend: '2%',
    trendPositive: true
  },
  { 
    title: 'Pending Approval', 
    value: '2', 
    icon: <ErrorIcon fontSize="large" />, 
    color: 'error.main',
    trend: '1%',
    trendPositive: false
  },
];

const barData = [
  { month: 'Jan', tasks: 12 },
  { month: 'Feb', tasks: 18 },
  { month: 'Mar', tasks: 15 },
  { month: 'Apr', tasks: 22 },
  { month: 'May', tasks: 20 },
  { month: 'Jun', tasks: 24 },
];

const pieData = [
  { id: 'Completed', label: 'Completed', value: 18 },
  { id: 'In Progress', label: 'In Progress', value: 4 },
  { id: 'Pending', label: 'Pending', value: 2 },
];
const DashboardPage = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Card sx={{ p: 2, mb: 3, background: theme.palette.mode === 'dark' ? 'linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))' : 'linear-gradient(90deg,#e6f0ff,#f2e9ff)' }} elevation={0}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                {getGreeting()}, {user?.name || 'User'}! 👋
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Here's what's happening with your tasks today.
              </Typography>
            </Box>
            <Avatar sx={{ width: 72, height: 72, bgcolor: 'primary.main', boxShadow: 3 }}>{user?.name?.charAt(0) || 'U'}</Avatar>
          </CardContent>
        </Card>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {summaryData.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard title={item.title} value={item.value} icon={item.icon} color={item.color} subtitle={`${item.trend} ${item.trendPositive ? '↑' : '↓'} from last month`} />
          </Grid>
        ))}
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} className="dashboard-charts">
        {/* Bar Chart */}
        <Grid item xs={12} md={8}>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                height: 360, 
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'linear-gradient(180deg,rgba(255,255,255,0.6),transparent)',
                transition: 'transform 200ms ease, box-shadow 200ms ease',
                '&:hover': {
                  boxShadow: 4,
                  transform: 'translateY(-4px)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 1 }}>
                <Typography variant="h6">Tasks Overview</Typography>
                <Typography variant="caption" color="text.secondary">Last 6 months</Typography>
              </Box>
              <Box sx={{ flex: 1, height: 300 }}>
                <ResponsiveBar
                  data={barData}
                  keys={['tasks']}
                  indexBy="month"
                  margin={{ top: 30, right: 16, bottom: 48, left: 56 }}
                  padding={0.28}
                  borderRadius={6}
                  defs={[{ id: 'barsGradient', type: 'linearGradient', colors: [{ offset: 0, color: theme.palette.primary.light }, { offset: 100, color: theme.palette.primary.main }] } ]}
                  fill={[{ match: '*', id: 'barsGradient' }]}
                  tooltip={({ id, value, indexValue, color }) => (
                    <div style={{ padding: 8, background: '#fff', color: '#0f172a', borderRadius: 6, boxShadow: '0 6px 20px rgba(12,24,52,0.12)' }}>
                      <strong style={{ display: 'block' }}>{indexValue}</strong>
                      <span style={{ color: color }}>{value} tasks</span>
                    </div>
                  )}
                  valueScale={{ type: 'linear' }}
                  indexScale={{ type: 'band', round: true }}
                  colors={[theme.palette.primary.main]}
                  borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 8,
                    tickRotation: -20,
                    legend: 'Month',
                    legendPosition: 'middle',
                    legendOffset: 32,
                    format: v => v,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 8,
                    tickRotation: 0,
                    legend: 'Number of Tasks',
                    legendPosition: 'middle',
                    legendOffset: -48,
                  }}
                  theme={{
                    axis: {
                      ticks: { text: { fontSize: 12, fill: theme.palette.text.secondary } },
                      legend: { text: { fontSize: 13, fill: theme.palette.text.secondary } },
                    },
                    grid: { line: { stroke: theme.palette.divider } }
                  }}
                  enableGridX={false}
                  enableGridY={true}
                  labelSkipWidth={14}
                  labelSkipHeight={12}
                  labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                  animate={true}
                />
              </Box>
            </Paper>
          </motion.div>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={4}>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                height: 360, 
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'linear-gradient(180deg,transparent,rgba(0,0,0,0.02))',
                transition: 'transform 200ms ease, box-shadow 200ms ease',
                '&:hover': {
                  boxShadow: 4,
                  transform: 'translateY(-4px)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 1 }}>
                <Typography variant="h6">Task Status</Typography>
                <Typography variant="caption" color="text.secondary">Current distribution</Typography>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', gap: 3, width: '100%', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1, minWidth: 220, maxWidth: 520 }}>
                  {pieData.map((d, idx) => {
                    const total = pieData.reduce((s, x) => s + x.value, 0);
                    const pct = Math.round((d.value / total) * 100);
                    const colors = [theme.palette.success.main, theme.palette.warning.main, theme.palette.error.main];
                    const icons = [<CheckCircleIcon fontSize="small" />, <PendingIcon fontSize="small" />, <ErrorIcon fontSize="small" />];
                    return (
                      <Box
                        key={d.id}
                        component={motion.div}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ translateY: -4 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                        sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}
                      >
                        <Box sx={{ width: 40, height: 40, borderRadius: 1.5, bgcolor: colors[idx], display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                          {icons[idx]}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="body1" sx={{ fontWeight: 700 }}>{d.label}</Typography>
                            <Typography variant="body2" color="text.secondary">{d.value} • {pct}%</Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={pct}
                            sx={{
                              height: 10,
                              borderRadius: 10,
                              background: theme.palette.action.hover,
                              '& .MuiLinearProgress-bar': { bgcolor: colors[idx], transition: 'width 700ms cubic-bezier(.2,.9,.2,1)' }
                            }}
                          />
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexBasis: { xs: '100%', sm: '340px' }, borderLeft: { xs: 'none', sm: `1px solid ${theme.palette.divider}` }, pl: { xs: 0, sm: 3 } }}>
                  <Box sx={{ width: '100%', maxWidth: 320, height: 260 }}>
                    <ResponsivePie
                     data={pieData}
                      margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
                      startAngle={-90}
                      innerRadius={0.62}
                      padAngle={1.2}
                      cornerRadius={6}
                      activeOuterRadiusOffset={0}
                      borderWidth={0}
                      enableArcLinkLabels={false}
                      arcLabelsSkipAngle={999}
                      arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 1.2]] }}
                      colors={[theme.palette.success.main, theme.palette.warning.main, theme.palette.error.main]}
                      enableArcLabels={false}
                      legends={[]}
                      layers={[
                        'arcs',
                        (props) => {
                          // center background circle (small and crisp)
                          const { centerX, centerY } = props;
                          const radius = Math.min(props.innerRadius * Math.min(props.width, props.height) / 2, 44);
                          return (
                            <g>
                              <circle cx={centerX} cy={centerY} r={radius} fill={theme.palette.mode === 'dark' ? theme.palette.background.paper : '#ffffff'} opacity={0.98} stroke={theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(12,24,52,0.04)'} />
                            </g>
                          );
                        },
                        (props) => {
                          const total = pieData.reduce((s, d) => s + d.value, 0);
                          const { centerX, centerY } = props;
                          return (
                            <g>
                              <text x={centerX} y={centerY - 6} textAnchor="middle" style={{ fontSize: 20, fontWeight: 700, fill: theme.palette.text.primary }}>{total}</text>
                              <text x={centerX} y={centerY + 18} textAnchor="middle" style={{ fontSize: 11, fill: theme.palette.text.secondary }}>Tasks</text>
                            </g>
                          );
                        }
                      ]}
                      animate={{ mass: 1, tension: 170, friction: 26 }}
                      isInteractive={false}
                    />
                </Box>
              </Box>
            </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        <Grid item xs={12}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              mt: 3, 
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Box>
              {[1, 2, 3].map((item) => (
                <Box 
                  key={item} 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    py: 2,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    '&:last-child': {
                      borderBottom: 'none',
                    },
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2">
                      {user?.name || 'User'} {item === 1 ? 'completed' : item === 2 ? 'updated' : 'started'} a task
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item === 1 
                        ? 'Task #123 - Dashboard Design' 
                        : item === 2 
                          ? 'Task #124 - User Authentication' 
                          : 'Task #125 - API Integration'}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="textSecondary">
                    {item === 1 ? '2 hours ago' : item === 2 ? '5 hours ago' : '1 day ago'}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <CTAButton onClick={() => setOpen(true)} />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Task</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Title" sx={{ my: 1 }} />
          <TextField fullWidth label="Description" sx={{ my: 1 }} multiline rows={4} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashboardPage;
