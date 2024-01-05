import { Container, Typography, Button } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendMail } from '../../hooks/hook'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import { styled } from '@mui/material/styles';
import MuiTextField from '@mui/material/TextField';

type TextFieldProps = {
  borderColor?: string;
};

const options = {
  shouldForwardProp: (prop) => prop !== 'borderColor',
};
const outlinedSelectors = [
  '& .MuiOutlinedInput-notchedOutline',
  '&:hover .MuiOutlinedInput-notchedOutline',
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline',
];
const TextField = styled(
  MuiTextField,
  options,
)<TextFieldProps>(({ borderColor }) => ({
  '& label.Mui-focused': {
    color: borderColor,
  },
  [outlinedSelectors.join(',')]: {
    borderWidth: 3,
    borderColor,
  },
}));

export default function ForgotPassword () {
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const onSubmit = async(e) => 
    {
        e.preventDefault()

        const resp = await sendMail(email)
        .catch((e) => 
        {
            alert(e.message)
            setEmail("")
            return
        })

        if(typeof(resp) === "undefined")
        {
            return;
        }

        alert(`Wysłano wiadomość z linkiem do resetu hasła na ${email}`)
        localStorage.setItem("resetEmail", email)
        navigate("/home")
    }

  return (
    <Container sx={{display:"flex", justifyContent: "center", marginTop: 10, marginBottom: 10}}>
       
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
          <FlipCameraAndroidIcon/>
        </Avatar>

        <form className='register-form' onSubmit={onSubmit}>
        <Typography 
                marginBottom={3}
                marginTop={1}
                variant="h5"
                align="center">
                Reset password
        </Typography>
            <Container sx={{justifyContent: "center", marginLeft: 2.5}}>
                <div className='form-control'>
                <Typography 
                    variant="subtitle1"
                    marginBottom={0.5}
                    >Podaj email</Typography>
                <TextField
                    borderColor="blue" 
                    InputLabelProps={{style : {color : 'black'} }}
                    type="text"
                    placeholder="test@test.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
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
                </div>
                <Button 
                
                type='submit' 
                variant='contained' 
                sx={{color: "#fff", marginTop: 1, marginLeft: '25%', }}
                >Wyślij</Button>
            </Container>
        </form>
        </Box>
    </Container>
  )
}


