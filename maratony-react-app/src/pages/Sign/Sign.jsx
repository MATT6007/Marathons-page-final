import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import { createToken, getUserData } from '../../hooks/hook'
import { useAuth } from '../../contexts/AuthContext'

export default function Sign() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [date, setDate] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [pass, setPass] = useState('')
  const [repass, setRepass] = useState('')
  const agreement = useRef()
  const [error, setError] = useState(false)
  
  const {setIsAdmin, setIsLogged} = useAuth();
  const navigate = useNavigate();

  const sendRegistrationData = async() =>
  { 
    const toSend = {
      first_name: fname,
      last_name: lname,
      date_of_birth: date + "T00:00:0.000Z",
      email: email,
      phone: phone,
      image_url: "",
      password: pass
    }

    const res = await fetch('http://localhost:8000/register',
    {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(toSend)
    
    })

    const data = await res.json();

    if(!data.hasOwnProperty("email"))
    {
      throw new Error(data.detail)
    }
    else
    {
      return data;
    }
  }

  const onSubmit = async (e) =>
  {
      e.preventDefault()
      if(pass !== repass)
      {
        setError(!error)
        setPass('')
        setRepass('')
        return
      }
      
      const data = await sendRegistrationData()
      .catch((e) => 
      {
            alert("ERROR: " + e.message)
            setFname('')
            setLname('')
            setDate('')
            setEmail('')
            setPhone('')
            setPass('')
            setRepass('')
      });

      if(typeof(data) == "undefined")
      {
        return;
      }
      
      console.log('email, pass')
      console.log(email)
      console.log(pass)

      const token = await createToken(email, pass)
      .catch((e) => 
      {
        alert("ERROR: " + e.message)
        setFname('')
        setLname('')
        setDate('')
        setEmail('')
        setPhone('')
        setPass('')
        setRepass('')
        return
      });

      if(typeof(token) == "undefined")
      {
        return;
      }

      localStorage.setItem("token", token)

      const userData = await getUserData()
      .catch((e) => {
        alert("ERROR: " + e.message)
        setFname('')
        setLname('')
        setDate('')
        setEmail('')
        setPhone('')
        setPass('')
        setRepass('')
      });

      if(typeof(userData) == "undefined")
      {
        return;
      }

      localStorage.setItem("user", JSON.stringify(userData))
      setIsLogged(true)
      navigate('/home');
  }

  function CheckboxLabeled()
  {
    const [checked, setChecked] = useState(false);

    return (<div>
      <FormControlLabel control={<Checkbox 
      checked={checked}
      ref={agreement}
      required={true}
      onChange={(e)=>setChecked(e.target.checked)}
    />}
    label="Akceptuję warunki umowy"
    />
    </div>
    )
  }

  return (
      <Container component="main" maxWidth="xs">
      <form className='register-form' onSubmit={onSubmit}>
        <CssBaseline />
        <Box
        sx={{
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
        }}
      >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={{style : {color : 'black'} }}
                  autoComplete="given-name"
                  name="firstName"
                  required={true}
                  onChange={(e) => setFname(e.target.value)}
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={fname}
                  autoFocus
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
              <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={{style : {color : 'black'} }}
                  required={true}
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lname}
                  onChange = {(e) => setLname(e.target.value)}
                  autoComplete="family-name"
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
                  InputLabelProps={{style : {color : 'black'} }}
                  required={true}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
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
                  InputLabelProps={{style : {color : 'black'} }}
                  required={true}
                  fullWidth
                  type="date"
                  id="birth_date"
                  value={date}
                  onChange = {(e) => setDate(e.target.value)}
                  name="birth_date"
                  autoComplete="birth_date"
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
                  InputLabelProps={{style : {color : 'black'} }}
                  required = {false}
                  fullWidth
                  type="tel"
                  label="Phone number"
                  id="phone_number"
                  name="phone_number"
                  autoComplete="phone_number"
                  placeholder="123456789"
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
                  InputLabelProps={{style : {color : 'black'} }}
                  required={true}
                  onChange={(e) => setPass(e.target.value)}
                  value={pass}
                  error={error}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
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
                  InputLabelProps={{style : {color : 'black'} }}
                  required={true}
                  onChange={(e) => setRepass(e.target.value)}
                  fullWidth
                  value={repass}
                  error={error}
                  name="repassword"
                  label="Repat password"
                  type="password"
                  id="repassword"
                  autoComplete="re-password"
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
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in 
                </Link> 
              </Grid>
            </Grid>
          </Box>
        </form>
      </Container>
  );
}