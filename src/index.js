import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
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
