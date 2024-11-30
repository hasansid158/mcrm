import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./core/theme";

import MainRoute from "pages/route/MainRoute";

import { useDispatch } from "react-redux";
import { login, logout } from "redux/slices/authSlice";
import Cookies from 'universal-cookie';

function App() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  !!cookies.get('token') ? dispatch(login(cookies.get('token'))) : dispatch(logout());

  return <>
  <ThemeProvider theme={theme}>
    <MainRoute/>
  </ThemeProvider>
  </>;
}

export default App;
