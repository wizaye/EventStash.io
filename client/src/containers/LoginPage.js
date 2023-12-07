import React, { useState } from 'react';
import { Stack, Typography, Box, Button, IconButton, CssBaseline } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const theme = createTheme({
        palette: {
            mode: isDarkMode ? 'dark' : 'light',
        },
    });
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

// Redirect to dashboard if already authenticated
React.useEffect(() => {
   if (isAuthenticated) {
      navigate('/dashboard'); // Redirect to the dashboard page
    }
  }, [isAuthenticated, navigate]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Stack direction={{ xs: 'row', sm: 'column', md: 'row' }} alignItems="center" height="100vh">
                {/* Left Box with Image */}
                <Box
                    display={{ xs: 'none', md: 'flex' }}
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                    sx={{
                        width: '50vw',
                        position: 'relative',
                    }}
                >
                    <img
                        alt='login'
                        src='./login.svg'
                        style={{
                            height: '100%',
                            width: '100%',
                            maxHeight: '60vh',
                            borderTopRightRadius: '10px',
                            borderBottomRightRadius: '10px',
                        }}
                    />
                </Box>

                {/* Right Box with Content */}
                <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='space-between'
                    alignItems='center'
                    sx={{
                        width: '50vw',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        paddingTop: '20px',
                        paddingBottom: '20px',
                        textAlign: 'center',
                        margin: { xs: 'auto', md: '0' },
                    }}
                >
                    <Box display='flex' flexDirection='column' alignItems='center' mb={3}>
                        <img src='./event.png' alt='Event Logo' style={{ height: '50px', width: '50px', marginBottom: '10px' }} />
                        <Typography variant='h4'>Event Stash</Typography>
                    </Box>

                    <Typography variant='body1' color='text.secondary' mb={3}>
                        Your One Stop Solution for Event Management
                    </Typography>
                    <Typography variant='h6' color='text.primary' mb={3}>
                        Click Below to Login/Signup
                    </Typography>
                    <Stack direction="row" spacing={2} mb={2}>
                        <Button
                            fullWidth
                            color={isDarkMode ? 'primary' : 'inherit'}
                            style={{ backgroundColor: isDarkMode ? 'white' : 'black', color: isDarkMode ? 'black' : 'white' }}
                            onClick={() => loginWithRedirect()}
                        >
                            Login
                        </Button>
                        <Button
                            fullWidth
                            variant='contained'
                            color={isDarkMode ? 'primary' : 'inherit'}
                            style={{
                                backgroundColor: isDarkMode ? 'white' : 'black',
                                color: isDarkMode ? 'black' : 'white',
                                marginLeft: '8px',  // Add space between buttons
                            }}
                            onClick={()=>loginWithRedirect({ 
                              authorizationParams:{
                                screen_hint: 'signup'
                              }
                             })}
                        >
                            Signup
                        </Button>
                    </Stack>


                    {/* Theme Toggle Button */}
                    <IconButton
                        onClick={toggleTheme}
                        sx={{ position: 'absolute', top: '10px', right: '10px' }}
                        color='primary'
                    >
                        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>

                    {/* Footer */}
                    <Box sx={{ mt: 'auto',alignItems:'flex-end' }}>
                        <Typography variant='body2' color='text.secondary'>
                            &copy; 2023 Event Stash. All rights reserved.
                        </Typography>
                    </Box>
                </Box>
            </Stack>
        </ThemeProvider>
    );
};

export default LoginPage;
