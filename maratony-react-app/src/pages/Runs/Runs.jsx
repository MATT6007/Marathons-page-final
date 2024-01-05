import React from 'react';
import { Grid, Link } from '@mui/material';
import { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import './Home.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../../contexts/AuthContext.jsx';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import RegistrationForm from './RegistrationForm.jsx'
import CustomBanner from './CustomBanner.jsx';

import Modal from '@mui/material/Modal';

import { green, purple, blue, orange } from '@mui/material/colors';

export const defaultTheme = createTheme({
  palette: {
    background: {
      default: blue[100], 
    },
    primary: {
      main: blue[500],
    },
  },
 
  status: {
    danger: orange[500],
  },
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Runs = () => {
  const [marathon, setMarathon] = useState([]);
  const [modalData, setModalData] = useState(null);

  const [open, setOpen] = React.useState(false);
  const [selectedMarathon, setSelectedMarathon] = useState(null);
  const [isCompetitionsVisible, setCompetitionsVisibility] = useState(false);

  const [topRunners, setTopRunners] = useState([]);

  const {isLogged, setIsLogged} = useAuth()

  const handleMore = async (marathonId) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log('User not logged in. Redirect to login page or handle accordingly.');
            return;
        }

        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        

        const response = await fetch(`${process.env.REACT_APP_API_URL}/competition/${marathonId}`, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error('Connection error');
        }

        const data = await response.json();

        setModalData(data);
        setSelectedMarathon(false);
        handleOpen();

        console.log(data);
        alert(data.name + ' ' + data.ID_competition + ' ' + data.body);
    } catch (error) {
        console.error('Błąd podczas pobierania danych z API:', error);
    }
  };

  const handleView = async (marathonId) => {
    try {
        const token = localStorage.getItem('token');
  
        if (!token) {
            console.log('User not logged in. Redirect to login page or handle accordingly.');
            return;
        }
  
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
  
        const response = await fetch(`${process.env.REACT_APP_API_URL}/competition/${marathonId}`, {
            method: 'GET',
            headers: headers,
        });
  
        if (!response.ok) {
            console.error('Error fetching marathon details:', response.statusText);
            return;
        }
  
        const marathonDetails = await response.json();
        setSelectedMarathon(marathonDetails.ID_competition);
        setModalData(marathonDetails);
        handleOpen();
  
    } catch (error) {
        console.error('Error fetching marathon details:', error);
    }
  };

  const handleRegistration = async (formData, marathonId, isPaid) => {
    var req;
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log('User not logged in. Redirect to login page or handle accordingly.');
            return;
        }

        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const registrationResponse = await fetch(`${process.env.REACT_APP_API_URL}/competition/${marathonId}/register`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ ...formData, is_paid: isPaid }),
        });

        req = registrationResponse;
        
        if (registrationResponse.ok) {
            console.log('Zapisano na bieg!');
        } else {
            console.error('Błąd podczas zapisywania na bieg');
        }

        } catch (error) {
            console.error('Błąd podczas zapisywania na bieg:', error);
        }

        return req;
    };


    const handleRegistrationForm = (marathonId) => {
        setSelectedMarathon(marathonId); 
        handleOpen(); 
    };

  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); 

        if (!token) {
          console.log('User not logged in. Redirect to login page or handle accordingly.');
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        const response = await fetch(`${process.env.REACT_APP_API_URL}/competition`, {
          method: 'GET',
          headers: headers,
        });

        if (!response.ok) {
          console.log('Error fetching data:', response.statusText);
          return;
        }

        const jsonData = await response.json();
        console.log(jsonData);
        setMarathon(jsonData.items);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <main>
                <Box
                    sx={{
                        pt: 6,
                        pb: 4,
                    }}
                >
                <CustomBanner />
                </Box>

                {isLogged ? (
                     <div>
                     
                     </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '20vh', marginTop: '20px' }}>
                        <Typography
                            variant="body1"
                            style={{
                                padding: '15px',
                                background: '#FFA500',
                                color: '#000',
                                border: '2px solid #000',
                                textAlign: 'center',
                                width: '35%',
                                borderRadius: '8px',
                                fontSize: '28px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            Log in to unlock the content.
                            <LockOpenIcon style={{ fontSize: '76px', color: '#000', margin: '20px' }} />
                        </Typography>
                    </div>
                )}

                <Container sx={{ py: 1 }} maxWidth="lg">
                    <Grid container spacing={4}>
                        {marathon.map((marathon) => (
                            <Grid item key={marathon.ID_competition} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: 1 }}
                                >
                                    <CardMedia
                                        component="div"
                                        sx={{
                                            pt: '56.25%',
                                        }}
                                        image={marathon.image}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h6" component="h4" fontWeight={'bold'}>
                                            {marathon.name}
                                        </Typography>
                                        <Typography>
                                            {marathon.body}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button variant="contained" size="medium" onClick={() => handleView(marathon.ID_competition)}>
                                            View
                                        </Button>
                                        <Button variant="outlined" size="medium" onClick={() => handleMore(marathon.ID_competition)}>
                                            More
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>

                {modalData && (
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2"
                                style={{
                                    color: 'blue',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    fontSize: '18px'
                                }}>
                                More about competition
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <h2>Name: {modalData.name}</h2>
                                <h3>Organizer: {modalData.organizer} </h3>
                                <p> Description: {modalData.body}</p>
                            </Typography>
                            {selectedMarathon && (
                                <RegistrationForm
                                    marathonId={modalData.ID_competition}
                                    handleRegistration={handleRegistration}
                                    handleClose={handleClose}
                                />
                            )}
                        </Box>
                    </Modal>
                )}
            </main>
        </ThemeProvider>
    </>
);
};

export default Runs;
