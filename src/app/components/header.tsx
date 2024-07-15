// Header.tsx
'use client';
import React, {useState} from 'react';
import HeaderLink from '@/app/components/header/link';
import {useTheme} from "@mui/material/styles";
import {Box, Container, AppBar, Toolbar} from "@mui/material";

const Header: React.FC = () => {
  const appBarBg = useTheme().palette.mode === "light" ? "white" : "black";
  const basePath = process.env.basePath ?? '';
  const getLink = (path: string) => `${basePath}${path}`;
  console.log(getLink("/"));
  return (
    <Container><Container>
      <AppBar
        position="static"
        sx={{
          height: "7.5vh",
          justifyContent: "flex-start",
          backgroundColor: appBarBg,
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
          <HeaderLink href={getLink("/")} text="top 150" />

          <HeaderLink href={getLink("/amazon")} text="amazon" />
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
