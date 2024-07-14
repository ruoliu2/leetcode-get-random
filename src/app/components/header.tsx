// Header.tsx
'use client';
import React, {useState} from 'react';
import HeaderLink from '@/app/components/header/link';
import {useTheme} from "@mui/material/styles";
import {Box, Container, AppBar, Toolbar} from "@mui/material";

const Header: React.FC = () => {
  const appbarbg = useTheme().palette.mode === "light" ? "white" : "black";
  return (
    <Container><Container>
      <AppBar
        position="static"
        sx={{
          height: "7.5vh",
          justifyContent: "flex-start",
          backgroundColor: appbarbg,
          boxShadow: "none",
        }}
        elevation={1}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "30%",
          }}
        >
          <HeaderLink href="/" text="Top 150" />

          <HeaderLink href="/amazon" text="amazon" />
        </Toolbar>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "70%",
          }}
        >
        </Toolbar>
      </AppBar>
      <Box py={2}/>
    </Container></Container>
  );
};

export default Header;
