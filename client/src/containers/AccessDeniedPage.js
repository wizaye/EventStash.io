import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AccessDeniedPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
    >
      {/* Placeholder for your vector illustration */}
      <div style={{ marginBottom: '20px' }}>
        <img
          src="./access_denied.svg"
          alt="Access Denied Illustration"
          style={{ width: '100%', maxWidth: '250px' }}
        />
      </div>

      <Typography variant="h4" color="error" gutterBottom>
        Access Denied
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Oops! It looks like you don't have permission to access this page.
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        If you believe this is an error, please contact support.
      </Typography>
      <Button component={Link} to="/" variant='primary'>
        Go Home
      </Button>
    </Box>
  );
}

export default AccessDeniedPage;
