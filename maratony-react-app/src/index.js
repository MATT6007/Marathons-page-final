import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { orange, blue } from '@mui/material/colors';
import { BrowserRouter } from 'react-router-dom';


export const websiteTheme = createTheme({
  palette: {
    mode: 'dark',
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider theme={websiteTheme}>
      <App /> 
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
