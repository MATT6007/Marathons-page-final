import React from 'react';
import { Box, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    bannerContainer: {
        marginBottom: theme.spacing(2),
    },
    mainBanner: {
        padding: theme.spacing(2),
        borderRadius: theme.spacing(1),
        textAlign: 'center',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        border: `2px solid ${theme.palette.primary.contrastText}`,
        marginTop: theme.spacing(5),
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

const CustomBanner = ({text}) => {
    const classes = useStyles();
    return (

        <Container maxWidth="lg" className={classes.bannerContainer}>
            <Box className={classes.mainBanner}>
                <Typography component="h1" variant="h3" >
                    {text}
                </Typography>
            </Box>
        </Container>
    );
};

export default CustomBanner;
