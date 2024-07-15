'use client';
import { Container, CssBaseline, useMediaQuery, ThemeProvider } from '@mui/material';
import React from "react";
import {createTheme} from "@mui/material/styles";
import Header from "@/app/components/header";
import '@/app/globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <html lang="en">
      <body>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        {children}
      </ThemeProvider>
      </body>
    </html>
  );
}
