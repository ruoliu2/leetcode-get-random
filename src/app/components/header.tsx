// Header.tsx
'use client';
import React, {useState} from 'react';
import {useTheme} from "@mui/material/styles";
import {Box, Container, AppBar, Toolbar} from "@mui/material";
import Link from "next/link";

const Header: React.FC = () => {
  const appBarBg = useTheme().palette.mode === "light" ? "white" : "black";
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
          <Link href="/"> Top 150 </Link>

          <Link href="/amazon"> amazon </Link>
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
