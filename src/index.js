import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  BrowserRouter,

} from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: { main: "#e91e1e", contrastText: "#fff" },
    secondary: { main: "#03a9f4", contrastText: "#fff" }
  }
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <ThemeProvider theme={theme}>
    < App  />
    </ThemeProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
