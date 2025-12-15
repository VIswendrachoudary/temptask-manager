import React from 'react';
import { Box, Typography, Button, Container, Paper, useTheme, useMediaQuery } from '@mui/material';
import { Home as HomeIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: isMobile ? 3 : 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            className="floaty"
            sx={{
              fontSize: isMobile ? '6rem' : '8rem',
              fontWeight: 700,
              lineHeight: 1,
              color: theme.palette.primary.main,
              mb: 2,
            }}
          >
            404
          </Typography>
          
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            Oops! Page not found
          </Typography>
          
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: '600px',
              mb: 4,
            }}
          >
            The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
          </Typography>
          
          <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: 2,
              width: '100%',
              maxWidth: '400px',
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              fullWidth
              sx={{
                py: 1.5,
              }}
            >
              Go Back
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/')}
              fullWidth
              sx={{
                py: 1.5,
              }}
            >
              Go to Home
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
