import React from 'react';
import { Box, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import { useAuth } from '../../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
    bannerContainer: {
        marginBottom: theme.spacing(2),
    },
    mainBanner: {
        padding: theme.spacing(4),
        borderRadius: theme.spacing(1),
        textAlign: 'center',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        border: `2px solid ${theme.palette.primary.contrastText}`,
        marginTop: theme.spacing(16),
    },
    secondaryBanner: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(3),
        borderRadius: theme.spacing(1),
        textAlign: 'center',
        backgroundColor: '#6392c3', 
        color: 'white',
        border: `2px solid white`, 
    },
}));

const CustomBanner = () => {
    const classes = useStyles();
    const {isLogged, setIsLogged} = useAuth()

    return (
        <Container maxWidth="lg" className={classes.bannerContainer}>
            <Box className={classes.mainBanner}>
            {isLogged ? (
                <div>
                    <Typography component="h1" variant="h3" gutterBottom>
                        Here you will find results of your runs
                    </Typography>
                </div>
                ) : (
                <div>
                    <Typography component="h1" variant="h3" gutterBottom>
                        Here you will find results of your runs
                    </Typography>
                    <Typography variant="h5">
                        Log in to watch runs you are registered in
                    </Typography>
                </div>
                )}
                
            </Box>

            <Box className={classes.secondaryBanner}>
                <Typography variant="h4" gutterBottom>
                    Registered events
                </Typography>
            </Box>
        </Container>
    );
};

export default CustomBanner;
