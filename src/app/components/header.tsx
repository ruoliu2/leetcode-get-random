// Header.tsx
'use client';
import React, {useState} from 'react';
import {useTheme} from "@mui/material/styles";
import {Box, Container, AppBar, Toolbar, Typography, Button} from "@mui/material";
import Link from "next/link";
import HeaderLink from "@/app/components/header/link";

const Header: React.FC = () => {
  const appBarBg = useTheme().palette.mode === "light" ? "white" : "rgba(0,0,0,0.73)";
  return (
    <Container><Container>
      <AppBar
        position="static"
        sx={{
          height: "7.5vh",
          justifyContent: "flex-start",
          color: appBarBg,
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
          <HeaderLink href={"/"} text={"Top 150"} />

          <HeaderLink href={"/amazon"} text={"Amazon"} />

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
