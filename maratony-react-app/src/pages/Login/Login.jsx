import React, {useState} from 'react'
import { TextField, Container, Typography, Button } from '@mui/material'
import { createToken, getUserData } from '../../hooks/hook'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Login = () => {
  const {setIsLogged} = useAuth();
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState(false)

  const navigate = useNavigate();

  const onSubmit = async(e) => 
  { 
    e.preventDefault()

    const token = await createToken(email, pass)
    .catch((error) =>
    {
        alert("ERROR: " + error.message);
        setEmail('');
        setPass('');
        setError(true);
    });
    console.log(token)

    if(typeof(token) == "undefined")
    {
        return;
    }

    localStorage.setItem("token", token);

    const data = await getUserData()
    .catch((e) => 
    {
      alert("ERROR: " + e.message)
      setEmail('');
      setPass('');
      setError(true);
    });

    localStorage.setItem("user", JSON.stringify(data));

    setIsLogged(true);

    navigate("/home")
  }

return (
    <Container component="main" maxWidth="xs">
      <form className='register-form' onSubmit={onSubmit}>
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main'}}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
          <TextField
            InputLabelProps={{style : {color : 'black'} }}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            error={error}
            onChange={(e) => setEmail(e.target.value)}
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
          <TextField
            InputLabelProps={{style : {color : 'black'} }}
            margin="normal"
            required={true}
            value={pass}
            error={error}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e) => setPass(e.target.value)}
            autoComplete="current-password"
            sx={{
              input: {
                color: 'blue',
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/sign" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
    </form>
    </Container>
);
}

export default Login