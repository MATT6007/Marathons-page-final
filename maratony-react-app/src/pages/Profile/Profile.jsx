import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Box, Avatar, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';
import axios from 'axios';
import CustomBanner from './CustomBanner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Profile = () => {
  const [setUser] = useState(null);
  const [competitions, setCompetitions] = useState([]);
  const [club, setClub] = useState(null);
  const [city, setCity] = useState(null);
  const [street, setStreet] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [resultsFormVisible, setResultsFormVisible] = useState(false);
  const [fullTimeResult, setFullTimeResult] = useState(null);
  const [halfTimeResult, setHalfTimeResult] = useState(null);
  const [isStarted, setIsStarted] = useState(null);
  const [isDisqualified, setIsDisqualified] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get(`${process.env.REACT_APP_API_URL}/users/me`, {headers: {
      Authorization: `Bearer ${token}`,
    },})
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user data:', error));

    axios.get(`${process.env.REACT_APP_API_URL}/users/me/competitions/`, {headers: {
      Authorization: `Bearer ${token}`,
    },})
      .then(response => setCompetitions(response.data))
      .catch(error => console.error('Error fetching registered competitions:', error));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchImageUrl = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/me`, 
        {headers: {
          Authorization: `Bearer ${token}`,
        },}); 
        setImageUrl(response.data.image_url);
      } catch (error) {
        console.error('Błąd podczas pobierania image_url z backendu:', error);
      }
    };

    fetchImageUrl();
  }, []);
  

  const handleClubChange = (event) => {
    setClub(event.target.value);
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleSelectedCompetitionChange = (event) => {
    setSelectedCompetition(event.target.value);
  };

  const handleIsStartedChange = (event) => {
    setIsStarted(event.target.value);
  };

  const handleIsDisqualifiedChange = (event) => {
    setIsDisqualified(event.target.value);
  };

  const handleResultsFormSubmit = () => {
    const token = localStorage.getItem('token');
    var response;
    try{
      response = axios.post(`${process.env.REACT_APP_API_URL}/add-results/${selectedCompetition}`, 
      {
        full_time: fullTimeResult, 
        half_time: halfTimeResult,
        is_started: isStarted,
        is_disqualified: isDisqualified,
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          console.log('Save results:', response.data);
          toast.success('Update profile properly!', {
            position: 'top-right',
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setResultsFormVisible(false); 
        })
        .catch((error) => {
          toast.error('Error during update profile.', {
            position: 'top-right',
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,})
          console.error('Error:', error);
        });
    } catch(error){
      console.log("Error: ", error)
    }
      finally{
        if (response !== undefined && response.status === 200){
          toast.success('Update profile properly!', {
            position: 'top-right',
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
  
          if (response === undefined || response.status === 404 || response.status === 500 || response.status === 422){
              toast.error('Error during update profile.', {
                position: 'top-right',
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
          }
        }
  };
  

  const handleShowResultsForm = () => {
    setResultsFormVisible(true);
  };

  const handleStreetChange = (event) => {
    setStreet(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handlePostalCodeChange = (event) => {
    setPostalCode(event.target.value);
  };

  const handleSaveURL = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/set-photo`,
        { image_url: imageUrl },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setImageUrl(response.data.imageUrl);
  
      toast.success('Update profile properly!', {
        position: 'top-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error(error);
  
      toast.error('Error while update profile.', {
        position: 'top-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    var response;
    try {
      const token = localStorage.getItem('token');
      
      response = await axios.post(`${process.env.REACT_APP_API_URL}/update-address-club`, {
        club,
        street,
        city,
        postalCode,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });
  
      const updatedRunner = response.data;
      setClub(updatedRunner.club);
      setStreet(updatedRunner.address.street);
      setCity(updatedRunner.address.city);
      setPostalCode(updatedRunner.address.postalCode);
      setImageUrl(updatedRunner.imageUrl);
      console.log('Aktualizacja zakończona pomyślnie:', updatedRunner);
    } catch (error) {
      console.error('Błąd podczas aktualizacji:', error);
    }
    finally{
      if (response !== undefined && response.status === 200){
        toast.success('Update profile properly!', {
          position: 'top-right',
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

        if (response === undefined || response.status === 404 || response.status === 500 || response.status === 422){
            toast.error('Error while update profile.', {
              position: 'top-right',
              autoClose: 10000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
        }
      }
  };
  
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CustomBanner text={"Edit profile"}/>
        <ToastContainer />
      </Grid>
      <Paper elevation={3} sx={{
          marginTop: 14,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 2, 
          border: '3px solid black',
          boxShadow: 1,
          borderRadius: 2,
          color: 'black',
          backgroundColor: 'lightgreen',
          padding: '20px',
          maxWidth: '400px',
          margin: 'auto',
          }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} >
          <Grid item xs={12}>
            <TextField
              label="Club"
              fullWidth
              variant="outlined"
              value={club}
              onChange={handleClubChange}
              margin="normal"
              InputLabelProps={{style : {color : 'black'} }}
              sx={{
                input: {
                  color: 'black',
                  backgroundColor: 'lightblue', 
                  '&:hover': {
                    backgroundColor: 'lightblue', 
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'lightblue', 
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Street"
              fullWidth
              variant="outlined"
              value={street}
              onChange={handleStreetChange}
              InputLabelProps={{style : {color : 'black'} }}
              sx={{
                input: {
                  color: 'black',
                  backgroundColor: 'lightblue', 
                  '&:hover': {
                    backgroundColor: 'lightblue', 
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'lightblue', 
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="City"
              fullWidth
              variant="outlined"
              value={city}
              onChange={handleCityChange}
              InputLabelProps={{style : {color : 'black'} }}
              sx={{
                input: {
                  color: 'black',
                  backgroundColor: 'lightblue', 
                  '&:hover': {
                    backgroundColor: 'lightblue', 
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'lightblue', 
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Postal code"
              fullWidth
              variant="outlined"
              value={postalCode}
              onChange={handlePostalCodeChange}
              InputLabelProps={{style : {color : 'black'} }}
              sx={{
                input: {
                  color: 'black',
                  backgroundColor: 'lightblue', 
                  '&:hover': {
                    backgroundColor: 'lightblue', 
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'lightblue', 
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained" color="primary">
              Save changes
            </Button>
          </Grid>
        </Grid>
      </form>
      </Paper>

      <Grid item xs={12}>
        <Avatar alt="Profile Picture" src={imageUrl} sx={{ width: 400, height: 400, margin: 'auto', marginBottom: '38px' }} />
      </Grid>

      <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 2, 
          border: '3px solid black',
          boxShadow: 1,
          borderRadius: 2,
          color: 'black',
          backgroundColor: 'lightgreen',
          padding: '20px',
          maxWidth: '800px',
          width: '600px',
          margin: 'auto',
          }}>
      <Grid item xs={12} sx={{marginBottom: '28px'}}>
        <TextField
          label="URL Photo Profile"
          width="600px"
          variant="outlined"
          onChange={handleImageUrlChange}
          InputLabelProps={{style : {color : 'black'} }}

          sx={{
            width: '500px',
            input: {
              color: 'black',
              backgroundColor: 'lightblue', 
              '&:hover': {
                backgroundColor: 'lightblue', 
              },
              '&.Mui-focused': {
                backgroundColor: 'lightblue', 
              },
            },
          }}
        />
      </Grid>
      <Grid item xs={12} >
        <Button variant="contained" color="primary" onClick={handleSaveURL} >
          Save changes
        </Button>
      </Grid>
      </Box>
      
      <CustomBanner text = {"Add competition results"}/>
          <Box  sx={{
            marginTop: 14,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 2, 
            border: '3px solid black',
            boxShadow: 1,
            borderRadius: 2,
            color: 'black',
            backgroundColor: 'lightgreen',
            padding: '20px',
            width: '600px',
            margin: 'auto',
          }}>
      <Grid xs = {8}>

      <FormControl sx={{ width: '400px' }} variant="outlined">
        <InputLabel id="competition-select-label">Choose competition</InputLabel>
        <Select
          sx={{ backgroundColor: 'lightblue', color: 'black' }}
          labelId="competition-select-label"
          label="Wybierz Zawody"
          value={selectedCompetition}
          onChange={handleSelectedCompetitionChange}
        >
          {competitions.map((competition) => (
            <MenuItem key={competition.ID_competition} value={competition.ID_competition}>
              {competition.name} - {competition.date} - {competition.location}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Button sx={{ marginTop: "28px", marginBottom: "28px" }} variant="contained" color="primary" onClick={handleShowResultsForm}>
          Add results
        </Button>
      </Grid>

      {resultsFormVisible && (
        <Grid item xs={12}>
          <TextField
            InputLabelProps={{ style: { color: 'black' } }}
            sx={{ backgroundColor: 'lightblue', color: 'black', input: { color: 'black' } }}
            label="Full time"
            fullWidth
            variant="outlined"
            value={fullTimeResult} 
            onChange={(e) => setFullTimeResult(e.target.value)} 
          />
          <TextField
            InputLabelProps={{ style: { color: 'black' } }}
            sx={{ backgroundColor: 'lightblue', color: 'black', input: { color: 'black' } }}
            label="Half time"
            fullWidth
            variant="outlined"
            value={halfTimeResult} 
            onChange={(e) => setHalfTimeResult(e.target.value)} 
          />

          <InputLabel style={{ color: 'black' }}>Is started</InputLabel>
            <Select
              value={isStarted}
              onChange={handleIsStartedChange}
              sx={{ backgroundColor: 'lightblue', color: 'black' }}
              fullWidth
              variant="outlined"
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>

          <InputLabel style={{ color: 'black' }}>Is disqualified</InputLabel>
            <Select
              value={isDisqualified}
              onChange={handleIsDisqualifiedChange}
              sx={{ backgroundColor: 'lightblue', color: 'black' }}
              fullWidth
              variant="outlined"
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button sx={{ marginTop: "28px", marginBottom: "28px" }} variant="contained" color="primary" onClick={handleResultsFormSubmit}>
              Save results
            </Button>
          </div>
  </Grid>
)}
      </Box>
    </Grid>
    
  );
};

export default Profile;
