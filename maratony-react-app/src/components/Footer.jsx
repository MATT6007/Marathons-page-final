import { Box, Typography, Button } from '@mui/material';
import React from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';


const Footer = () => {
    return (
        <div id="contact">
          <Box
            display={'flex'}
            sx={{
              bgcolor: '#272727',
              justifyContent: 'center',
              p: 3,
              mt: 3,
            }}
          >
            <Box
              sx={{
                width: 300,
                mr: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'space-between',
              }}
            >
              <Box sx={{}}>
                <Typography
                  color="primary"
                  variant="h6"
                  component="div"
                  sx={{ mb: 3, ml: -1 }}
                >
                  Running event service
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                  }}
                >
                  <LocationOnIcon
                    fontSize="small"
                    color="primary"
                    sx={{ mr: 2 }}
                  ></LocationOnIcon>
                  Władysława Reymonta 17, Kraków
                </Typography>
    
                <Typography
                  component="div"
                  sx={{ display: 'flex', alignItems: 'center', mt: 1,color: 'white' }}
                >
                  <PhoneIcon
                    fontSize="small"
                    color="primary"
                    sx={{ mr: 2 }}
                  ></PhoneIcon>
                  (+48)123-456-789
                </Typography>
    
                <Typography
                  component="div"
                  sx={{ display: 'flex', alignItems: 'center', mt: 1, color: 'white',}}
                >
                  <EmailIcon
                    fontSize="small"
                    color="primary"
                    sx={{ mr: 2 }}
                  ></EmailIcon>
                  twojeMaratony2023@gmail.com
                </Typography>
              </Box>
    
              <Box
                sx={{
                  mt: 6,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <a href="https://www.facebook.com/">
                  <Button>
                    <FacebookIcon fontSize="large"></FacebookIcon>
                  </Button>
                </a>
                <a href="https://www.instagram.com/">
                  <Button>
                    <InstagramIcon fontSize="large"></InstagramIcon>
                  </Button>
                </a>
                <a href="https://twitter.com/">
                  <Button>
                    <TwitterIcon fontSize="large"></TwitterIcon>
                  </Button>
                </a>
              </Box>
            </Box>
            <Box>
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2561.0385459988584!2d19.911916282000746!3d50.0668397603156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165ba48fa84b9b%3A0x9a491cf861c762e3!2sWydzia%C5%82%20Fizyki%20i%20Informatyki%20Stosowanej%20Akademii%20G%C3%B3rniczo-Hutniczej%20w%20Krakowie!5e0!3m2!1spl!2spl!4v1683879304423!5m2!1spl!2spl"
                width="350"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Box>
          </Box>
        </div>
      );
};

export default Footer;
