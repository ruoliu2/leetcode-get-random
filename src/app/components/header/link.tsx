'use client';
import React from "react";
import  Link from "next/link";
import { usePathname } from 'next/navigation'
import {LinkProps} from "next/link";
import {Button} from "@mui/material";
import {useTheme} from "@mui/material/styles";
interface HeaderLinkProps {
  href: string;
  text: string;
}

const HeaderLink: React.FC<HeaderLinkProps> = ({ href, text }) => {
  const pathName = usePathname();
  const txtColor = useTheme().palette.mode === "light" ? "black" : "white";

  const isActive = pathName === href;
  return (
    <Link href={href}>
      <Button
        sx={{
          color: isActive ? "primary" : txtColor,
        }}
      >
        {text}
      </Button>
    </Link>
  );

};

export default HeaderLink;
