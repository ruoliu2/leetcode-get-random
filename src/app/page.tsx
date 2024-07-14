'use client';
import {Box, Container} from '@mui/material';
import Top150 from '@/app/components/top150';
import useMediaQuery from '@mui/material/useMediaQuery';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Topbar from "@/app/components/header";
import Header from '@/app/components/header';


export default function Home() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <>
        <Header />
        <Top150/>
      </>
    </ThemeProvider>
  );
}
