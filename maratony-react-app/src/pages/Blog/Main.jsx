import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useEffect, useState} from 'react';
import {Paper, Card, CardContent, CardMedia, iconClasses } from '@mui/material';
import axios from 'axios';
import TopRunners from './TopRunners';

function formatDate(runner){
  const dateOfBirth = new Date(runner.date_of_birth);
  const year = dateOfBirth.getFullYear();
  const month = (`0${dateOfBirth.getMonth() + 1}`).slice(-2); 
  const day = (`0${dateOfBirth.getDate()}`).slice(-2);
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

function Main(props) {
  const [competitionCategories, setCompetitionCategories] = useState([]);
  const [topRunners, setTopRunners] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const sortedRunners = topRunners.sort((a, b) => b.races_participated - a.races_participated);
  const displayOrder = [1, 0, 2];
  const defaultIcon = 'https://st3.depositphotos.com/3538469/15750/i/450/depositphotos_157501024-stock-photo-business-man-icon.jpg';


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/competition_categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompetitionCategories(response.data);
      } catch (error) {
        console.error('Błąd podczas pobierania danych o kategoriach:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchTopRunners = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/top-runners`);
            setTopRunners(response.data);
        } catch (error) {
            console.error('Błąd podczas pobierania topowych zawodników:', error);
        }
    };

    fetchTopRunners();
  }, []);
  

  const { posts, title } = props;

  return (
    <Grid item xs={12} md={8}>
       <div style={{ padding: '20px' }}>
       <Paper style={{ padding: '20px', background: 'white', border: '2px solid black', color: 'black', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Registered Competition Categories
      </Typography>

      { competitionCategories.length === 0 ? (
        <Grid item xs={12}>
          <Box
            bgcolor="error.main"
            color="error.contrastText"
            p={2}
            borderRadius={8}
            textAlign="center"
          >
            <Typography variant="body1" style={{ fontSize: '20px' }}>
              Competition categories are not available at the moment.
            </Typography>
          </Box>
        </Grid>
      ) : (<></>)}


      <Grid container spacing={3}>
      {competitionCategories.slice(0, 6).map((category) => (
        <Grid item key={category.ID_competition_category} xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                {category.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Distance: {category.distance} km
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Certificate: {category.certificate ? 'Yes' : 'No'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

        <Typography variant="h4" gutterBottom style={{ marginTop: '40px' }}>
          Top Runners
        </Typography>

        { topRunners.length  === 0 ? (
        
        <Grid item xs={12}>
          <Box
            bgcolor="error.main"
            color="error.contrastText"
            p={2}
            borderRadius={8}
            textAlign="center"
            marginBottom={"20px"}
          >
            <Typography variant="body1" style={{fontSize:'20px'}}>
              Top runners are not available at the moment.
            </Typography>
          </Box>
        </Grid>
          ) : (<></>)}

        <Grid container spacing={3} justifyContent="center">
          {displayOrder.map((orderIndex) => {
            const runner = sortedRunners[orderIndex];
            if (!runner) {
              return null; 
          }

        return (
          <Grid item key={runner.ID_runner} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia component="img" alt={`${runner.first_name} ${runner.last_name}`} height="140" image={runner.image_url === "" ? defaultIcon : runner.image_url} />
              <CardContent>
                <Typography variant="h6" component="div">
                  {runner.first_name} {runner.last_name}
                </Typography>
                <Typography variant="body2">
                  {orderIndex === 1 && (
                    <span style={{ color: 'rgb(210, 210, 210)', fontWeight: 'bold' }}>Races Participated: {runner.races_participated} </span>
                  )}
                  {orderIndex === 0 && <span style={{ color: 'gold', fontWeight: 'bold' }}>Races Participated: {runner.races_participated}</span>}
                  {orderIndex === 2 && (
                    <span style={{ color: 'saddlebrown', fontWeight: 'bold' }}>Races Participated: {runner.races_participated}</span>
                  )}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  
                  Date of Birth: <br/>
                  {formatDate(runner)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Club: {runner.club ? (<>{runner.club}</>):(<>{"No club"}</>)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
      </Grid>

      </Paper>
      </div>
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;