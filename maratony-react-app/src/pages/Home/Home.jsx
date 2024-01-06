import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPosts';
import Main from '../Blog/Main';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import './Home.css'; 


const mainFeaturedPost = {
  title: 'Welocome on our marathon page',
  description:
    "We made it from love running. We enjoy, we appreciate, we will be focused.",
  image: 'https://source.unsplash.com/random?running',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};


const sidebar = {
  title: 'Marathons ahead',
  description:
    'Here we have new running events that you can follow in. We encourage you to part in.',
};



const Home = () => {
  const [marathon, setMarathon] = useState([]);
  const [sidebarArchives, setSidebarArchives] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const defaultBody = "Zapraszamy do udziału w zawodach. "

  const [imageColor] = useState(null);
 
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
        setMarathon(jsonData.items);
        
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const sidebarArchives = marathon.map((marathon) => ({
      id: marathon.ID_competition,
      title: marathon.name,
      date: marathon.date,
      image: marathon.image,
    }));

    setSidebarArchives(sidebarArchives);
  }, [marathon]);


  useEffect(() => {
    const fetchedFeaturedPosts = marathon.slice(2, 4).map((marathon) => ({
      title: marathon.name,
      date: marathon.date,
      // description: marathon.body,
      description: defaultBody,
      image: marathon.image,
      imageLabel: 'Image Text',
    }));

    setFeaturedPosts(fetchedFeaturedPosts);
  }, [marathon]);


  return (
    <>
      <Container maxWidth="lg"> 
        <main>
       <MainFeaturedPost post={{ ...mainFeaturedPost, imageColor }} />

          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>

            <Grid container spacing={5} sx={{ mt: 3 }}>
              <Main title="From the firehose"  />
              
              <Sidebar className="Sidebar"
                title={sidebar.title}
                description={sidebar.description}
                archives={sidebarArchives}
              />
            </Grid>
         
        </main>

      </Container>
      
    </>
  );
      }
      
export default Home;
