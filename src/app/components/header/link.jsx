'use client';
import React from "react";
import { Link } from "@mui/material";
import { useTheme } from "@emotion/react";
import { usePathname } from 'next/navigation'
const HeaderLink = ({ href, text }) => {
  const pathname = usePathname()
  const isActive = pathname === href;
  const activetxt = useTheme().palette.mode === "light" ? "#1976d2" : "#90caf9";
  const appbartxt = useTheme().palette.mode === "light" ? "black" : "white";
  return (
    <Link
      sx={{
        color: isActive ? activetxt : appbartxt,
        ":hover": {
          color: activetxt,
        },
        textDecoration: "none",
        fontWeight: "bold",
      }}
      variant="h7"
      href={href}
    >
      {text}
    </Link>
  );
};

export default HeaderLink;
