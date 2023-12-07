import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
    >
      <div style={{ marginBottom: '20px' }}>
        <img
          src="./error.svg"
          alt="Not Found Illustration"
          style={{ width: '100%', maxWidth: '250px' }}
        />
      </div>

      <Typography variant="h4" color="textSecondary" gutterBottom>
        Page not found
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        The page you are looking for might be in another castle.
      </Typography>
      <Button component={Link} to="/" variant="primary">
        Go Home
      </Button>
    </Box>
  );
}

export default NotFoundPage;
